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

	"github.com/slack-go/slack"
)

type SlackbotService struct {
	Config        *config.Config          `inject:""`
	BotRepository repository.BotInterface `inject:""`
	BotModel      *model.BotModel         `inject:""`
	TeamService   *TeamService            `inject:""`
	SlackClient   *external.SlackClient   `inject:""`
	SlackOauth2   *external.SlackOauth2   `inject:""`
}

func (s *SlackbotService) StartUp(ctx context.Context) (out model.BotModel, err error) {
	if err = s.BotRepository.InsertBotInfo(ctx, *s.BotModel); err != nil {
		return
	}
	out = *s.BotModel
	return
}

func (s *SlackbotService) NotifySlackWithFile(ctx context.Context, channel string, response string) {
	params := slack.FileUploadParameters{
		Title:    "output.txt",
		Content:  response,
		Channels: []string{channel},
	}
	s.SlackClient.API.UploadFileContext(ctx, params)
}

func (s *SlackbotService) NotifySlackSuccess(ctx context.Context, channel string, response string, isFileOutput, isWrapped bool) {
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
		if isWrapped {
			text = "```" + text + "```"
		}
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

func (s *SlackbotService) ProcessOauth2(ctx context.Context, state, code string) (err error) {
	oauth2Response, err := s.SlackOauth2.Oauth2Exchange(ctx, state, code)
	if err != nil {
		logging.Logger(ctx).Warn(err)
		return
	}

	// insert on duplicate update team
	var team model.TeamModel
	if err = team.FromOauth2Response(oauth2Response); err != nil {
		logging.Logger(ctx).Warn(err)
		return
	}
	if team, err = s.TeamService.MustCreate(ctx, team); err != nil {
		logging.Logger(ctx).Warn(err)
		return
	}
	return
}
