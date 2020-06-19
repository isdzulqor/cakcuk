package request

import (
	"bytes"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	stringLib "cakcuk/utils/string"
	"context"
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
)

const (
	defaultFileContentType = "application/octet-stream"
)

// Request to hit API
func Request(ctx context.Context, method, url string, queryParams url.Values, headers map[string]string, body io.Reader, isDump bool) (out, dumpRequest []byte, err error) {
	return request(ctx, method, url, queryParams, headers, body, isDump, false)
}

func request(ctx context.Context, method, url string, queryParams url.Values, headers map[string]string, body io.Reader, isDump, isUnescapeUnicode bool) (out, dumpRequest []byte, err error) {
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
	if res, err = http.DefaultClient.Do(req); err != nil {
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
	return request(ctx, method, url, queryParams, headers, body, isDump, true)
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
	requestID := logging.GetRequestID(ctx)

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
	if req, err = http.NewRequest(method, urlStruct.String(), body); err != nil {
		return
	}
	for k, v := range headers {
		req.Header.Add(k, v)
	}
	req.Header.Add("x-request-id", requestID)

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
