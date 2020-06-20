package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/errors"
	"context"
)

type TeamService struct {
	Config         *config.Config           `inject:""`
	TeamRepository repository.TeamInterface `inject:""`
	SlackClient    *external.SlackClient    `inject:""`
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
	// TODO: not return
	if out, err = t.TeamRepository.GetSQLTeamByReferenceID(ctx, team.ReferenceID); err == nil {
		// team.Update
		return
	}
	team.Create("default", team.ReferenceID, team.ReferenceToken)
	if err = t.TeamRepository.InsertTeamInfo(ctx, team); err != nil {
		return
	}
	out = team
	return
}
