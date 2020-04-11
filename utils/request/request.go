package request

import (
	"cakcuk/utils/logging"
	"context"
	"encoding/base64"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

// Call to hit api
func Call(ctx context.Context, method, url string, queryParams url.Values, headers map[string]string, body io.Reader) ([]byte, error) {
	method = strings.ToUpper(method)
	logging.Logger(ctx).Debugf("Call API, url: %s, method: %s, queryParams: %v, headers: %s, body: %s", url, method, queryParams, headers, body)

	var err error
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return nil, err
	}
	for k, v := range headers {
		req.Header.Add(k, v)
	}
	req.URL.RawQuery = queryParams.Encode()

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	respBody, err := ioutil.ReadAll(res.Body)

	return respBody, err
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
