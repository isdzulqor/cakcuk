package request

import (
	"cakcuk/config"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

// Call to hit api
func Call(method, url string, params, headers map[string]string, body io.Reader) ([]byte, error) {
	method = strings.ToUpper(method)
	if config.Get().DebugMode {
		log.Printf("[INFO] Call API, url: %s, method: %s, params: %s, headers: %s, body: %s", url, method, params, headers, body)
	}

	var err error
	req, err := http.NewRequest(method, url, body)
	if err != nil {
		return nil, err
	}
	q := req.URL.Query()

	for k, v := range headers {
		req.Header.Add(k, v)
	}
	for k, v := range params {
		q.Add(k, v)
	}
	req.URL.RawQuery = q.Encode()

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	respBody, err := ioutil.ReadAll(res.Body)

	return respBody, err
}
