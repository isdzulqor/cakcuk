package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/utils/logging"
	"context"
	"net/http"

	"github.com/gorilla/handlers"
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

	// UI
	ui := router.PathPrefix("/ui").Subrouter()
	ui.PathPrefix("/playground").HandlerFunc(rootHandler.Playground.PlayUI)

	if config.Get().Slack.Event.Enabled {
		logging.Logger(ctx).Info("Slack event subscription is enabled")
		router.HandleFunc("/slack/action-endpoint", rootHandler.Slackbot.GetEvents).Methods("POST")
	}
	return handlers.CompressHandler(router)
}
