package main

import (
	"cakcuk/cmd/server"
	"cakcuk/config"
	"log"
)

func main() {
	var err error
	var startup server.Startup

	conf := config.Get()

	if startup, err = server.InitDependencies(conf); err != nil {
		log.Fatalf("[ERROR] Failed to init dependencies - %v", err)
	}

	if err = startup.StartUp(); err != nil {
		log.Fatalf("[ERROR] Failed to start up - %v", err)
	}
}
