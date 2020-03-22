package server

import (
	"cakcuk/config"
	"cakcuk/domain/handler"
	"cakcuk/domain/service"
	"fmt"
	"log"
	"net/http"
)

type Startup struct {
	Config          *config.Config           `inject:""`
	TeamService     *service.TeamService     `inject:""`
	SlackbotService *service.SlackbotService `inject:""`
	RootHandler     *handler.RootHandler     `inject:""`
}

func (s *Startup) StartUp() error {
	if _, err := s.TeamService.StartUp(); err != nil {
		return fmt.Errorf("Failed to startup team service: %v", err)
	}
	if _, err := s.SlackbotService.StartUp(); err != nil {
		return fmt.Errorf("Failed to startup slackbot service: %v", err)
	}

	router := createRouter(*s.RootHandler)

	// Slack RTM API Enabled
	if s.Config.Slack.RTM.Enabled {
		go s.RootHandler.Slackbot.HandleRTM()
	}

	log.Println("listening on port:", s.Config.Port)
	if err := http.ListenAndServe(":"+s.Config.Port, router); err != nil {
		return fmt.Errorf("Can't serve to the port %s, err: %v", s.Config.Port, err)
	}
	return nil
}
