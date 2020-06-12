package main

import (
	"net/http"
	"os"
	"strconv"
)

func main() {
	port := "80"
	if isTLS, _ := strconv.ParseBool(os.Getenv("TLS_ENABLED")); !isTLS {
		tempPort := os.Getenv("PORT")
		if tempPort != "" {
			port = tempPort
		}
	}
	url := "http://localhost:" + port + "/api/health"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		os.Exit(1)
	}
	req.Header.Add("x-cakcuk-secret-key", os.Getenv("SECRET_KEY"))
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		os.Exit(1)
		return
	}
	defer res.Body.Close()
}
