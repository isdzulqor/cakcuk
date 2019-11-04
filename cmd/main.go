package main

import (
	"cakcuk/config"
	"cakcuk/domain/slackbot"
	"fmt"
	"log"
	"net/http"

	"github.com/facebookgo/inject"
	"github.com/nlopes/slack"
)

func main() {
	conf := config.Init()

	slackClient := slack.New(conf.SlackToken)
	slackRTM := slackClient.NewRTM()
	slackBot := slackbot.SlackBot{}

	// setup depencency injection
	var graph inject.Graph
	graph.Provide(
		&inject.Object{Value: conf},
		&inject.Object{Value: slackClient},
		&inject.Object{Value: slackRTM},
		&inject.Object{Value: &slackBot},
	)

	if err := graph.Populate(); err != nil {
		log.Fatalf("[ERROR] populate graph, %v", err)
		return
	}
	if err := slackBot.SetUser(); err != nil {
		log.Fatalf("[ERROR] slackbot set user, %v", err)
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintln(w, "service is running")
	})

	go slackRTM.ManageConnection()
	go slackBot.HandleEvents()

	if err := http.ListenAndServe(":"+conf.Port, nil); err != nil {
		log.Fatalf("[ERROR] Can't serve to the port %s, err: %v", conf.Port, err)
	}
}
