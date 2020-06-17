package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/errors"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	"context"
)

type TeamService struct {
	Config         *config.Config           `inject:""`
	TeamRepository repository.TeamInterface `inject:""`
	SlackClient    *external.SlackClient    `inject:""`
}

func (t *TeamService) StartUp(ctx context.Context) (out model.TeamModel, err error) {
	slackTeam, err := t.SlackClient.CustomAPI.GetTeamInfo(ctx, &t.Config.Slack.Token)
	if err != nil {
		return
	}
	out.FromSlackTeamCustom(slackTeam)
	out.ReferenceToken = t.Config.Slack.Token

	if out, err = t.MustCreate(ctx, out); err != nil {
		return
	}
	// TODO: Debug
	logging.Logger(ctx).Info("team info:", jsonLib.ToPrettyNoError(out))
	return
}

func (t *TeamService) GetTeamInfo(ctx context.Context, teamReferenceID string) (out model.TeamModel, err error) {
	if out, err = t.TeamRepository.GetTeamByReferenceID(ctx, teamReferenceID); err != nil {
		if err == errorLib.ErrorNotExist {
			//TODO:
			// actually it needs to get team detail from slack
			// then inserting to DB
			// but got issue, how to get access token.
			// access token currently, only from auth callback
		}
	}
	return
}

func (t *TeamService) MustCreate(ctx context.Context, team model.TeamModel) (out model.TeamModel, err error) {
	if out, err = t.TeamRepository.GetSQLTeamByReferenceID(ctx, team.ReferenceID); err == nil {
		return
	}
	team.Create("default", team.ReferenceID, team.ReferenceToken)
	if err = t.TeamRepository.InsertTeamInfo(ctx, team); err != nil {
		return
	}
	out = team
	return
}
