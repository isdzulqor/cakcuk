package repository

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"

	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

// TODO
type CommandInterface interface {
	GetCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error)
	GetCommandsByTeamID(teamID uuid.UUID) (out model.CommandsModel, err error)
	CreateNewCommand(command model.CommandModel) (err error)
	GetOptionsByCommandID(commandID uuid.UUID) (out model.OptionsModel, err error)
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
	queryResolveOption = `
		SELECT
			o.id,
			o.commandID,
			o.name,
			o.value,
			o.shortName,
			o.description,
			o.isSingleOption,
			o.isMandatory,
			o.isMultipleValue,
			o.isDynamic,
			o.isEncrypted,
			o.isCustom,
			o.example,
			o.optionAlias,
			o.valueDynamic,
			o.created,
			o.createdBy
		FROM
			` + "`Option` o"

	queryInsertOption = `
		INSERT INTO ` + "`Option`" + ` (
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
			valueDynamic,
			createdBy
		)
	`
)

// TODO
type CommandSQL struct {
	DB *sqlx.DB `inject:""`
}

// TODO: resolve command from db
// TODO: resolve options in commands.ID
func (r *CommandSQL) GetCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	var ok bool
	if out, ok = model.GetDefaultCommands()[name]; ok {
		return
	}
	q := queryResolveCommand + `
		WHERE c.name = ? AND c.teamID = ?
	`
	if err = r.DB.Unsafe().Get(&out, q, name, teamID); err != nil {
		log.Println("[INFO] GetCommandByName, query: %s, args: %v", queryResolveCommand, name, teamID)
		log.Println("[ERROR] error: %v", err)
		err = errorLib.WithMessage(errorcode.CommandNotRegistered, "Please, register your command first!")
		return
	}
	options, err := r.GetOptionsByCommandID(out.ID)
	if err != nil {
		return
	}
	out.OptionsModel = options
	return
}

// TODO: resolve commands from db
func (r *CommandSQL) GetCommandsByTeamID(teamID uuid.UUID) (out model.CommandsModel, err error) {
	for _, v := range model.GetDefaultCommands() {
		out = append(out, v)
	}
	q := queryResolveCommand + `
		WHERE c.teamID = ?
	`
	var commands model.CommandsModel
	if err = r.DB.Unsafe().Select(&commands, q, teamID); err != nil {
		log.Println("[INFO] GetCommandsByTeamID, query: %s, args: %v", q, teamID)
		log.Println("[ERROR] error: %v", err)
		return
	}
	for i, _ := range commands {
		options, _ := r.GetOptionsByCommandID(commands[i].ID)
		commands[i].OptionsModel = options
	}
	out = append(out, commands...)
	return
}

func (r *CommandSQL) CreateNewCommand(command model.CommandModel) (err error) {
	if err = command.OptionsModel.EncryptOptionsValue(config.Get().EncryptionPassword); err != nil {
		return
	}
	tx, err := r.DB.Beginx()
	if err != nil {
		return
	}
	if err = r.InsertNewCommand(tx, command); err != nil {
		err = tx.Rollback()
		return
	}
	if err = r.InsertNewOption(tx, command.OptionsModel); err != nil {
		err = tx.Rollback()
		return
	}
	err = tx.Commit()
	return
}

func (r *CommandSQL) InsertNewCommand(tx *sqlx.Tx, command model.CommandModel) (err error) {
	args := []interface{}{
		command.ID,
		command.TeamID,
		command.Name,
		command.Description,
		command.Example,
		command.CompleteDesciption,
		command.CreatedBy,
	}
	if tx != nil {
		_, err = tx.Exec(queryInsertCommand, args...)
	} else {
		_, err = r.DB.Exec(queryInsertCommand, args...)
	}
	if err != nil {
		log.Println("[INFO] InsertNewCommand, query: %s, args: %v", queryInsertCommand, args)
		log.Println("[ERROR] error: %v", err)
	}
	return
}

// TODO: resolve options from db
func (r *CommandSQL) GetOptionsByCommandID(commandID uuid.UUID) (out model.OptionsModel, err error) {
	q := queryResolveOption + `
		WHERE o.commandID = ?
	`
	if err = r.DB.Unsafe().Select(&out, q, commandID); err != nil {
		log.Println("[INFO] GetOptionsByCommandID, query: %s, args: %v", q, commandID)
		log.Println("[ERROR] error: %v", err)
		return
	}
	err = out.DecryptOptionsValue(config.Get().EncryptionPassword)
	return
}

func (r *CommandSQL) InsertNewOption(tx *sqlx.Tx, options model.OptionsModel) (err error) {
	var args []interface{}
	var marks string
	for i, opt := range options {
		if i > 0 {
			marks += ", \n"
		}
		args = append(args, opt.ID, opt.CommandID, opt.Name, opt.Value,
			opt.ShortName, opt.Description, opt.IsSingleOpt, opt.IsMandatory,
			opt.IsMultipleValue, opt.IsDynamic, opt.IsEncrypted, opt.IsCustom,
			opt.Example, opt.OptionAlias, opt.ValueDynamic, opt.CreatedBy)
		marks += "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
	}

	q := fmt.Sprintf("%s VALUES %s", queryInsertOption, marks)

	if tx != nil {
		_, err = tx.Exec(q, args...)
	} else {
		_, err = r.DB.Exec(q, args...)
	}
	if err != nil {
		log.Println("[INFO] InsertNewOption, query: %s, args: %v", q, args)
		log.Println("[ERROR] error: %v", err)
	}
	return
}
