package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	stringLib "cakcuk/utils/string"
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
	var (
		cmd    model.CommandModel
		scopes model.ScopesModel
		team   model.TeamModel
	)

	if team, _, err = s.prePlay(ctx, playID); err != nil {
		return
	}

	if cmd, scopes, err = s.CommandService.ValidateInput(ctx, &msg, team.ID, userPlayground); err != nil {
		return
	}
	if err = cmd.Extract(&msg); err != nil {
		err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
		return
	}
	_, _, _, filterLike := cmd.ExtractGlobalDefaultOptions()

	switch cmd.Name {
	case model.CommandHelp:
		if out, err = s.CommandService.Help(ctx, cmd, team.ID, botName, scopes); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
	case model.CommandCuk:
		if out, err = s.CommandService.Cuk(ctx, cmd); err != nil {
			err = errorLib.ErrorCuk.AppendMessage(err.Error())
		}
	case model.CommandCak:
		var newCommad model.CommandModel
		if out, newCommad, err = s.CommandService.Cak(ctx, cmd, team.ID, botName, userPlayground, scopes); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
		}
		deletionTimeout := s.Config.Playground.DeletionTime
		go s.CommandService.DeleteCommands(ctx, model.CommandsModel{
			newCommad,
		}, &deletionTimeout)
	case model.CommandDel:
		if out, _, err = s.CommandService.Del(ctx, cmd, team.ID, botName, scopes); err != nil {
			err = errorLib.ErrorDel.AppendMessage(err.Error())
		}
	case model.CommandScope:
		if out, err = s.CommandService.Scope(ctx, cmd, team.ID, botName, userPlayground, scopes); err != nil {
			err = errorLib.ErrorScope.AppendMessage(err.Error())
		}
	default:
		if out, err = s.CommandService.CustomCommand(ctx, cmd); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
		}
	}
	if err == nil {
		out = stringLib.Filter(out, filterLike, false)
	}
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
