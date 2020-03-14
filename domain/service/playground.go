package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"

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
		return
	}
	switch cmd.Name {
	case "help":
		out = s.CommandService.Help(cmd, teamID, botName)
	case "cuk":
		out, err = s.CommandService.Cuk(cmd)
	case "cak":
		var newCommad model.CommandModel
		out, newCommad, err = s.CommandService.Cak(cmd, teamID, botName, createdBy)
		deletionTimeout := s.Config.Playground.DeletionTime
		go s.CommandService.DeleteCommands(model.CommandsModel{
			newCommad,
		}, &deletionTimeout)
	default:
		cukCommand := cmd.OptionsModel.ConvertCustomOptionsToCukCmd()
		out, err = s.CommandService.Cuk(cukCommand)
	}
	return
}
