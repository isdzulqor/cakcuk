package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	stringLib "cakcuk/utils/string"
	"context"

	"fmt"

	"github.com/slack-go/slack"
)

type SlackbotService struct {
	Config             *config.Config               `inject:""`
	CommandService     *CommandService              `inject:""`
	TeamService        *TeamService                 `inject:""`
	SlackbotRepository repository.SlackbotInterface `inject:""`
	SlackbotModel      *model.SlackbotModel         `inject:""`
	SlackClient        *external.SlackClient        `inject:""`
}

func (s *SlackbotService) StartUp(ctx context.Context) (out model.SlackbotModel, err error) {
	if err = s.SlackbotRepository.InsertSlackbotInfo(ctx, *s.SlackbotModel); err != nil {
		return
	}
	out = *s.SlackbotModel
	return
}

func (s *SlackbotService) HandleMessage(ctx context.Context, msg, channel, slackUserID, slackTeamID string) (out model.SlackResponseModel, err error) {
	var (
		team   model.TeamModel
		scopes model.ScopesModel
		isHelp bool
	)

	if stringLib.IsEmpty(msg) {
		err = fmt.Errorf("Try `%s @%s` for details. Visit playground %s/play to explore more!",
			model.CommandHelp, s.SlackbotModel.Name, s.Config.Site.LandingPage)
		return
	}

	if team, err = s.TeamService.GetTeamInfo(ctx, slackTeamID); err != nil {
		return
	}
	if out.Command, scopes, isHelp, err = s.CommandService.ValidateInput(ctx, &msg, team.ID, slackUserID); err != nil {
		return
	}
	if isHelp {
		commandName := &out.Command.Name
		if out.Message, err = s.CommandService.Help(ctx, out.Command, team.ID, s.SlackbotModel.Name, scopes, commandName); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
		return
	}

	if err = out.Command.Extract(&msg); err != nil {
		err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
		return
	}
	out.IsFileOutput, out.IsPrintOption, out.IsNoParse, out.FilterLike = out.Command.ExtractGlobalDefaultOptions()

	s.NotifySlackCommandExecuted(ctx, channel, out.Command, out.IsPrintOption)

	switch out.Command.Name {
	case model.CommandHelp:
		if out.Message, err = s.CommandService.Help(ctx, out.Command, team.ID, s.SlackbotModel.Name, scopes, nil); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
	case model.CommandCuk:
		out.Message, err = s.CommandService.Cuk(ctx, out.Command)
	case model.CommandCak:
		var slackUser *slack.User
		if slackUser, err = s.SlackClient.API.GetUserInfo(slackUserID); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
			break
		}
		if out.Message, _, err = s.CommandService.Cak(ctx, out.Command, team.ID, s.SlackbotModel.Name, slackUser.Name, scopes); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
		}
	case model.CommandDel:
		if out.Message, _, err = s.CommandService.Del(ctx, out.Command, team.ID, s.SlackbotModel.Name, scopes); err != nil {
			err = errorLib.ErrorDel.AppendMessage(err.Error())
		}
	case model.CommandScope:
		var slackUser *slack.User
		if slackUser, err = s.SlackClient.API.GetUserInfo(slackUserID); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
			break
		}
		if out.Message, err = s.CommandService.Scope(ctx, out.Command, team.ID, s.SlackbotModel.Name, slackUser.Name, scopes); err != nil {
			err = errorLib.ErrorScope.AppendMessage(err.Error())
		}
	case model.CommandSuperUser:
		var slackUser *slack.User
		if slackUser, err = s.SlackClient.API.GetUserInfo(slackUserID); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
			break
		}
		if out.Message, err = s.CommandService.SuperUser(ctx, out.Command, team.ID, s.SlackbotModel.Name, slackUser.Name, scopes); err != nil {
			err = errorLib.ErrorSuperUser.AppendMessage(err.Error())
		}
	default:
		if out.Message, err = s.CommandService.CustomCommand(ctx, out.Command); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
		}
	}
	return
}

func (s *SlackbotService) NotifySlackCommandExecuted(ctx context.Context, channel string, cmd model.CommandModel, withDetail bool) {
	msg := fmt.Sprintf("Executing *`%s...`*", cmd.Name)
	if withDetail {
		msg += cmd.Options.PrintValuedOptions()
	}
	if err := s.postSlackMsg(ctx, channel, msg); err != nil {
		logging.Logger(ctx).Error(err)
	}
}

func (s *SlackbotService) NotifySlackWithFile(ctx context.Context, channel string, response string) {
	params := slack.FileUploadParameters{
		Title:    "output.txt",
		Content:  response,
		Channels: []string{channel},
	}
	s.SlackClient.API.UploadFileContext(ctx, params)
}

func (s *SlackbotService) NotifySlackSuccess(ctx context.Context, channel string, response string, isFileOutput bool) {
	if response == "" {
		if err := s.postSlackMsg(ctx, channel, "No Result"); err != nil {
			logging.Logger(ctx).Error(err)
		}
		return
	}

	textMessages := stringLib.SmartSplitByLength(response, s.Config.Slack.CharacterLimit)
	for _, text := range textMessages {
		if isFileOutput {
			s.NotifySlackWithFile(ctx, channel, text)
			continue
		}
		text = "```" + text + "```"
		if err := s.postSlackMsg(ctx, channel, text); err != nil {
			logging.Logger(ctx).Error(err)
		}
	}
}

func (s *SlackbotService) NotifySlackError(ctx context.Context, channel string, errData error, isFileOutput bool) {
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
		s.NotifySlackWithFile(ctx, channel, msg)
		return
	}
	if err := s.postSlackMsg(ctx, channel, msg); err != nil {
		logging.Logger(ctx).Error(err)
	}
}

func (s *SlackbotService) postSlackMsg(ctx context.Context, channel, text string) (err error) {
	_, _, err = s.SlackClient.API.PostMessageContext(ctx, channel, slack.MsgOptionText(text, false),
		slack.MsgOptionUsername(s.Config.Slack.Username), slack.MsgOptionIconEmoji(s.Config.Slack.IconEmoji))
	return
}
