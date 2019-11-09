package main

import (
	"cakcuk/config"
	"cakcuk/domain/health"
	"cakcuk/domain/slackbot"
	"cakcuk/server"
	"log"
	"net/http"

	"github.com/facebookgo/inject"
	"github.com/gorilla/mux"
	"github.com/nlopes/slack"
)

func main() {
	conf := config.Init()

	slackClient := slack.New(conf.SlackToken)
	slackRTM := slackClient.NewRTM()
	slackBot := slackbot.SlackBot{}

	hps := server.HealthPersistences{}

	// setup depencency injection
	var graph inject.Graph
	graph.Provide(
		&inject.Object{Value: conf},
		&inject.Object{Value: &slackbot.DgraphRepository{}},
		&inject.Object{Value: slackClient},
		&inject.Object{Value: slackRTM},
		&inject.Object{Value: &slackBot},
		&inject.Object{Value: &hps},
	)

	if err := graph.Populate(); err != nil {
		log.Fatalf("[ERROR] populate graph, %v", err)
		return
	}
	if err := slackBot.SetUser(); err != nil {
		log.Fatalf("[ERROR] slackbot set user, %v", err)
	}

	r := mux.NewRouter()

	// setup middlewares
	r.Use(server.RecoverHandler)
	r.Use(server.LoggingHandler)

	healthHandler := health.NewHealthGSHandler(&hps)
	r.HandleFunc("/health", healthHandler.GetHealth).Methods("GET")
	// // Create an example endpoint/route
	go slackRTM.ManageConnection()
	go slackBot.HandleEvents()

	if err := http.ListenAndServe(":"+conf.Port, r); err != nil {
		log.Fatalf("[ERROR] Can't serve to the port %s, err: %v", conf.Port, err)
	}
}
