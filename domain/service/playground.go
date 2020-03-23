package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	stringLib "cakcuk/utils/string"

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

func (s *PlaygroundService) Play(msg string, teamID uuid.UUID) (out string, err error) {
	var cmd model.CommandModel
	if cmd, err = s.CommandService.ValidateInput(&msg, teamID); err != nil {
		return
	}
	if err = cmd.Extract(&msg); err != nil {
		err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
		return
	}
	_, _, filterLike := cmd.ExtractGlobalDefaultOptions()

	switch cmd.Name {
	case model.CommandHelp:
		if out, err = s.CommandService.Help(cmd, teamID, botName); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
	case model.CommandCuk:
		if out, err = s.CommandService.Cuk(cmd); err != nil {
			err = errorLib.ErrorCuk.AppendMessage(err.Error())
		}
	case model.CommandCak:
		var newCommad model.CommandModel
		if out, newCommad, err = s.CommandService.Cak(cmd, teamID, botName, createdBy); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
		}
		deletionTimeout := s.Config.Playground.DeletionTime
		go s.CommandService.DeleteCommands(model.CommandsModel{
			newCommad,
		}, &deletionTimeout)
	case model.CommandDel:
		if out, _, err = s.CommandService.Del(cmd, teamID, botName); err != nil {
			err = errorLib.ErrorDel.AppendMessage(err.Error())
		}
	default:
		cukCommand := cmd.OptionsModel.ConvertCustomOptionsToCukCmd()
		if out, err = s.CommandService.Cuk(cukCommand); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
		}
	}
	if err == nil {
		out = stringLib.Filter(out, filterLike)
	}
	return
}
