package server

import (
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
)

type Startup struct {
	SlackbotRepository repository.SlackbotInterface `inject:""`
	TeamRepository     repository.TeamInterface     `inject:""`
}

func (s *Startup) Start(team model.TeamModel, slackbot model.SlackbotModel) (err error) {
	if err = s.TeamRepository.InsertTeamInfo(team); err != nil {
		return
	}
	if err = s.SlackbotRepository.InsertSlackbotInfo(slackbot); err != nil {
		return
	}
	return
}
