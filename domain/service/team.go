package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
)

type TeamService struct {
	Config         *config.Config           `inject:""`
	TeamRepository repository.TeamInterface `inject:""`
}

func (t *TeamService) GetTeamInfo(slackID string) (out model.TeamModel, err error) {
	return t.TeamRepository.GetTeamBySlackID(slackID)
}
