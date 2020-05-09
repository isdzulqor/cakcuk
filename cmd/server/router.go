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

func createRouter(ctx context.Context, rootHandler handler.RootHandler) http.Handler {
	router := mux.NewRouter()

	// setup middlewares
	router.Use(RecoverHandler)
	router.Use(LoggingHandler)

	router.HandleFunc("/health", rootHandler.Health.GetHealth).Methods("GET")
	router.HandleFunc("/play", rootHandler.Playground.Play).Methods("GET")
	if config.Get().Slack.Event.Enabled {
		logging.Logger(ctx).Info("Slack event subscription is enabled")
		router.HandleFunc("/slack/action-endpoint", rootHandler.Slackbot.GetEvents).Methods("POST")
	}
	gzip := handlers.CompressHandler(router)
	cors := handlers.CORS(handlers.AllowedOrigins(config.Get().Cors.AllowedOrigins))(gzip)
	return cors
}
