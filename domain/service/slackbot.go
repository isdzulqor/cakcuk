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
	Config             *config.Config               `inject:""`
	CommandService     *CommandService              `inject:""`
	TeamRepository     repository.TeamInterface     `inject:""`
	SlackbotRepository repository.SlackbotInterface `inject:""`
	SlackbotModel      *model.SlackbotModel         `inject:""`
	SlackClient        *external.SlackClient        `inject:""`
}

func (s *SlackbotService) HandleMessage(msg, channel, slackUserID, slackTeamID string) (out string, isFileOutput bool, err error) {
	var cmd model.CommandModel
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

	if optionValue, err := cmd.OptionsModel.GetOptionValue("--outputFile"); err == nil {
		isFileOutput, _ = strconv.ParseBool(optionValue)
	}

	var isPrintOption bool
	if optionValue, err := cmd.OptionsModel.GetOptionValue("--printOptions"); err == nil {
		isPrintOption, _ = strconv.ParseBool(optionValue)
	}
	s.NotifySlackCommandExecuted(channel, cmd, isPrintOption)

	switch cmd.Name {
	case "help":
		if out, err = s.CommandService.Help(cmd, team.ID, s.SlackbotModel.Name); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
	case "cuk":
		out, err = s.CommandService.Cuk(cmd)
	case "cak":
		var slackUser external.SlackUser
		if slackUser, err = s.SlackClient.GetUserInfo(slackUserID); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
			break
		}
		if out, _, err = s.CommandService.Cak(cmd, team.ID, s.SlackbotModel.Name, slackUser.Name); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
		}
	default:
		cukCommand := cmd.OptionsModel.ConvertCustomOptionsToCukCmd()
		if out, err = s.CommandService.Cuk(cukCommand); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
		}
	}
	return
}

func (s *SlackbotService) NotifySlackCommandExecuted(channel string, cmd model.CommandModel, withDetail bool) {
	msg := fmt.Sprintf("Executing *%s*...", cmd.Name)
	if withDetail {
		msg += cmd.OptionsModel.PrintValuedOptions()
	}
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
	var errLib errorLib.Error
	var msg string
	var ok bool
	if errLib, ok = errData.(errorLib.Error); ok {
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
