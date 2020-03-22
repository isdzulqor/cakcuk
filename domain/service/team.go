package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"log"
)

type TeamService struct {
	Config         *config.Config           `inject:""`
	TeamRepository repository.TeamInterface `inject:""`
	SlackClient    *external.SlackClient    `inject:""`
}

func (t *TeamService) StartUp() (out model.TeamModel, err error) {
	var slackTeam external.SlackTeam
	if slackTeam, err = t.SlackClient.GetTeamInfo(); err != nil {
		return
	}
	if out, err = t.TeamRepository.GetSQLTeamBySlackID(*slackTeam.ID); err != nil {
		out.Create(*slackTeam.Name, *slackTeam.ID)
	}
	out.FromSlackTeam(slackTeam)
	if err = t.TeamRepository.InsertTeamInfo(out); err != nil {
		return
	}
	log.Printf("[INFO] team info: %v\n", jsonLib.ToPrettyNoError(out))
	return
}

func (t *TeamService) GetTeamInfo(slackID string) (out model.TeamModel, err error) {
	return t.TeamRepository.GetTeamBySlackID(slackID)
}
