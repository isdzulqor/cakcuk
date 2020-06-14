package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

func main() {
	port := "80"
	if isTLS, _ := strconv.ParseBool(os.Getenv("TLS_ENABLED")); !isTLS {
		tempPort := os.Getenv("PORT")
		if tempPort != "" {
			port = tempPort
		}
	}
	healthURL := "http://localhost:" + port + "/api/health"

	givenRetry := flag.Int("retry", 1, "Set retry number to check healthcheck. Program will sleep for 5 seconds before executing the next retry.")
	flag.Parse()

	var err error
	for *givenRetry != 0 {
		if err = checkHealth(healthURL); err == nil {
			break
		}
		*givenRetry--
		if *givenRetry > 0 {
			log.Printf("Program will sleep for 5 seconds. %d retries left...\n", *givenRetry)
			time.Sleep(5 * time.Second)
		}
	}
	if err != nil {
		os.Exit(1)
	}
	log.Println("Cakcuk is healthy...")
}

func checkHealth(healthURL string) error {
	req, err := http.NewRequest("GET", healthURL, nil)
	if err != nil {
		return err
	}
	req.Header.Add("x-cakcuk-secret-key", os.Getenv("SECRET_KEY"))
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	return nil
}
