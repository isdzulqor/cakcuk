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

func (s *SlackbotService) StartUp() (out model.SlackbotModel, err error) {
	if err = s.SlackbotRepository.InsertSlackbotInfo(*s.SlackbotModel); err != nil {
		return
	}
	out = *s.SlackbotModel
	return
}

func (s *SlackbotService) HandleMessage(msg, channel, slackUserID, slackTeamID string) (out model.SlackEventResponseModel, err error) {
	var team model.TeamModel

	if stringLib.IsEmpty(msg) {
		err = fmt.Errorf("Try `%s @%s` for details. Visit playground %s/play to explore more!",
			model.CommandHelp, s.SlackbotModel.Name, s.Config.Site.LandingPage)
		return
	}

	if team, err = s.TeamRepository.GetTeamBySlackID(slackTeamID); err != nil {
		return
	}
	if out.Command, err = s.CommandService.ValidateInput(&msg, team.ID); err != nil {
		return
	}

	if err = out.Command.Extract(&msg); err != nil {
		err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
		return
	}

	// get isFileOutput
	// TODO: Deprecated
	if optionValue, err := out.Command.OptionsModel.GetOptionValue(model.OptionOutputFile); err == nil {
		out.IsFileOutput, _ = strconv.ParseBool(optionValue)
	}

	// TODO: Deprecated
	// get filter
	out.FilterLike, _ = out.Command.OptionsModel.GetOptionValue(model.OptionFilter)

	var isPrintOption bool
	if optionValue, err := out.Command.OptionsModel.GetOptionValue(model.OptionPrintOptions); err == nil {
		isPrintOption, _ = strconv.ParseBool(optionValue)
	}
	s.NotifySlackCommandExecuted(channel, out.Command, isPrintOption)

	switch out.Command.Name {
	case model.CommandHelp:
		if out.Message, err = s.CommandService.Help(out.Command, team.ID, s.SlackbotModel.Name); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
	case model.CommandCuk:
		out.Message, err = s.CommandService.Cuk(out.Command)
	case model.CommandCak:
		var slackUser external.SlackUser
		if slackUser, err = s.SlackClient.GetUserInfo(slackUserID); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
			break
		}
		if out.Message, _, err = s.CommandService.Cak(out.Command, team.ID, s.SlackbotModel.Name, *slackUser.RealName); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
		}
	case model.CommandDel:
		if out.Message, _, err = s.CommandService.Del(out.Command, team.ID, s.SlackbotModel.Name); err != nil {
			err = errorLib.ErrorDel.AppendMessage(err.Error())
		}
	default:
		cukCommand := out.Command.OptionsModel.ConvertCustomOptionsToCukCmd()
		if out.Message, err = s.CommandService.Cuk(cukCommand); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
		}
	}
	return
}

func (s *SlackbotService) NotifySlackCommandExecuted(channel string, cmd model.CommandModel, withDetail bool) {
	msg := fmt.Sprintf("Executing *`%s...`*", cmd.Name)
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
