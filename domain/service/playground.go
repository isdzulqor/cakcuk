package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"

	uuid "github.com/satori/go.uuid"
)

var (
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
	switch cmd.Name {
	case "help":
		if out, err = s.CommandService.Help(cmd, teamID, botName); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
			return
		}
	case "cuk":
		if out, err = s.CommandService.Cuk(cmd); err != nil {
			err = errorLib.ErrorCuk.AppendMessage(err.Error())
			return
		}
	case "cak":
		var newCommad model.CommandModel
		if out, newCommad, err = s.CommandService.Cak(cmd, teamID, botName, createdBy); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
			return
		}
		deletionTimeout := s.Config.Playground.DeletionTime
		go s.CommandService.DeleteCommands(model.CommandsModel{
			newCommad,
		}, &deletionTimeout)
	default:
		cukCommand := cmd.OptionsModel.ConvertCustomOptionsToCukCmd()
		if out, err = s.CommandService.Cuk(cukCommand); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
			return
		}
	}
	return
}
