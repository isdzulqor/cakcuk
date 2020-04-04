package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
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
	slackTeam, err := t.SlackClient.API.GetTeamInfoContext(ctx)
	if err != nil {
		return
	}
	out.FromSlackTeam(*slackTeam)
	if out, err = t.MustCreate(ctx, out); err != nil {
		return
	}
	logging.Logger(ctx).Info("team info:", jsonLib.ToPrettyNoError(out))
	return
}

func (t *TeamService) GetTeamInfo(ctx context.Context, slackID string) (out model.TeamModel, err error) {
	return t.TeamRepository.GetTeamBySlackID(ctx, slackID)
}

func (t *TeamService) MustCreate(ctx context.Context, team model.TeamModel) (out model.TeamModel, err error) {
	if out, err = t.TeamRepository.GetSQLTeamBySlackID(ctx, team.SlackID); err == nil {
		return
	}
	team.Create("default", team.SlackID)
	if err = t.TeamRepository.InsertTeamInfo(ctx, team); err != nil {
		return
	}
	out = team
	return
}
