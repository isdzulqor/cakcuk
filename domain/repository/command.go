package repository

import (
	"cakcuk/domain/model"
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
)

// TODO
type CommandInterface interface {
	// Resolve All Commands
	// Resolve Command One
	// Update Command One
	// Create Command One
	// Update commands ....
	GetCommandByName(name string) (out model.CommandModel, err error)
	GetCommandsByBotID(botID string) (out model.CommandsModel, err error)
	GetCommandsByTeamID(teamID string) (out model.CommandsModel, err error)
}

// TODO
type CommandSQL struct {
}

// TODO: resolve command from db
func (d *CommandSQL) GetCommandByName(name string) (out model.CommandModel, err error) {
	var ok bool
	if out, ok = model.GetDefaultCommands()[name]; ok {
		return
	}
	err = errorLib.WithMessage(errorcode.CommandNotRegistered, "Please, register your command first!")
	return
}

// TODO: resolve commands from db
func (d *CommandSQL) GetCommandsByBotID(botID string) (out model.CommandsModel, err error) {
	for _, v := range model.GetDefaultCommands() {
		out = append(out, v)
	}
	return
}

// TODO: resolve commands from db
func (d *CommandSQL) GetCommandsByTeamID(teamID string) (out model.CommandsModel, err error) {
	for _, v := range model.GetDefaultCommands() {
		out = append(out, v)
	}
	return
}
