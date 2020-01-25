package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/external"
)

type SlackTeamService struct {
	Config      *config.Config        `inject:""`
	SlackClient *external.SlackClient `inject:""`
}

func (s *SlackTeamService) GetTeamInfo() (model.SlackTeamModel, error) {
	var out model.SlackTeamModel
	team, err := s.SlackClient.GetTeamInfo()
	if err != nil {
		return out, err
	}
	out.SlackID = team.ID
	out.Name = team.Name
	out.Domain = team.Domain
	out.EmailDomain = team.EmailDomain
	return out, nil
}
