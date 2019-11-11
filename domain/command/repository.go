package command

import (
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
)

// TODO
type Repository interface {
	// Resolve All Commands
	// Resolve Command One
	// Update Command One
	// Create Command One
	// Update commands ....
	GetCommandByName(name string) (out Command, err error)
	GetCommandsByBotID(botID string) (out Commands, err error)
}

// TODO
type DgraphRepository struct {
}

// TODO: resolve command from db
func (d *DgraphRepository) GetCommandByName(name string) (out Command, err error) {
	var ok bool
	if out, ok = SlackCommands[name]; ok {
		return
	}
	err = errorLib.WithMessage(errorcode.CommandNotRegistered, "Please, register your command first!")
	return
}

// TODO: resolve commands from db
func (d *DgraphRepository) GetCommandsByBotID(botID string) (out Commands, err error) {
	for _, v := range SlackCommands {
		out = append(out, v)
	}
	return
}
