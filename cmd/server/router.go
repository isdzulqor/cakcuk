package server

import (
	"cakcuk/domain/handler"

	"github.com/gorilla/mux"
)

func createRouter(rootHandler handler.RootHandler) *mux.Router {
	router := mux.NewRouter()

	// setup middlewares
	router.Use(RecoverHandler)
	router.Use(LoggingHandler)

	router.HandleFunc("/health", rootHandler.Health.GetHealth).Methods("GET")
	router.HandleFunc("/slack/action-endpoint", rootHandler.Slackbot.GetEvents).Methods("POST")
	router.HandleFunc("/play", rootHandler.Playground.Play).Methods("GET")
	return router
}
