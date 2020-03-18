package repository

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"fmt"
	"log"
	"sync"

	_ "github.com/go-sql-driver/mysql"
	"github.com/patrickmn/go-cache"

	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

type CommandInterface interface {
	// SQL
	GetSQLCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error)
	GetSQLCommandsByTeamID(teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error)
	CreateNewSQLCommand(command model.CommandModel) (err error)
	GetSQLOptionsByCommandID(commandID uuid.UUID) (out model.OptionsModel, err error)
	DeleteSQLCommands(commands model.CommandsModel) (err error)

	// Cache
	GetCacheCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error)
	SetCacheCommand(in model.CommandModel)
	DeleteCacheCommands(commands model.CommandsModel)

	// AllRepo
	GetCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error)
	CreateNewCommand(command model.CommandModel) (err error)
	DeleteCommands(commands model.CommandsModel) (err error)
}

type CommandRepository struct {
	SQL   *CommandSQL   `inject:""`
	Cache *CommandCache `inject:""`
}

func (c *CommandRepository) GetSQLCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	return c.SQL.GetSQLCommandByName(name, teamID)
}

func (c *CommandRepository) GetSQLCommandsByTeamID(teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error) {
	return c.SQL.GetSQLCommandsByTeamID(teamID, filter)
}

func (c *CommandRepository) CreateNewSQLCommand(command model.CommandModel) (err error) {
	return c.SQL.CreateNewSQLCommand(command)
}

func (c *CommandRepository) GetSQLOptionsByCommandID(commandID uuid.UUID) (out model.OptionsModel, err error) {
	return c.SQL.GetSQLOptionsByCommandID(commandID)
}

func (r *CommandRepository) DeleteSQLCommands(commands model.CommandsModel) (err error) {
	return r.SQL.DeleteSQLCommands(commands)
}

func (c *CommandRepository) GetCacheCommandByName(name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	return c.Cache.GetCacheCommandByName(name, teamID)
}

func (c *CommandRepository) SetCacheCommand(in model.CommandModel) {
	c.Cache.SetCacheCommand(in)
}

func (r *CommandRepository) DeleteCacheCommands(commands model.CommandsModel) {
	r.Cache.DeleteCacheCommands(commands)
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
	go c.Cache.SetCacheCommand(out)
	return
}

func (r *CommandRepository) CreateNewCommand(command model.CommandModel) (err error) {
	if err = r.SQL.CreateNewSQLCommand(command); err != nil {
		return
	}
	go r.Cache.SetCacheCommand(command)
	return
}

func (r *CommandRepository) DeleteCommands(commands model.CommandsModel) (err error) {
	go r.Cache.DeleteCacheCommands(commands)
	err = r.SQL.DeleteSQLCommands(commands)
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
	queryDeleteCommands = `
		DELETE FROM Command WHERE id IN 
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
			o.isHidden,
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
			isHidden,
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
		log.Printf("[INFO] GetCommandByName, query: %s\n", errorLib.FormatQueryError(q, name, teamID))
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
		return
	}
	options, err := r.GetSQLOptionsByCommandID(out.ID)
	if err != nil {
		return
	}
	out.OptionsModel = options
	return
}

func (r *CommandSQL) GetSQLCommandsByTeamID(teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error) {
	for _, v := range model.GetDefaultCommands() {
		out = append(out, v)
	}
	q := queryResolveCommand + `
		WHERE c.teamID = ?
	` + filter.GenerateQuery("c.")

	var commands model.CommandsModel
	if err = r.DB.Unsafe().Select(&commands, q, teamID); err != nil {
		log.Printf("[INFO] GetCommandsByTeamID, query: %s\n", errorLib.FormatQueryError(q, teamID))
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
		return
	}
	r.getCommandsOptionsWithGoroutine(&commands)
	out = append(out, commands...)
	return
}

func (r *CommandSQL) getCommandsOptionsWithGoroutine(commands *model.CommandsModel) {
	optionsChan := make(chan map[int]model.OptionsModel)
	var wg sync.WaitGroup
	wg.Add(len(*commands))
	for i, tempCommand := range *commands {
		tempCommandID := tempCommand.ID
		commandIndex := i
		go func() {
			options, _ := r.GetSQLOptionsByCommandID(tempCommandID)
			optionsChan <- map[int]model.OptionsModel{
				commandIndex: options,
			}
			wg.Done()
		}()
	}

	go func() {
		wg.Wait()
		close(optionsChan)
	}()
	for mapOptions := range optionsChan {
		for k, v := range mapOptions {
			(*commands)[k].OptionsModel = v
		}
	}
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
		tx.Rollback()
		return
	}
	if err = r.InsertNewSQLOption(tx, storedCommand.OptionsModel); err != nil {
		tx.Rollback()
		return
	}
	err = tx.Commit()
	return
}

func (r *CommandSQL) DeleteSQLCommands(commands model.CommandsModel) (err error) {
	var marks string
	var args []interface{}

	for i, cmd := range commands {
		marks += "?"
		if i != len(commands)-1 {
			marks += ","
		}
		args = append(args, cmd.ID)
	}
	query := queryDeleteCommands + "(" + marks + ")"

	_, err = r.DB.Exec(query, args...)
	if err != nil {
		log.Printf("[INFO] DeleteSQLCommands, query: %s\n", errorLib.FormatQueryError(query, args...))
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
	}
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
		log.Printf("[INFO] InsertNewCommand, query: %s\n", errorLib.FormatQueryError(queryInsertCommand, args...))
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *CommandSQL) GetSQLOptionsByCommandID(commandID uuid.UUID) (out model.OptionsModel, err error) {
	q := queryResolveOption + `
		WHERE o.commandID = ?
	`
	if err = r.DB.Unsafe().Select(&out, q, commandID); err != nil {
		log.Printf("[INFO] GetOptionsByCommandID, query: %s\n", errorLib.FormatQueryError(q, commandID))
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
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
			opt.IsHidden, opt.Example, opt.OptionAlias, opt.ValueDynamic, opt.CreatedBy)
		marks += "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
	}

	q := fmt.Sprintf("%s VALUES %s", queryInsertOption, marks)

	if tx != nil {
		_, err = tx.Exec(q, args...)
	} else {
		_, err = r.DB.Exec(q, args...)
	}
	if err != nil {
		log.Printf("[INFO] InsertNewOption, query: %s\n", errorLib.FormatQueryError(q, args...))
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
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
		out.OptionsModel.ClearCustomValue()
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

func (c *CommandCache) DeleteCacheCommands(in model.CommandsModel) {
	for _, cmd := range in {
		c.GoCache.Delete(cacheCommandPrefix + cmd.Name + ":" + cmd.TeamID.String())
	}
	return
}
