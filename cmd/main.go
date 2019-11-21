package main

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/server"
	"cakcuk/utils/health"
	jsonLib "cakcuk/utils/json"
	"log"
	"net/http"

	dgoV2 "github.com/dgraph-io/dgo/v2"
	"github.com/dgraph-io/dgo/v2/protos/api"

	"github.com/facebookgo/inject"
	"github.com/gorilla/mux"
	"github.com/nlopes/slack"
	grpc "google.golang.org/grpc"
)

func main() {
	conf := config.Init()

	slackClient := slack.New(conf.SlackToken)
	slackRTM := slackClient.NewRTM()
	slackBot := getUserBot(slackClient)

	hps := server.HealthPersistences{}
	slackbotHandler := handler.SlackbotHandler{}

	dGraphClient := setupDB(conf)

	// setup depencency injection
	var graph inject.Graph
	graph.Provide(
		&inject.Object{Value: conf},
		&inject.Object{Value: &repository.SlackbotDgraph{}},
		&inject.Object{Value: &repository.CommandDgraph{}},
		&inject.Object{Value: dGraphClient},
		&inject.Object{Value: slackClient},
		&inject.Object{Value: slackRTM},
		&inject.Object{Value: &slackBot},
		&inject.Object{Value: &hps},
		&inject.Object{Value: &slackbotHandler},
	)

	if err := graph.Populate(); err != nil {
		log.Fatalf("[ERROR] populate graph, %v", err)
		return
	}

	r := mux.NewRouter()

	// setup middlewares
	r.Use(server.RecoverHandler)
	r.Use(server.LoggingHandler)

	healthHandler := health.NewHealthGSHandler(&hps)
	r.HandleFunc("/health", healthHandler.GetHealth).Methods("GET")

	go slackRTM.ManageConnection()
	go slackbotHandler.HandleEvents()

	if err := http.ListenAndServe(":"+conf.Port, r); err != nil {
		log.Fatalf("[ERROR] Can't serve to the port %s, err: %v", conf.Port, err)
	}
}

func setupDB(conf *config.Config) (out *dgoV2.Dgraph) {
	conn, err := grpc.Dial(conf.DgraphHost+":"+conf.DgraphPort, grpc.WithInsecure())
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	out = dgoV2.NewDgraphClient(api.NewDgraphClient(conn))
	return
}

// getUserBot to retrieve bot identity and assign it to Slackbot.user
func getUserBot(slackClient *slack.Client) (out model.SlackbotModel) {
	resp, err := slackClient.AuthTest()
	if err != nil {
		log.Fatalf("[ERROR] error get auth data: %v", err)
	}
	user, err := slackClient.GetUserInfo(resp.UserID)
	if err != nil {
		log.Fatalf("[ERROR] error get user info: %v", err)
		return
	}
	out.User = *user
	log.Printf("[INFO] get user info: %v\n", jsonLib.ToStringJsonNoError(user))
	return
}
