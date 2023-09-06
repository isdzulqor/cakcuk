package request

import (
	"bytes"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	stringLib "cakcuk/utils/string"
	"context"
	"crypto/tls"
	"crypto/x509"
	"encoding/base64"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"net/http/httputil"
	"net/textproto"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/elliotchance/sshtunnel"
	"golang.org/x/crypto/ssh"
)

const (
	defaultFileContentType = "application/octet-stream"
)

// Request to hit API
func Request(ctx context.Context, method, url string, queryParams url.Values, headers map[string]string, body io.Reader, isDump bool) (out, dumpRequest []byte, err error) {
	return request(ctx, nil, method, url, queryParams, headers, body, isDump, false)
}

// RequestWithSSH to hit API with SSH tunnel
func RequestWithSSH(ctx context.Context, input InputRequestWithSSH) (out, dumpRequest []byte, err error) {
	var authMethod ssh.AuthMethod
	if input.InputWithSSH.SSHKey != "" {
		privateKeyBytes := []byte(input.InputWithSSH.SSHKey)
		// Parse the private key
		signer, err := ssh.ParsePrivateKey(privateKeyBytes)
		if err != nil {
		}

		authMethod = ssh.PublicKeys(signer)
	}
	if input.InputWithSSH.Password != "" {
		authMethod = ssh.Password(input.InputWithSSH.Password)
	}

	// Parse the URL
	parsedURL, err := url.Parse(input.InputRequest.Url)
	if err != nil {
		err = fmt.Errorf("failed parsing url: %s, err: %v", input.InputRequest.Url, err)
		return
	}

	// Extract the domain (including subdomains)
	destinationDomain := parsedURL.Hostname()
	tunnel, err := sshtunnel.NewSSHTunnel(
		fmt.Sprintf("%s@%s:%d", input.InputWithSSH.Username, input.InputWithSSH.Host, input.InputWithSSH.Port),
		authMethod,
		fmt.Sprintf("%s:443", destinationDomain),
		"0",
	)
	// Start the server in the background. You will need to wait a
	// small amount of time for it to bind to the localhost port
	// before you can start sending connections.
	go tunnel.Start()
	time.Sleep(1 * time.Second)

	defer tunnel.Close()

	// NewSSHTunnel will bind to a random port so that you can have
	// multiple SSH tunnels available. The port is available through:
	//   tunnel.Local.Port

	localURL := strings.Replace(input.InputRequest.Url, destinationDomain, fmt.Sprintf("127.0.0.1:%d", tunnel.Local.Port), 1)
	return request(ctx, httpSSHClient(destinationDomain), input.InputRequest.Method, localURL,
		input.InputRequest.QueryParams,
		input.InputRequest.Headers,
		input.InputRequest.Body,
		input.InputRequest.IsDump,
		false)
}

func request(ctx context.Context, httpClient *http.Client, method, url string, queryParams url.Values, headers map[string]string, body io.Reader, isDump, isUnescapeUnicode bool) (out, dumpRequest []byte, err error) {
	var (
		req *http.Request
		res *http.Response
	)
	if req, err = prepare(ctx, method, url, queryParams, headers, body); err != nil {
		errMsg := "Failed preparing client request"
		logging.Logger(ctx).Warnf("%s, err: %v", errMsg, err)
		err = errorLib.ErrorClientRequestInvalid.AppendMessage(errMsg)
		return
	}
	if isDump {
		dumpRequest, _ = httputil.DumpRequest(req, true)
	}
	if httpClient == nil {
		httpClient = http.DefaultClient
	}
	if res, err = httpClient.Do(req); err != nil {
		errMsg := "Failed requesting to the API server"
		logging.Logger(ctx).Warnf("%s, err: %v", errMsg, err)
		err = errorLib.ErrorClientRequestInvalid.AppendMessage(errMsg)
		return
	}
	defer res.Body.Close()
	if out, err = ioutil.ReadAll(res.Body); err != nil {
		return
	}
	if isUnescapeUnicode {
		out, err = stringLib.UnescapeUnicode(out)
	}
	return
}

func RequestWithUnescapeUnicode(ctx context.Context, method, url string, queryParams url.Values, headers map[string]string, body io.Reader, isDump bool) (out, dumpRequest []byte, err error) {
	return request(ctx, nil, method, url, queryParams, headers, body, isDump, true)
}

func DownloadFile(ctx context.Context, method, url string, queryParams url.Values, headers map[string]string, body io.Reader) (out io.ReadCloser, contentType string, err error) {
	var (
		req *http.Request
		res *http.Response
	)
	if req, err = prepare(ctx, method, url, queryParams, headers, body); err != nil {
		return
	}
	if res, err = http.DefaultClient.Do(req); err != nil {
		return
	}
	out = res.Body
	contentType = res.Header.Get("Content-Type")
	if contentType == "" {
		contentType = defaultFileContentType
	}
	return
}

func prepare(ctx context.Context, method, urlString string, queryParams url.Values, headers map[string]string, body io.Reader) (req *http.Request, err error) {
	method = strings.ToUpper(method)
	logging.Logger(ctx).Debugf("Request API, url: %s, method: %s, queryParams: %v, headers: %s, body: %s", urlString,
		method, queryParams, headers, body)

	var urlStruct *url.URL
	if urlStruct, err = url.Parse(urlString); err != nil {
		return
	}
	if urlStruct.Scheme == "" {
		urlStruct.Scheme = "http"
	}

	if req, err = http.NewRequestWithContext(ctx, method, urlStruct.String(), body); err != nil {
		return
	}
	for k, v := range headers {
		req.Header.Add(k, v)
	}

	req.URL.RawQuery = urlStruct.Query().Encode()
	if queryParams.Encode() != "" {
		if req.URL.RawQuery != "" {
			req.URL.RawQuery = req.URL.RawQuery + "&" + queryParams.Encode()
		} else {
			req.URL.RawQuery = queryParams.Encode()
		}
	}
	return
}

func GetBasicAuth(username, password string) string {
	return "Basic " + base64.StdEncoding.EncodeToString([]byte(username+":"+password))
}

func AssignUrlParams(url string, urlParams map[string]string) string {
	for k, v := range urlParams {
		replacer := "{{" + k + "}}"
		url = strings.Replace(url, replacer, v, -1)
	}
	return url
}

func ReadMultipartFormData(values map[string]io.Reader) (out bytes.Buffer, contentType string, err error) {
	w := multipart.NewWriter(&out)
	for key, r := range values {
		var fw io.Writer
		if x, ok := r.(io.Closer); ok {
			defer x.Close()
		}
		if newKey, fileName, fileContentType, isFile := isMultipartFile(key, r); isFile {
			if fw, err = CreateFormFile(w, newKey, fileName, fileContentType); err != nil {
				return
			}
		} else {
			if fw, err = w.CreateFormField(key); err != nil {
				return
			}
		}
		if _, err = io.Copy(fw, r); err != nil {
			return
		}
	}
	contentType = w.FormDataContentType()
	w.Close()
	return
}

func isMultipartFile(key string, value io.Reader) (newKey, fileName, fileContentType string, isFile bool) {
	if x, ok := value.(*os.File); ok {
		fileName = x.Name()
		isFile = true
		newKey = key
		// TODO: detectFileContentType
		fileContentType = defaultFileContentType
		return
	}
	if strings.Contains(key, "=file") {
		// see model/command.go:897
		fileContentType = stringLib.StringAfter(key, "=file:")
		fileName = stringLib.StringBefore(key, "=file")
		isFile = true
		newKey = fileName
		return
	}
	return
}

func CreateFormFile(w *multipart.Writer, key, filename, contentType string) (io.Writer, error) {
	h := make(textproto.MIMEHeader)
	h.Set("Content-Disposition", fmt.Sprintf(`form-data; name="%s"; filename="%s"`, key, filename))
	h.Set("Content-Type", contentType)
	return w.CreatePart(h)
}

func httpSSHClient(domain string) *http.Client {
	// check if domain is sub domain or not
	domains := generateEligibleDomains(domain)
	sshHttpClient := http.Client{
		Timeout: 15 * time.Second,
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{
				InsecureSkipVerify: true, // This ignores built-in certificate validation errors
				VerifyPeerCertificate: func(rawCerts [][]byte, verifiedChains [][]*x509.Certificate) error {
					actualCertDomains := []string{}
					// Iterate through each raw certificate
					for _, rawCert := range rawCerts {
						// Parse the raw certificate into an x509.Certificate object
						cert, err := x509.ParseCertificate(rawCert)
						if err != nil {
							return fmt.Errorf("Error parsing certificate: %v\n", err)
						}

						actualCertDomains = append(actualCertDomains, cert.Subject.CommonName)

						// Check if the certificate has a matching domain in its Subject Common Name (CN) or SANs
						for _, eligibleDomain := range domains {
							if cert.Subject.CommonName == eligibleDomain {
								return nil // The certificate is valid
							}
						}
						for _, san := range cert.DNSNames {
							actualCertDomains = append(actualCertDomains, san)
							for _, eligibleDomain := range domains {
								if san == eligibleDomain {
									return nil // The certificate is valid
								}
							}
						}
					}
					// If no matching certificate is found, return an error
					return fmt.Errorf("certificates of %v is not valid for domain: %s", actualCertDomains, domain)
				},
			},
		},
	}
	return &sshHttpClient
}

func generateEligibleDomains(domain string) []string {
	parts := strings.Split(domain, ".")
	numParts := len(parts)
	var eligibleDomains []string

	for i := 0; i < numParts; i++ {
		subdomain := strings.Join(parts[i:], ".")
		wildcardDomain := "*." + subdomain
		eligibleDomains = append(eligibleDomains, subdomain, wildcardDomain)
	}

	return eligibleDomains
}
