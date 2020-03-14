package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"

	uuid "github.com/satori/go.uuid"
)

var (
	botName = "cakcuk"

	// TODO: generated in handler
	teamID = uuid.FromStringOrNil("f86ec909-6611-11ea-bdf3-0242ac110003")

	createdBy = "playground"
)

type PlaygroundService struct {
	Config         *config.Config  `inject:""`
	CommandService *CommandService `inject:""`
}

func (s *PlaygroundService) Play(msg string) (out string, err error) {
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
		out, _, err = s.CommandService.Cak(cmd, teamID, botName, createdBy)
	default:
		cukCommand := cmd.OptionsModel.ConvertCustomOptionsToCukCmd()
		out, err = s.CommandService.Cuk(cukCommand)
	}
	return
}
