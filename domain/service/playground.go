package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	stringLib "cakcuk/utils/string"
	"context"

	uuid "github.com/satori/go.uuid"
)

const (
	botName   = "cakcuk"
	createdBy = "playground"
)

type PlaygroundService struct {
	Config         *config.Config  `inject:""`
	CommandService *CommandService `inject:""`
}

func (s *PlaygroundService) Play(ctx context.Context, msg string, teamID uuid.UUID) (out string, err error) {
	var cmd model.CommandModel
	if cmd, err = s.CommandService.ValidateInput(ctx, &msg, teamID); err != nil {
		return
	}
	if err = cmd.Extract(&msg); err != nil {
		err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
		return
	}
	_, _, filterLike := cmd.ExtractGlobalDefaultOptions()

	switch cmd.Name {
	case model.CommandHelp:
		if out, err = s.CommandService.Help(ctx, cmd, teamID, botName); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
	case model.CommandCuk:
		if out, err = s.CommandService.Cuk(ctx, cmd); err != nil {
			err = errorLib.ErrorCuk.AppendMessage(err.Error())
		}
	case model.CommandCak:
		var newCommad model.CommandModel
		if out, newCommad, err = s.CommandService.Cak(ctx, cmd, teamID, botName, createdBy); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
		}
		deletionTimeout := s.Config.Playground.DeletionTime
		go s.CommandService.DeleteCommands(ctx, model.CommandsModel{
			newCommad,
		}, &deletionTimeout)
	case model.CommandDel:
		if out, _, err = s.CommandService.Del(ctx, cmd, teamID, botName); err != nil {
			err = errorLib.ErrorDel.AppendMessage(err.Error())
		}
	default:
		cukCommand := cmd.OptionsModel.ConvertCustomOptionsToCukCmd()
		if out, err = s.CommandService.Cuk(ctx, cukCommand); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
		}
	}
	if err == nil {
		out = stringLib.Filter(out, filterLike, false)
	}
	return
}
