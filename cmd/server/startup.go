package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/service"
	"cakcuk/utils/logging"
	"context"
	"fmt"
	"net/http"

	"github.com/gorilla/handlers"
)

type Startup struct {
	Config          *config.Config           `inject:""`
	TeamService     *service.TeamService     `inject:""`
	SlackbotService *service.SlackbotService `inject:""`
	ScopeService    *service.ScopeService    `inject:""`
	RootHandler     *handler.RootHandler     `inject:""`
}

func (s *Startup) StartUp(ctx context.Context) error {
	team, err := s.TeamService.StartUp(ctx)
	if err != nil {
		return fmt.Errorf("Failed to startup team service: %v", err)
	}
	if _, err := s.SlackbotService.StartUp(ctx); err != nil {
		return fmt.Errorf("Failed to startup slackbot service: %v", err)
	}
	if _, err := s.ScopeService.StartUp(ctx, team); err != nil {
		return fmt.Errorf("Failed to startup scope service: %v", err)
	}

	router := createRouter(ctx, *s.RootHandler)

	// Slack RTM API Enabled
	if s.Config.Slack.RTM.Enabled {
		go s.RootHandler.Slackbot.HandleRTM(ctx)
	}
	gzip := handlers.CompressHandler(router)

	logging.Logger(ctx).Info("Listening on port:", s.Config.Port)
	if err := http.ListenAndServe(":"+s.Config.Port, gzip); err != nil {
		return fmt.Errorf("Can't serve to the port %s, err: %v", s.Config.Port, err)
	}
	return nil
}
