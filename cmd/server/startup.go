package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/service"
	"cakcuk/utils/logging"
	"context"
	"fmt"
	"net/http"
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

	go startLimitter()

	// Slack RTM API Enabled
	if s.Config.Slack.RTM.Enabled {
		go s.RootHandler.Slackbot.HandleRTM(ctx)
	}

	router := createRouter(ctx, *s.RootHandler)
	if s.Config.CertFile != "" && s.Config.KeyFile != "" {
		logging.Logger(ctx).Info("Listening on port:", s.Config.Port+" with TLS enabled")
		if err := http.ListenAndServeTLS(":"+s.Config.Port, s.Config.CertFile, s.Config.KeyFile, router); err != nil {
			return fmt.Errorf("Can't serve to the port %s, err: %v", s.Config.Port, err)
		}
		return nil
	}
	logging.Logger(ctx).Info("Listening on port:", s.Config.Port+" with TLS disabled")
	if err := http.ListenAndServe(":"+s.Config.Port, router); err != nil {
		return fmt.Errorf("Can't serve to the port %s, err: %v", s.Config.Port, err)
	}
	return nil
}
