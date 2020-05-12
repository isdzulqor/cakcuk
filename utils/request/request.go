package request

import (
	"bytes"
	"cakcuk/utils/logging"
	"context"
	"encoding/base64"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
)

// Request to hit API
func Request(ctx context.Context, method, url string, queryParams url.Values, headers map[string]string, body io.Reader, isDump bool) (out, dumpRequest []byte,
	err error) {
	var (
		req *http.Request
		res *http.Response
	)
	if req, err = prepare(ctx, method, url, queryParams, headers, body); err != nil {
		return
	}
	if isDump {
		dumpRequest, _ = httputil.DumpRequest(req, true)
	}
	if res, err = http.DefaultClient.Do(req); err != nil {
		return
	}
	defer res.Body.Close()
	out, err = ioutil.ReadAll(res.Body)
	return
}

func DownloadFile(ctx context.Context, method, url string, queryParams url.Values, headers map[string]string, body io.Reader) (out io.ReadCloser, err error) {
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
	if req, err = http.NewRequest(method, urlStruct.String(), body); err != nil {
		return
	}
	for k, v := range headers {
		req.Header.Add(k, v)
	}
	req.URL.RawQuery = queryParams.Encode()
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
		if x, ok := r.(*os.File); ok {
			if fw, err = w.CreateFormFile(key, x.Name()); err != nil {
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
