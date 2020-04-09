package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"context"
)

const (
	botName        = "cakcuk"
	userPlayground = "playground"
)

type PlaygroundService struct {
	Config         *config.Config  `inject:""`
	CommandService *CommandService `inject:""`
	TeamService    *TeamService    `inject:""`
	ScopeService   *ScopeService   `inject:""`
}

func (s *PlaygroundService) Play(ctx context.Context, msg, playID string) (out string, err error) {
	var cmdResponse model.CommandResponseModel
	if cmdResponse.Team, _, err = s.prePlay(ctx, playID); err != nil {
		return
	}
	if cmdResponse, err = s.CommandService.Prepare(ctx, msg, userPlayground, cmdResponse.Team.ReferenceID, botName); err != nil {
		return
	}
	if cmdResponse.IsHelp {
		out = cmdResponse.Message
		return
	}
	if cmdResponse, err = s.CommandService.Exec(ctx, cmdResponse, botName, userPlayground); err != nil {
		return
	}
	out = cmdResponse.Message
	return
}

func (s *PlaygroundService) prePlay(ctx context.Context, playID string) (team model.TeamModel, publicScope model.ScopeModel, err error) {
	team.Name = userPlayground
	team.Create(userPlayground, playID)
	if team, err = s.TeamService.MustCreate(ctx, team); err != nil {
		return
	}
	publicScope = model.GeneratePublicScope()
	publicScope.TeamID = team.ID
	publicScope, err = s.ScopeService.MustCreate(ctx, publicScope)
	return
}
