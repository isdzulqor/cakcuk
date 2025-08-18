package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/utils/logging"
	"context"
	"net/http"

	"github.com/gorilla/mux"
)

func createHandler(ctx context.Context, rootHandler handler.RootHandler) http.Handler {
	router := mux.NewRouter()

	// setup middlewares
	router.Use(LoggingHandler)
	router.Use(RecoverHandler)

	api := router.PathPrefix("/api").Subrouter()
	api.Use(LimitHandler)
	api.Use(GuardHandler)

	api.HandleFunc("/health", rootHandler.Health.GetHealth).Methods("GET")
	api.HandleFunc("/play", rootHandler.Playground.Play).Methods("GET")

	conf := config.Get()
	if !conf.TestingMode {
		logging.Logger(ctx).Info("Slack event subscription is enabled")
		router.HandleFunc("/slack/event", rootHandler.Slackbot.GetEvents).Methods("POST")
	}

	router.HandleFunc("/slack/add", rootHandler.Slackbot.AddToSlack).Methods("GET")
	router.HandleFunc("/slack/callback", rootHandler.Slackbot.Callback).Methods("GET")
	router.HandleFunc("/console/verify", rootHandler.Console.Verify).Methods("POST")
	router.HandleFunc("/console/exec", rootHandler.Console.Exec).Methods("POST")
	router.HandleFunc("/console/ssh", rootHandler.Console.SSH).Methods("POST")
	router.HandleFunc("/console/ssh", rootHandler.Console.DeleteSSH).Methods("DELETE")
	router.HandleFunc("/console/ssh", rootHandler.Console.GetSSHs).Methods("GET")

	// UI
	ui := router.PathPrefix("/").Subrouter()
	ui.PathPrefix("/").HandlerFunc(rootHandler.Playground.PlayUI)

	return router
}
