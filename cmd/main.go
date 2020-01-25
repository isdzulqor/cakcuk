package main

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	"cakcuk/server"
	jsonLib "cakcuk/utils/json"
	"fmt"
	"log"
	"net/http"

	"github.com/facebookgo/inject"
	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
	cache "github.com/patrickmn/go-cache"
)

func main() {
	conf := config.Get()

	slackClient := external.NewSlackClient(conf.Slack.URL, conf.Slack.Token)
	slackBot := getUserBot(slackClient)
	hps := server.HealthPersistences{}
	slackbotHandler := handler.SlackbotHandler{}
	db := setupDB(conf)

	goCache := cache.New(conf.Cache.ExpirationTime, conf.Cache.PurgeDeletionTime)

	// setup depencency injection
	var graph inject.Graph
	graph.Provide(
		&inject.Object{Value: conf},
		&inject.Object{Value: &repository.SlackbotSQL{}},
		&inject.Object{Value: &repository.CommandSQL{}},
		&inject.Object{Value: db},
		&inject.Object{Value: goCache},
		&inject.Object{Value: slackClient},
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

	healthHandler := handler.NewHealthHandler(&hps)
	r.HandleFunc("/health", healthHandler.GetHealth).Methods("GET")
	r.HandleFunc("/slack/action-endpoint", slackbotHandler.GetEvents).Methods("POST")

	if err := http.ListenAndServe(":"+conf.Port, r); err != nil {
		log.Fatalf("[ERROR] Can't serve to the port %s, err: %v", conf.Port, err)
	}
}

func setupDB(conf *config.Config) *sqlx.DB {
	db, err := sqlx.Open("mysql",
		fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", conf.MySQL.Username,
			conf.MySQL.Password, conf.MySQL.Host, conf.MySQL.Database))
	if err != nil {
		log.Fatalf("[ERROR] failed to connect mysql: %v", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatalf("[ERROR] failed to ping mysql: %v", err)
	}
	db.SetMaxOpenConns(conf.MySQL.ConnectionLimit)
	return db
}

// getUserBot to retrieve bot identity and assign it to Slackbot.user
func getUserBot(slackClient *external.SlackClient) (out model.SlackbotModel) {
	resp, err := slackClient.GetAuthTest()
	if err != nil {
		log.Fatalf("[ERROR] error get auth data: %v", err)
	}
	user, err := slackClient.GetUserInfo(resp.UserID)
	if err != nil {
		log.Fatalf("[ERROR] error get user info: %v", err)
		return
	}
	out.Name = user.Name
	out.SlackID = user.ID
	log.Printf("[INFO] get user info: %v\n", jsonLib.ToStringJsonNoError(user))
	return
}
