package main

import (
	"net/http"
	"os"
)

func main() {
	req, err := http.NewRequest("GET", "http://localhost/api/health", nil)
	if err != nil {
		os.Exit(1)
	}
	req.Header.Add("x-cakcuk-secret-key", os.Getenv("SECRET_KEY"))
	if _, err = http.DefaultClient.Do(req); err != nil {
		os.Exit(1)
		return
	}
}
