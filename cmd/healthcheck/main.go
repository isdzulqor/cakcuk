package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
)

func main() {
	port := os.Getenv("PORT")
	if isTLS, _ := strconv.ParseBool(os.Getenv("TLS_ENABLED")); isTLS {
		port = "80"
	}
	url := "http://localhost:" + port + "/api/health"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		os.Exit(1)
	}
	req.Header.Add("x-cakcuk-secret-key", os.Getenv("SECRET_KEY"))
	if _, err = http.DefaultClient.Do(req); err != nil {
		os.Exit(1)
		return
	}
}
