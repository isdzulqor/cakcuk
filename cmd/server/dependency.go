package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/facebookgo/inject"
	"github.com/jmoiron/sqlx"
	"github.com/patrickmn/go-cache"
)

// InitDependencies to init depencency injection
func InitDependencies(ctx context.Context, conf *config.Config) (startup Startup, err error) {
	hps := HealthPersistences{}

	var basePath string
	if basePath, err = getBasePath(ctx); err != nil {
		return
	}

	var db *sqlx.DB
	if db, err = initMySQL(ctx, conf, basePath); err != nil {
		return
	}

	goCache := cache.New(conf.Cache.DefaultExpirationTime, conf.Cache.PurgeDeletionTime)
	healthHandler := handler.NewHealthHandler(&hps)
	slackbotHandler := handler.SlackbotHandler{}
	playgroundHandler := handler.PlaygroundHandler{}
	rootHandler := handler.RootHandler{}
	BotModel := model.BotModel{}

	slackClient := new(external.SlackClient)
	if !conf.TestingMode {
		slackClient = external.InitSlackClient(conf.Slack.Token, conf.LogLevel == "debug",
			conf.Slack.Event.Enabled, conf.Slack.RTM.Enabled)

		if BotModel, err = getUserBot(ctx, slackClient, db); err != nil {
			return
		}
	} else {
		logging.Logger(ctx).Info("Testing mode is active")
	}

	var graph inject.Graph
	graph.Provide(
		&inject.Object{Value: conf},
		&inject.Object{Value: &repository.BotSQL{}},
		&inject.Object{Value: &repository.CommandRepository{}},
		&inject.Object{Value: &repository.TeamRepository{}},
		&inject.Object{Value: &repository.ScopeRepository{}},
		&inject.Object{Value: &repository.UserRepository{}},
		&inject.Object{Value: db},
		&inject.Object{Value: &basePath, Name: "basePath"},
		&inject.Object{Value: goCache},
		&inject.Object{Value: slackClient},
		&inject.Object{Value: &BotModel},
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
func getUserBot(ctx context.Context, slackClient *external.SlackClient, db *sqlx.DB) (out model.BotModel, err error) {
	botRepo := repository.BotSQL{db}

	resp, err := slackClient.API.AuthTest()
	if err != nil {
		err = fmt.Errorf("Error get auth data: %v", err)
		return
	}
	slackUser, err := slackClient.API.GetUserInfo(resp.UserID)
	if err != nil {
		err = fmt.Errorf("Error get slack user info: %v", err)
		return
	}
	if out, err = botRepo.GetBotByReferenceID(ctx, slackUser.ID); err != nil {
		out.Create("default", slackUser.ID)
		err = nil
	}
	out.Name = slackUser.Name
	logging.Logger(ctx).Infof("bot info: %v\n", jsonLib.ToPrettyNoError(out))
	return
}

func getBasePath(ctx context.Context) (basePath string, err error) {
	var (
		workdir      string
		replacerPath = strings.NewReplacer(
			"/cmd", "",
		)
	)
	if workdir, err = os.Getwd(); err != nil {
		return
	}
	basePath = replacerPath.Replace(workdir)
	return
}
