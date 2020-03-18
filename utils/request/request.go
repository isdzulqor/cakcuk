package request

import (
	"cakcuk/config"
	"encoding/base64"
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

func CallWithRetry(method, url string, params, headers map[string]string, body io.Reader, retry int) (out []byte, err error) {
	for retry != 0 {
		if config.Get().DebugMode {
			log.Printf("[INFO] CallWithRetry - retry: %d", retry)
		}
		if out, err = Call(method, url, params, headers, body); err == nil {
			return
		}
		retry--
	}
	return
}

func GetBasicAuth(username, password string) string {
	return "Basic " + base64.StdEncoding.EncodeToString([]byte(username+":"+password))
}
