package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/errors"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	stringLib "cakcuk/utils/string"
	"context"
	"fmt"

	uuid "github.com/satori/go.uuid"
)

type SlackbotService struct {
	Config        *config.Config          `inject:""`
	BotRepository repository.BotInterface `inject:""`
	TeamService   *TeamService            `inject:""`
	ScopeService  *ScopeService           `inject:""`
	SlackClient   *external.SlackClient   `inject:""`
	SlackOauth2   *external.SlackOauth2   `inject:""`

	FirstBotWorkspace  *model.BotModel  `inject:"firstBotWorkspace"`
	FirstTeamWorkspace *model.TeamModel `inject:"firstTeamWorkspace"`
}

func (s *SlackbotService) GetBot(ctx context.Context, teamID uuid.UUID) (out model.BotModel, err error) {
	if teamID == s.FirstTeamWorkspace.ID {
		out = *s.FirstBotWorkspace
		return
	}
	return s.BotRepository.GetBotByTeamID(ctx, teamID)
}

func (s *SlackbotService) MustCreate(ctx context.Context, teamInfo model.TeamModel, botReferenceID string) (err error) {
	slackUsers, err := s.SlackClient.CustomAPI.GetUsersInfo(ctx, &teamInfo.ReferenceToken, []string{botReferenceID})
	if err != nil {
		err = fmt.Errorf("Error get slack user info: %v", err)
		return
	}
	slackUser, err := slackUsers.GetOneByID(botReferenceID)
	if err != nil {
		err = fmt.Errorf("Error get slack user info: %v", err)
		return
	}

	var newBot model.BotModel
	if newBot, err = s.BotRepository.GetBotByReferenceIDAndTeamID(ctx, botReferenceID, teamInfo.ID); err != nil {
		newBot.Create("default", botReferenceID, stringLib.ReadSafe(slackUser.Name), model.SourceSlack, teamInfo.ID)
		err = nil
	}

	if currentBot, err := s.BotRepository.GetBotByReferenceIDAndTeamID(ctx, botReferenceID, teamInfo.ID); err == nil {
		newBot.ID = currentBot.ID
		newBot.Source = currentBot.Source
		newBot.Created = currentBot.Created
		newBot.CreatedBy = currentBot.CreatedBy
	}
	return s.BotRepository.InsertBotInfo(ctx, newBot)
}

func (s *SlackbotService) NotifySlackWithFile(ctx context.Context, token *string, channel string, response string) {
	if err := s.SlackClient.CustomAPI.UploadFile(ctx, token, []string{channel}, "output.txt", response); err != nil {
		logging.Logger(ctx).Error("[slack-client] failed to upload file, err:", err)
	}
}

func (s *SlackbotService) NotifySlackSuccess(ctx context.Context, token *string, channel string, response string, isFileOutput, isWrapped bool) {
	if response == "" {
		if err := s.postSlackMsg(ctx, token, channel, "No Result"); err != nil {
			logging.Logger(ctx).Error(err)
		}
		return
	}

	textMessages := stringLib.SmartSplitByLength(response, s.Config.Slack.CharacterLimit)
	for _, text := range textMessages {
		if isFileOutput {
			s.NotifySlackWithFile(ctx, token, channel, text)
			continue
		}
		if isWrapped {
			text = "```" + text + "```"
		}
		if err := s.postSlackMsg(ctx, token, channel, text); err != nil {
			logging.Logger(ctx).Error(err)
		}
	}
}

func (s *SlackbotService) NotifySlackError(ctx context.Context, token *string, channel string, errData error, isFileOutput bool) {
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
		s.NotifySlackWithFile(ctx, token, channel, msg)
		return
	}
	if err := s.postSlackMsg(ctx, token, channel, msg); err != nil {
		logging.Logger(ctx).Error(err)
	}
}

func (s *SlackbotService) postSlackMsg(ctx context.Context, token *string, channel, text string) (err error) {
	err = s.SlackClient.CustomAPI.PostMessage(ctx, token, s.Config.Slack.Username, channel, text)
	return
}

// SendFirstStartedMessage to send hi message via PM to user who installed Cakcuk
func (s *SlackbotService) SendFirstStartedMessage(ctx context.Context, authedSlacUserkID, workspaceToken string) (err error) {
	if authedSlacUserkID == "" && workspaceToken == "" {
		return fmt.Errorf("authed slack user ID and workspace token are empty")
	}

	if authedSlacUserkID == "" {
		return fmt.Errorf("authed slack user ID is empty")
	}

	if workspaceToken == "" {
		return fmt.Errorf("workspace token is empty")
	}

	return s.SlackClient.CustomAPI.PostMessage(ctx, &workspaceToken, s.Config.Slack.Username,
		authedSlacUserkID, "Hi "+model.MentionSlack(authedSlacUserkID)+" 👋!")
}

func (s *SlackbotService) ProcessOauth2(ctx context.Context, state, code string) (err error) {
	oauth2Response, err := s.SlackOauth2.Oauth2Acess(ctx, state, code)
	if err != nil {
		logging.Logger(ctx).Error(err)
		return
	}

	// send onboard message via PM
	go s.SendFirstStartedMessage(ctx, stringLib.ReadSafe(oauth2Response.AuthedUser.ID), stringLib.ReadSafe(oauth2Response.AccessToken))

	logging.Logger(ctx).Debug("New workspace installed, data:", jsonLib.ToPrettyNoError(oauth2Response))

	// insert on duplicate update team
	var team model.TeamModel
	if err = team.FromOauth2Response(oauth2Response); err != nil {
		logging.Logger(ctx).Error(err)
		return
	}
	if team, err = s.TeamService.MustCreate(ctx, team); err != nil {
		logging.Logger(ctx).Error(err)
		return
	}

	// insert on duplicate update public scope
	publicScope := model.GeneratePublicScope()
	publicScope.TeamID = team.ID
	if _, err = s.ScopeService.MustCreate(ctx, publicScope); err != nil {
		logging.Logger(ctx).Error(err)
		return
	}

	// insert on duplicate update bot id
	if err = s.MustCreate(ctx, team, stringLib.ReadSafe(oauth2Response.BotUserID)); err != nil {
		logging.Logger(ctx).Error(err)
	}
	return
}
