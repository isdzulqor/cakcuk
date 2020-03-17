package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/errors"
	stringLib "cakcuk/utils/string"
	"strconv"

	"fmt"
	"log"
)

type SlackbotService struct {
	Config         *config.Config           `inject:""`
	CommandService *CommandService          `inject:""`
	TeamRepository repository.TeamInterface `inject:""`
	SlackbotModel  *model.SlackbotModel     `inject:""`
	SlackClient    *external.SlackClient    `inject:""`
}

func (s *SlackbotService) HandleMessage(msg, channel, slackUserID, slackTeamID string) (out string, err error) {
	var cmd model.CommandModel
	var optOutputFile model.OptionModel
	var isOutputFile bool
	var team model.TeamModel

	if team, err = s.TeamRepository.GetTeamBySlackID(slackTeamID); err != nil {
		return
	}

	if cmd, err = s.CommandService.ValidateInput(&msg, team.ID); err != nil {
		return
	}

	if err = cmd.Extract(&msg); err != nil {
		return
	}
	s.NotifySlackCommandExecuted(channel, cmd)

	if optOutputFile, err = cmd.OptionsModel.GetOptionByName("--outputFile"); err != nil {
		return
	}
	isOutputFile, _ = strconv.ParseBool(optOutputFile.Value)

	switch cmd.Name {
	case "help":
		out = s.CommandService.Help(cmd, team.ID, s.SlackbotModel.Name)
	case "cuk":
		out, err = s.CommandService.Cuk(cmd)
	case "cak":
		var slackUser external.SlackUser
		slackUser, err = s.SlackClient.GetUserInfo(slackUserID)
		if err != nil {
			return
		}
		out, _, err = s.CommandService.Cak(cmd, team.ID, s.SlackbotModel.Name, slackUser.Name)
	default:
		cukCommand := cmd.OptionsModel.ConvertCustomOptionsToCukCmd()
		out, err = s.CommandService.Cuk(cukCommand)
	}
	if err != nil {
		s.NotifySlackError(channel, err, isOutputFile)
		return
	}
	s.NotifySlackSuccess(channel, out, isOutputFile)
	return
}

func (s *SlackbotService) NotifySlackCommandExecuted(channel string, cmd model.CommandModel) {
	msg := fmt.Sprintf("Executing *%s*...", cmd.Name)
	msg += cmd.OptionsModel.PrintValuedOptions()
	if err := s.SlackClient.PostMessage(s.Config.Slack.Username, s.Config.Slack.IconEmoji, channel, msg); err != nil {
		log.Printf("[ERROR] notifySlackCommandExecuted, err: %v", err)
	}
}

func (s *SlackbotService) NotifySlackWithFile(channel string, response string) {
	if err := s.SlackClient.UploadFile([]string{channel}, "output.txt", response); err != nil {
		log.Printf("[ERROR] notifySlackWithFile, err: %v", err)
	}
}

func (s *SlackbotService) NotifySlackSuccess(channel string, response string, isFileOutput bool) {
	textMessages := stringLib.SplitByLength(response, s.Config.Slack.CharacterLimit)

	for _, text := range textMessages {
		if isFileOutput {
			s.NotifySlackWithFile(channel, text)
			continue
		}
		text = "```" + text + "```"
		if err := s.SlackClient.PostMessage(s.Config.Slack.Username, s.Config.Slack.IconEmoji, channel, text); err != nil {
			log.Printf("[ERROR] notifySlackSuccess, err: %v", err)
		}
	}
}

func (s *SlackbotService) NotifySlackError(channel string, errData error, isFileOutput bool) {
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
		s.NotifySlackWithFile(channel, msg)
		return
	}
	if err := s.SlackClient.PostMessage(s.Config.Slack.Username, s.Config.Slack.IconEmoji, channel, msg); err != nil {
		log.Printf("[ERROR] notifySlackError, err: %v", err)
	}
}
