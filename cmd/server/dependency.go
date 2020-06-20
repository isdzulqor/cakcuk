package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	stringLib "cakcuk/utils/string"
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/facebookgo/inject"
	"github.com/jmoiron/sqlx"
	"github.com/patrickmn/go-cache"
	uuid "github.com/satori/go.uuid"
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
	firstBotWorkspace := model.BotModel{}
	firstTeamWorkspace := model.TeamModel{}

	slackClient := new(external.SlackClient)
	slackOauth2 := new(external.SlackOauth2)

	if !conf.TestingMode {
		slackClient = external.InitSlackClient(conf.Slack.URL, conf.Slack.Token, conf.LogLevel == "debug",
			conf.Slack.Event.Enabled, conf.Slack.RTM.Enabled, conf.Slack.DefaultRetry)

		// first team creation
		if firstTeamWorkspace, err = initFirstTeamWorkspace(ctx, slackClient.CustomAPI, db, conf.Slack.Token); err != nil {
			return
		}

		// first bot creation
		if firstBotWorkspace, err = initFirstBotWorkspace(ctx, slackClient.CustomAPI, db, firstTeamWorkspace.ID); err != nil {
			return
		}

		slackOauth2 = external.InitSlackOauth2Config(
			conf.Slack.Oauth2.State,
			conf.Slack.Oauth2.RedirectURL,
			conf.Slack.Oauth2.ClientID,
			conf.Slack.Oauth2.ClientSecret,
			conf.Slack.Oauth2.AuthURL,
			conf.Slack.Oauth2.TokenURL,
			conf.Slack.Oauth2.Scopes,
		)
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
		&inject.Object{Value: slackOauth2},
		&inject.Object{Value: &firstBotWorkspace, Name: "firstBotWorkspace"},
		&inject.Object{Value: &firstTeamWorkspace, Name: "firstTeamWorkspace"},
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

func initFirstTeamWorkspace(ctx context.Context, slackClient *external.SlackClientCustom, db *sqlx.DB, slackToken string) (out model.TeamModel, err error) {
	teamRepo := repository.TeamSQL{db}

	slackTeam, err := slackClient.GetTeamInfo(ctx, &slackToken)
	if err != nil {
		return
	}

	out.FromSlackTeamCustom(slackTeam)
	var currentTeam model.TeamModel
	if currentTeam, err = teamRepo.GetSQLTeamByReferenceID(ctx, out.ReferenceID); err == nil {
		out.ID = currentTeam.ID
		out.Created = currentTeam.Created
		out.CreatedBy = currentTeam.CreatedBy
		out.ReferenceToken = slackToken
	} else {
		out.ReferenceToken = slackToken
		out.Create("default", out.ReferenceID, out.ReferenceToken)
	}

	if err = teamRepo.InsertSQLTeamInfo(ctx, out); err != nil {
		return
	}

	// TODO: Debug
	logging.Logger(ctx).Info("team info:", jsonLib.ToPrettyNoError(out))
	return
}

// initFirstBotWorkspace to retrieve bot identity and assign it to Slackbot.user
func initFirstBotWorkspace(ctx context.Context, slackClient *external.SlackClientCustom, db *sqlx.DB, teamID uuid.UUID) (out model.BotModel, err error) {
	botRepo := repository.BotSQL{db}
	resp, err := slackClient.GetAuthTest(ctx, nil)
	if err != nil {
		err = fmt.Errorf("Error get auth data: %v", err)
		return
	}
	userID := stringLib.ReadSafe(resp.UserID)
	slackUsers, err := slackClient.GetUsersInfo(ctx, nil, []string{userID})
	if err != nil {
		err = fmt.Errorf("Error get slack user info: %v", err)
		return
	}
	slackUser, err := slackUsers.GetOneByID(userID)
	if err != nil {
		err = fmt.Errorf("Error get slack user info: %v", err)
		return
	}

	botReferenceID := stringLib.ReadSafe(slackUser.ID)
	botReferenceName := stringLib.ReadSafe(slackUser.Name)

	if out, err = botRepo.GetBotByReferenceIDAndTeamID(ctx, botReferenceID, teamID); err != nil {
		out.Create("default", botReferenceID, botReferenceName, model.SourceSlack, teamID)
		err = nil
	}
	if err = botRepo.InsertBotInfo(ctx, out); err != nil {
		return
	}

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
