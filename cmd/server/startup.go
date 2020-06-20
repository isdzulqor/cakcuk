package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	"cakcuk/utils/logging"
	"context"
	"crypto/tls"
	"fmt"
	"net/http"

	"golang.org/x/crypto/acme/autocert"
)

type Startup struct {
	Config             *config.Config           `inject:""`
	TeamService        *service.TeamService     `inject:""`
	SlackbotService    *service.SlackbotService `inject:""`
	ScopeService       *service.ScopeService    `inject:""`
	FirstTeamWorkspace *model.TeamModel         `inject:"firstTeamWorkspace"`
	RootHandler        *handler.RootHandler     `inject:""`
}

func (s *Startup) StartUp(ctx context.Context) error {
	if !s.Config.TestingMode {
		if _, err := s.ScopeService.StartUp(ctx, *s.FirstTeamWorkspace); err != nil {
			return fmt.Errorf("Failed to startup scope service: %v", err)
		}
	}

	go startLimitter()

	// Slack RTM API Enabled
	if s.Config.TestingMode && s.Config.Slack.RTM.Enabled {
		go s.RootHandler.Slackbot.HandleRTM(ctx)
	}

	routeHandler := createHandler(ctx, *s.RootHandler)

	if s.Config.TLSEnabled {
		return s.serveTLS(ctx, routeHandler)
	}
	return s.serve(ctx, routeHandler)
}

func (s *Startup) serveTLS(ctx context.Context, h http.Handler) error {
	certManager := autocert.Manager{
		Prompt: autocert.AcceptTOS,
		Cache:  autocert.DirCache("cert-cache"),
		// Put your domain here:
		HostPolicy: autocert.HostWhitelist(s.Config.PublicDomains...),
	}

	server := &http.Server{
		Addr:    ":443",
		Handler: h,
		TLSConfig: &tls.Config{
			GetCertificate: certManager.GetCertificate,
		},
	}

	logging.Logger(ctx).Info("[TLS-MODE] Starting HTTP on port 80")
	go http.ListenAndServe(":80", certManager.HTTPHandler(nil))

	logging.Logger(ctx).Info("[TLS-MODE] Starting HTTPS on port 443")
	if err := server.ListenAndServeTLS("", ""); err != nil {
		return fmt.Errorf("Failed starting HTTPS - %v", err)
	}
	return nil
}

func (s *Startup) serve(ctx context.Context, h http.Handler) error {
	logging.Logger(ctx).Info("Starting HTTP on port ", s.Config.Port)
	if err := http.ListenAndServe(":"+s.Config.Port, h); err != nil {
		return fmt.Errorf("Failed starting HTTP - %v", err)
	}
	return nil
}
