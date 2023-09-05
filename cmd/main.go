package main

import (
	"cakcuk/cmd/server"
	"cakcuk/config"
	"cakcuk/utils/logging"
	"context"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	var (
		err     error
		startup server.Startup
	)

	conf := config.Get()

	logging.Init(conf.LogLevel)
	ctx := logging.GetContext(context.Background())

	if startup, err = server.InitDependencies(ctx, conf); err != nil {
		logging.Logger(ctx).Fatalf("Failed to init dependencies - %v", err)
	}

	if err = startup.StartUp(ctx); err != nil {
		logging.Logger(ctx).Fatalf("Failed to start up - %v", err)
	}
}
