package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"

	"github.com/nlopes/slack"
)

type SlackTeamService struct {
	Config      *config.Config `inject:""`
	SlackClient *slack.Client  `inject:""`
}

func (s *SlackTeamService) GetTeamInfo() (model.SlackTeamModel, error) {
	var out model.SlackTeamModel
	team, err := s.SlackClient.GetTeamInfo()
	if err != nil {
		return out, err
	}
	out = model.SlackTeamModel{Team: *team}
	return out, nil
}
