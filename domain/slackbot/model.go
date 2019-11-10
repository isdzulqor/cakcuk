package slackbot

import (
	"cakcuk/config"
	"cakcuk/domain/command"
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
	"fmt"
	"log"
	"strings"

	"github.com/nlopes/slack"
)

// SlackBot object model
type SlackBot struct {
	User        slack.User
	SlackClient *slack.Client  `inject:""`
	SlackRTM    *slack.RTM     `inject:""`
	Config      *config.Config `inject:""`
	Service     *Service       `inject:""`
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

func (s *SlackBot) ValidateInput(msg *string) (cmd command.Command, err error) {
	stringSlice := strings.Split(*msg, " ")

	var ok bool
	cmd, ok = command.SlackCommands[stringSlice[0]]
	if !ok {
		err = errorLib.WithMessage(errorcode.CommandNotRegistered, "Please, register your command first!")
		return
	}
	return
}

func (s *SlackBot) notifySlackCommandExecuted(channel string, cmd command.Command) {
	msg := fmt.Sprintf("Executing *%s*...", cmd.Name)
	msg += cmd.Options.PrintValuedOptions()
	_, _, err := s.SlackClient.PostMessage(channel, slack.MsgOptionAsUser(true), slack.MsgOptionText(msg, false))
	if err != nil {
		log.Printf("[ERROR] notifySlackCommandExecuted, err: %s", err)
	}
}

func (s *SlackBot) notifySlackSuccess(channel string, response string) {
	_, _, err := s.SlackClient.PostMessage(channel, slack.MsgOptionAsUser(true), slack.MsgOptionText(response, false))
	if err != nil {
		log.Printf("[ERROR] notifySlackSuccess, err: %s", err)
	}
}

func (s *SlackBot) notifySlackError(channel string, errData error) {
	var errLib *errorLib.Error
	var msg string
	var ok bool
	if errLib, ok = errData.(*errorLib.Error); ok {
		msg = errLib.Message
	}
	if !ok {
		msg = errData.Error()
	}
	_, _, err := s.SlackClient.PostMessage(channel, slack.MsgOptionAsUser(true), slack.MsgOptionText(msg, false))
	if err != nil {
		log.Printf("[ERROR] notifySlackError, err: %s", err)
	}
}
