package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"fmt"
	"log"

	"github.com/facebookgo/inject"
	"github.com/jmoiron/sqlx"
	"github.com/patrickmn/go-cache"
)

// InitDependencies to init depencency injection
func InitDependencies(conf *config.Config) (startup Startup, err error) {
	slackClient := external.NewSlackClient(conf.Slack.URL, conf.Slack.Token, conf.Slack.DefaultRetry)
	hps := HealthPersistences{}

	var db *sqlx.DB
	if db, err = setupDB(conf); err != nil {
		return
	}

	goCache := cache.New(conf.Cache.DefaultExpirationTime, conf.Cache.PurgeDeletionTime)
	healthHandler := handler.NewHealthHandler(&hps)
	slackbotHandler := handler.SlackbotHandler{}
	playgroundHandler := handler.PlaygroundHandler{}
	rootHandler := handler.RootHandler{}
	slackbotModel := model.SlackbotModel{}
	if slackbotModel, err = getUserBot(slackClient, db); err != nil {
		return
	}

	var graph inject.Graph
	graph.Provide(
		&inject.Object{Value: conf},
		&inject.Object{Value: &repository.SlackbotSQL{}},
		&inject.Object{Value: &repository.CommandRepository{}},
		&inject.Object{Value: &repository.TeamRepository{}},
		&inject.Object{Value: db},
		&inject.Object{Value: goCache},
		&inject.Object{Value: slackClient},
		&inject.Object{Value: &slackbotModel},
		&inject.Object{Value: &hps},
		&inject.Object{Value: &slackbotHandler},
		&inject.Object{Value: &playgroundHandler},
		&inject.Object{Value: healthHandler},
		&inject.Object{Value: &rootHandler},
		&inject.Object{Value: &startup},
	)

	err = graph.Populate()
	return
}

// getUserBot to retrieve bot identity and assign it to Slackbot.user
func getUserBot(slackClient *external.SlackClient, db *sqlx.DB) (out model.SlackbotModel, err error) {
	slackbotRepo := repository.SlackbotSQL{db}
	resp, err := slackClient.GetAuthTest()
	if err != nil {
		err = fmt.Errorf("Error get auth data: %v", err)
		return
	}
	slackUser, err := slackClient.GetUserInfo(resp.UserID)
	if err != nil {
		err = fmt.Errorf("Error get slack user info: %v", err)
		return
	}
	if out, err = slackbotRepo.GetSlackbotBySlackID(slackUser.ID); err != nil {
		out.Create(slackUser.Name, slackUser.ID)
	}
	out.Name = slackUser.Name

	log.Printf("[INFO] slackbot info: %v\n", jsonLib.ToPrettyNoError(out))
	return
}