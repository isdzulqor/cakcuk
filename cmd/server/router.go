package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"log"

	"github.com/gorilla/mux"
)

func createRouter(rootHandler handler.RootHandler) *mux.Router {
	router := mux.NewRouter()

	// setup middlewares
	router.Use(RecoverHandler)
	router.Use(LoggingHandler)

	router.HandleFunc("/health", rootHandler.Health.GetHealth).Methods("GET")
	router.HandleFunc("/play", rootHandler.Playground.Play).Methods("GET")
	if config.Get().Slack.Event.Enabled {
		log.Println("[INFO] Slack event subscription is enabled")
		router.HandleFunc("/slack/action-endpoint", rootHandler.Slackbot.GetEvents).Methods("POST")
	}
	return router
}
