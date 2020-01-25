package repository

import (
	"cakcuk/domain/model"
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"

	_ "github.com/go-sql-driver/mysql"

	"github.com/jmoiron/sqlx"
)

// TODO
type CommandInterface interface {
	// Resolve All Commands
	// Resolve Command One
	// Update Command One
	// Create Command One
	// Update commands ....
	GetCommandByName(name string) (out model.CommandModel, err error)
	GetCommandsByTeamID(teamID string) (out model.CommandsModel, err error)
}

const (
	queryResolveCommand = `
		SELECT
			c.id,
			c.teamID,
			c.name,
			c.description,
			c.example,
			c.completeDescription,
			c.created,
			c.createdBy
		FROM
			Command c
	`
	queryInsertCommand = `
		INSERT INTO Command (
			id,
			teamID,
			name,
			description,
			example,
			completeDescription,
			createdBy
		) VALUES (?, ?, ?, ?, ?, ?, ?)
	`
	queryInsertOption = `
		INSERT INTO Command (
			id,
			commandID,
			name,
			value,
			shortName,
			description,
			isSingleOption,
			isMandatory,
			isMultipleValue,
			isDynamic,
			isEncrypted,
			isCustom,
			example,
			optionAlias,
			createdBy
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`
)

// TODO
type CommandSQL struct {
	DB *sqlx.DB `inject:""`
}

// TODO: resolve command from db
// TODO: resolve options in commands.ID
func (r *CommandSQL) GetCommandByName(name string) (out model.CommandModel, err error) {
	var ok bool
	if out, ok = model.GetDefaultCommands()[name]; ok {
		return
	}
	q := queryResolveCommand + `
		WHERE c.name = ?
	`
	if err = r.DB.Select(&out, q, name); err != nil {
		err = errorLib.WithMessage(errorcode.CommandNotRegistered, "Please, register your command first!")
	}
	return
}

// TODO: resolve commands from db
func (r *CommandSQL) GetCommandsByTeamID(teamID string) (out model.CommandsModel, err error) {
	for _, v := range model.GetDefaultCommands() {
		out = append(out, v)
	}
	q := queryResolveCommand + `
		WHERE c.teamID = ?
	`
	var commands model.CommandsModel
	if err = r.DB.Select(&commands, q, teamID); err != nil {
		return
	}
	out = append(out, commands...)
	return
}
