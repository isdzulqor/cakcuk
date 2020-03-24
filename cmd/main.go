package main

import (
	"cakcuk/cmd/server"
	"cakcuk/config"
	"cakcuk/utils/logging"
	"context"
)

func main() {
	var err error
	var startup server.Startup

	conf := config.Get()
	logging.Init()
	ctx := logging.GetContext(context.Background())

	if startup, err = server.InitDependencies(ctx, conf); err != nil {
		logging.Logger(ctx).Fatalf("Failed to init dependencies - %v", err)
	}

	if err = startup.StartUp(ctx); err != nil {
		logging.Logger(ctx).Fatalf("Failed to start up - %v", err)
	}
}
