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
	var slackTeam external.SlackTeam
	if slackTeam, err = t.SlackClient.GetTeamInfo(ctx); err != nil {
		return
	}
	if out, err = t.TeamRepository.GetSQLTeamBySlackID(ctx, *slackTeam.ID); err != nil {
		out.Create(*slackTeam.Name, *slackTeam.ID)
	}
	out.FromSlackTeam(slackTeam)
	if err = t.TeamRepository.InsertTeamInfo(ctx, out); err != nil {
		return
	}
	logging.Logger(ctx).Info("team info:", jsonLib.ToPrettyNoError(out))
	return
}

func (t *TeamService) GetTeamInfo(ctx context.Context, slackID string) (out model.TeamModel, err error) {
	return t.TeamRepository.GetTeamBySlackID(ctx, slackID)
}
