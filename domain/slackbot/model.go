package slackbot

import (
	"cakcuk/config"
	"cakcuk/domain/command"
	errorLib "cakcuk/utils/error"
	"fmt"
	"log"
	"strings"

	"github.com/nlopes/slack"
)

// SlackBot object model
type SlackBot struct {
	User              slack.User
	SlackClient       *slack.Client      `inject:""`
	SlackRTM          *slack.RTM         `inject:""`
	Config            *config.Config     `inject:""`
	Service           *Service           `inject:""`
	CommandRepository command.Repository `inject:""`
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

	cmd, err = s.CommandRepository.GetCommandByName(strings.ToLower(stringSlice[0]))
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

func (s *SlackBot) notifySlackWithFile(channel string, response string) {
	params := slack.FileUploadParameters{
		Filename: "output.txt", Content: response,
		Channels: []string{channel},
	}
	if _, err := s.SlackClient.UploadFile(params); err != nil {
		log.Printf("[ERROR] notifySlackWithFile, err: %s", err)
	}
}

func (s *SlackBot) notifySlackSuccess(channel string, response string, isFileOutput bool) {
	if isFileOutput {
		s.notifySlackWithFile(channel, response)
		return
	}
	_, _, err := s.SlackClient.PostMessage(channel, slack.MsgOptionAsUser(true), slack.MsgOptionText(response, false))
	if err != nil {
		log.Printf("[ERROR] notifySlackSuccess, err: %s", err)
	}
}

func (s *SlackBot) notifySlackError(channel string, errData error, isFileOutput bool) {
	var errLib *errorLib.Error
	var msg string
	var ok bool
	if errLib, ok = errData.(*errorLib.Error); ok {
		msg = errLib.Message
	}
	if !ok {
		msg = errData.Error()
	}
	if isFileOutput {
		s.notifySlackWithFile(channel, msg)
		return
	}
	_, _, err := s.SlackClient.PostMessage(channel, slack.MsgOptionAsUser(true), slack.MsgOptionText(msg, false))
	if err != nil {
		log.Printf("[ERROR] notifySlackError, err: %s", err)
	}
}
