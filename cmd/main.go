package main

import (
	"cakcuk/cmd/server"
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"fmt"
	"log"
	"net/http"

	"github.com/facebookgo/inject"
	"github.com/jmoiron/sqlx"
	"github.com/patrickmn/go-cache"
)

func main() {
	conf := config.Get()

	slackClient := external.NewSlackClient(conf.Slack.URL, conf.Slack.Token)
	hps := server.HealthPersistences{}

	db := setupDB(conf)

	goCache := cache.New(conf.Cache.DefaultExpirationTime, conf.Cache.PurgeDeletionTime)
	slackBot := getUserBot(slackClient, db)
	team := getTeamInfo(slackClient, db)
	startup := server.Startup{}
	healthHandler := handler.NewHealthHandler(&hps)
	slackbotHandler := handler.SlackbotHandler{}
	playgroundHandler := handler.PlaygroundHandler{}
	rootHandler := handler.RootHandler{}

	// setup depencency injection
	var graph inject.Graph
	graph.Provide(
		&inject.Object{Value: conf},
		&inject.Object{Value: &repository.SlackbotSQL{}},
		&inject.Object{Value: &repository.CommandRepository{}},
		&inject.Object{Value: &repository.TeamRepository{}},
		&inject.Object{Value: db},
		&inject.Object{Value: &startup},
		&inject.Object{Value: goCache},
		&inject.Object{Value: slackClient},
		&inject.Object{Value: &slackBot},
		&inject.Object{Value: &hps},
		&inject.Object{Value: &slackbotHandler},
		&inject.Object{Value: &playgroundHandler},
		&inject.Object{Value: healthHandler},
		&inject.Object{Value: &rootHandler},
	)

	if err := graph.Populate(); err != nil {
		log.Fatalf("[ERROR] populate graph, %v", err)
		return
	}
	if err := startup.Start(team, slackBot); err != nil {
		log.Fatalf("[ERROR] startup error, %v", err)
	}

	router := server.CreateRouter(rootHandler)

	log.Println("listen to port:", conf.Port)
	if err := http.ListenAndServe(":"+conf.Port, router); err != nil {
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
func getUserBot(slackClient *external.SlackClient, db *sqlx.DB) (out model.SlackbotModel) {
	slackbotRepo := repository.SlackbotSQL{db}
	resp, err := slackClient.GetAuthTest()
	if err != nil {
		log.Fatalf("[ERROR] error get auth data: %v", err)
	}
	slackUser, err := slackClient.GetUserInfo(resp.UserID)
	if err != nil {
		log.Fatalf("[ERROR] error get slack user info: %v", err)
		return
	}
	if out, err = slackbotRepo.GetSlackbotBySlackID(slackUser.ID); err != nil {
		out.Create(slackUser.Name, slackUser.ID)
	}
	out.Name = slackUser.Name

	log.Printf("[INFO] slackbot info: %v\n", jsonLib.ToPrettyNoError(out))
	return
}

func getTeamInfo(slackClient *external.SlackClient, db *sqlx.DB) (out model.TeamModel) {
	teamRepo := repository.TeamSQL{db}
	slackTeam, err := slackClient.GetTeamInfo()
	if err != nil {
		log.Fatalf("[ERROR] error get slack team info: %v", err)
		return
	}
	if out, err = teamRepo.GetSQLTeamBySlackID(slackTeam.ID); err != nil {
		out.Create(slackTeam.Name, slackTeam.ID)
	}
	out.FromSlackTeam(slackTeam)
	log.Printf("[INFO] team info: %v\n", jsonLib.ToPrettyNoError(out))
	return
}
