package slackbot

import (
	"cakcuk/config"
	"log"

	"github.com/nlopes/slack"
)

// SlackBot object model
type SlackBot struct {
	User        slack.User
	SlackClient *slack.Client  `inject:""`
	SlackRTM    *slack.RTM     `inject:""`
	Config      *config.Config `inject:""`
}

// SetUser to retrieve bot identity and assign it to Slackbot.user
func (s *SlackBot) SetUser() error {
	resp, err := s.SlackClient.AuthTest()
	if err != nil {
		log.Fatalf("[ERROR] error get auth data: %v", err)
		return err
	}
	user, err := s.SlackClient.GetUserInfo(resp.UserID)
	if err != nil {
		log.Fatalf("[ERROR] error get user info: %v", err)
		return err
	}
	s.User = *user
	if s.Config.DebugMode {
		log.Printf("[INFO] get user info: %v\n", user)
	}
	return nil
}
