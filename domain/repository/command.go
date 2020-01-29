package repository

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/patrickmn/go-cache"

	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

type CommandInterface interface {
	// SQL
	GetSQLCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error)
	GetSQLCommandsByTeamID(teamID uuid.UUID) (out model.CommandsModel, err error)
	CreateNewSQLCommand(command model.CommandModel) (err error)
	GetSQLOptionsByCommandID(commandID uuid.UUID) (out model.OptionsModel, err error)

	// Cache
	GetCacheCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error)
	SetCacheCommand(in model.CommandModel)

	// AllRepo
	GetCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error)
	CreateNewCommand(command model.CommandModel) (err error)
}

type CommandRepository struct {
	SQL   *CommandSQL   `inject:""`
	Cache *CommandCache `inject:""`
}

func (c *CommandRepository) GetSQLCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	return c.SQL.GetSQLCommandByName(name, teamID)
}

func (c *CommandRepository) GetSQLCommandsByTeamID(teamID uuid.UUID) (out model.CommandsModel, err error) {
	return c.SQL.GetSQLCommandsByTeamID(teamID)
}

func (c *CommandRepository) CreateNewSQLCommand(command model.CommandModel) (err error) {
	return c.SQL.CreateNewSQLCommand(command)
}

func (c *CommandRepository) GetSQLOptionsByCommandID(commandID uuid.UUID) (out model.OptionsModel, err error) {
	return c.SQL.GetSQLOptionsByCommandID(commandID)
}

func (c *CommandRepository) GetCacheCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	return c.Cache.GetCacheCommandByName(name, teamID)
}

func (c *CommandRepository) SetCacheCommand(in model.CommandModel) {
	c.Cache.SetCacheCommand(in)
}

func (c *CommandRepository) GetCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	var ok bool
	if out, ok = model.GetDefaultCommands()[name]; ok {
		return
	}
	if out, err = c.Cache.GetCacheCommandByName(name, teamID); err != nil || out.ID != uuid.Nil {
		return
	}
	if out, err = c.SQL.GetSQLCommandByName(name, teamID); err != nil {
		return
	}
	err = c.Cache.SetCacheCommand(out)
	return
}

func (r *CommandRepository) CreateNewCommand(command model.CommandModel) (err error) {
	if err = r.SQL.CreateNewSQLCommand(command); err != nil {
		return
	}
	if err = r.Cache.SetCacheCommand(command); err != nil {
		return
	}
	return
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

type CommandSQL struct {
	DB *sqlx.DB `inject:""`
}

func (r *CommandSQL) GetSQLCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	q := queryResolveCommand + `
		WHERE c.name = ? AND c.teamID = ?
	`
	if err = r.DB.Unsafe().Get(&out, q, name, teamID); err != nil {
		log.Println("[INFO] GetCommandByName, query: %s, args: %v", queryResolveCommand, name, teamID)
		log.Println("[ERROR] error: %v", err)
		err = errorLib.WithMessage(errorcode.CommandNotRegistered, "Please, register your command first!")
		return
	}
	options, err := r.GetSQLOptionsByCommandID(out.ID)
	if err != nil {
		return
	}
	out.OptionsModel = options
	return
}

func (r *CommandSQL) GetSQLCommandsByTeamID(teamID uuid.UUID) (out model.CommandsModel, err error) {
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
		options, _ := r.GetSQLOptionsByCommandID(commands[i].ID)
		commands[i].OptionsModel = options
	}
	out = append(out, commands...)
	return
}

func (r *CommandSQL) CreateNewSQLCommand(command model.CommandModel) (err error) {
	storedCommand := command.Clone()
	if err = storedCommand.OptionsModel.EncryptOptionsValue(config.Get().EncryptionPassword); err != nil {
		return
	}
	tx, err := r.DB.Beginx()
	if err != nil {
		return
	}
	if err = r.InsertNewSQLCommand(tx, command); err != nil {
		err = tx.Rollback()
		return
	}
	if err = r.InsertNewSQLOption(tx, storedCommand.OptionsModel); err != nil {
		err = tx.Rollback()
		return
	}
	err = tx.Commit()
	return
}

func (r *CommandSQL) InsertNewSQLCommand(tx *sqlx.Tx, command model.CommandModel) (err error) {
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

func (r *CommandSQL) GetSQLOptionsByCommandID(commandID uuid.UUID) (out model.OptionsModel, err error) {
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

func (r *CommandSQL) InsertNewSQLOption(tx *sqlx.Tx, options model.OptionsModel) (err error) {
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

const (
	cacheCommandPrefix = "command:"
	cacheOptionPrefix  = "option:"
)

type CommandCache struct {
	GoCache *cache.Cache `inject:""`
}

func (c *CommandCache) GetCacheCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	if v, found := c.GoCache.Get(cacheCommandPrefix + name + ":" + teamID.String()); found {
		out = v.(model.CommandModel)
		if err = out.OptionsModel.DecryptOptionsValue(config.Get().EncryptionPassword); err != nil {
			return
		}
		return
	}
	return
}

func (c *CommandCache) SetCacheCommand(in model.CommandModel) (err error) {
	storedCommand := in.Clone()
	if err = storedCommand.OptionsModel.EncryptOptionsValue(config.Get().EncryptionPassword); err != nil {
		return
	}
	c.GoCache.Set(cacheCommandPrefix+storedCommand.Name+":"+storedCommand.TeamID.String(),
		storedCommand, config.Get().Cache.DefaultExpirationTime)
	return
}
