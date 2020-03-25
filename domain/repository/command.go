package repository

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"
	"fmt"
	"sync"

	_ "github.com/go-sql-driver/mysql"
	"github.com/patrickmn/go-cache"

	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

type CommandInterface interface {
	// SQL
	GetSQLCommandByName(ctx context.Context, name string, teamID uuid.UUID) (out model.CommandModel, err error)
	GetSQLCommandsByTeamID(ctx context.Context, teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error)
	GetSQLCommandsByNames(ctx context.Context, names []string, teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error)
	CreateNewSQLCommand(ctx context.Context, command model.CommandModel) (err error)
	GetSQLOptionsByCommandID(ctx context.Context, commandID uuid.UUID) (out model.OptionsModel, err error)
	DeleteSQLCommands(ctx context.Context, commands model.CommandsModel) (err error)

	// Cache
	GetCacheCommandByName(ctx context.Context, name string, teamID uuid.UUID) (out model.CommandModel, err error)
	SetCacheCommand(ctx context.Context, in model.CommandModel)
	DeleteCacheCommands(ctx context.Context, commands model.CommandsModel)

	// AllRepo
	GetCommandByName(ctx context.Context, name string, teamID uuid.UUID) (out model.CommandModel, err error)
	CreateNewCommand(ctx context.Context, command model.CommandModel) (err error)
	DeleteCommands(ctx context.Context, commands model.CommandsModel) (err error)
}

type CommandRepository struct {
	SQL   *CommandSQL   `inject:""`
	Cache *CommandCache `inject:""`
}

func (c *CommandRepository) GetSQLCommandByName(ctx context.Context, name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	return c.SQL.GetSQLCommandByName(ctx, name, teamID)
}

func (c *CommandRepository) GetSQLCommandsByTeamID(ctx context.Context, teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error) {
	return c.SQL.GetSQLCommandsByTeamID(ctx, teamID, filter)
}

func (c *CommandRepository) GetSQLCommandsByNames(ctx context.Context, names []string, teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error) {
	return c.SQL.GetSQLCommandsByNames(ctx, names, teamID, filter)
}

func (c *CommandRepository) CreateNewSQLCommand(ctx context.Context, command model.CommandModel) (err error) {
	return c.SQL.CreateNewSQLCommand(ctx, command)
}

func (c *CommandRepository) GetSQLOptionsByCommandID(ctx context.Context, commandID uuid.UUID) (out model.OptionsModel, err error) {
	return c.SQL.GetSQLOptionsByCommandID(ctx, commandID)
}

func (r *CommandRepository) DeleteSQLCommands(ctx context.Context, commands model.CommandsModel) (err error) {
	return r.SQL.DeleteSQLCommands(ctx, commands)
}

func (c *CommandRepository) GetCacheCommandByName(ctx context.Context, name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	return c.Cache.GetCacheCommandByName(ctx, name, teamID)
}

func (c *CommandRepository) SetCacheCommand(ctx context.Context, in model.CommandModel) {
	c.Cache.SetCacheCommand(ctx, in)
}

func (r *CommandRepository) DeleteCacheCommands(ctx context.Context, commands model.CommandsModel) {
	r.Cache.DeleteCacheCommands(ctx, commands)
}

func (c *CommandRepository) GetCommandByName(ctx context.Context, name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	var ok bool
	if out, ok = model.GetDefaultCommands()[name]; ok {
		return
	}
	if out, err = c.Cache.GetCacheCommandByName(ctx, name, teamID); err != nil || out.ID != uuid.Nil {
		return
	}
	if out, err = c.SQL.GetSQLCommandByName(ctx, name, teamID); err != nil {
		return
	}
	go c.Cache.SetCacheCommand(ctx, out)
	return
}

func (r *CommandRepository) CreateNewCommand(ctx context.Context, command model.CommandModel) (err error) {
	if err = r.SQL.CreateNewSQLCommand(ctx, command); err != nil {
		return
	}
	go r.Cache.SetCacheCommand(ctx, command)
	return
}

func (r *CommandRepository) DeleteCommands(ctx context.Context, commands model.CommandsModel) (err error) {
	go r.Cache.DeleteCacheCommands(ctx, commands)
	err = r.SQL.DeleteSQLCommands(ctx, commands)
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
			o.defaultValue,
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
			defaultValue,
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

func (r *CommandSQL) GetSQLCommandByName(ctx context.Context, name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	q := queryResolveCommand + `
		WHERE c.name = ? AND c.teamID = ?
	`
	if err = r.DB.Unsafe().GetContext(ctx, &out, q, name, teamID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, name, teamID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
		return
	}
	options, err := r.GetSQLOptionsByCommandID(ctx, out.ID)
	if err != nil {
		return
	}
	out.OptionsModel = options
	return
}

func (r *CommandSQL) GetSQLCommandsByNames(ctx context.Context, names []string, teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error) {
	var marks string
	args := []interface{}{
		teamID,
	}
	namesLastIndex := len(names) - 1
	for i, name := range names {
		marks += "?"
		if i != namesLastIndex {
			marks += ","
		}
		args = append(args, name)
	}
	q := queryResolveCommand + `
		WHERE c.teamID = ?
		AND c.name IN (` + marks + `)
	` + filter.GenerateQuery("c.")
	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
		return
	}
	return
}

func (r *CommandSQL) GetSQLCommandsByTeamID(ctx context.Context, teamID uuid.UUID, filter BaseFilter) (out model.CommandsModel, err error) {
	for _, v := range model.GetDefaultCommands() {
		out = append(out, v)
	}
	q := queryResolveCommand + `
		WHERE c.teamID = ?
	` + filter.GenerateQuery("c.")

	var commands model.CommandsModel
	if err = r.DB.Unsafe().SelectContext(ctx, &commands, q, teamID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, teamID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
		return
	}
	r.getCommandsOptionsWithGoroutine(ctx, &commands)
	out = append(out, commands...)
	return
}

func (r *CommandSQL) getCommandsOptionsWithGoroutine(ctx context.Context, commands *model.CommandsModel) {
	optionsChan := make(chan map[int]model.OptionsModel)
	var wg sync.WaitGroup
	wg.Add(len(*commands))
	for i, tempCommand := range *commands {
		tempCommandID := tempCommand.ID
		commandIndex := i
		go func() {
			options, _ := r.GetSQLOptionsByCommandID(ctx, tempCommandID)
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

func (r *CommandSQL) CreateNewSQLCommand(ctx context.Context, command model.CommandModel) (err error) {
	storedCommand := command.Clone()
	if err = storedCommand.OptionsModel.EncryptOptionsValue(config.Get().EncryptionPassword); err != nil {
		return
	}
	tx, err := r.DB.Beginx()
	if err != nil {
		return
	}
	if err = r.InsertNewSQLCommand(ctx, tx, command); err != nil {
		tx.Rollback()
		return
	}
	if err = r.InsertNewSQLOption(ctx, tx, storedCommand.OptionsModel); err != nil {
		tx.Rollback()
		return
	}
	err = tx.Commit()
	return
}

func (r *CommandSQL) DeleteSQLCommands(ctx context.Context, commands model.CommandsModel) (err error) {
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

	_, err = r.DB.ExecContext(ctx, query, args...)
	if err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(query, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *CommandSQL) InsertNewSQLCommand(ctx context.Context, tx *sqlx.Tx, command model.CommandModel) (err error) {
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
		_, err = tx.ExecContext(ctx, queryInsertCommand, args...)
	} else {
		_, err = r.DB.ExecContext(ctx, queryInsertCommand, args...)
	}
	if err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(queryInsertCommand, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *CommandSQL) GetSQLOptionsByCommandID(ctx context.Context, commandID uuid.UUID) (out model.OptionsModel, err error) {
	q := queryResolveOption + `
		WHERE o.commandID = ?
	`
	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, commandID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, commandID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
		return
	}
	err = out.DecryptOptionsValue(config.Get().EncryptionPassword)
	return
}

func (r *CommandSQL) InsertNewSQLOption(ctx context.Context, tx *sqlx.Tx, options model.OptionsModel) (err error) {
	var args []interface{}
	var marks string
	for i, opt := range options {
		if i > 0 {
			marks += ", \n"
		}
		args = append(args, opt.ID, opt.CommandID, opt.Name, opt.Value, opt.DefaultValue,
			opt.ShortName, opt.Description, opt.IsSingleOption, opt.IsMandatory,
			opt.IsMultipleValue, opt.IsDynamic, opt.IsEncrypted, opt.IsCustom,
			opt.IsHidden, opt.Example, opt.OptionAlias, opt.ValueDynamic, opt.CreatedBy)
		marks += "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
	}

	q := fmt.Sprintf("%s VALUES %s", queryInsertOption, marks)

	if tx != nil {
		_, err = tx.ExecContext(ctx, q, args...)
	} else {
		_, err = r.DB.ExecContext(ctx, q, args...)
	}
	if err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
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

func (c *CommandCache) GetCacheCommandByName(ctx context.Context, name string, teamID uuid.UUID) (out model.CommandModel, err error) {
	if v, found := c.GoCache.Get(cacheCommandPrefix + name + ":" + teamID.String()); found {
		out = v.(model.CommandModel)
		out.OptionsModel.ClearToDefault()
		if err = out.OptionsModel.DecryptOptionsValue(config.Get().EncryptionPassword); err != nil {
			return
		}
		return
	}
	return
}

func (c *CommandCache) SetCacheCommand(ctx context.Context, in model.CommandModel) (err error) {
	storedCommand := in.Clone()
	if err = storedCommand.OptionsModel.EncryptOptionsValue(config.Get().EncryptionPassword); err != nil {
		return
	}
	c.GoCache.Set(cacheCommandPrefix+storedCommand.Name+":"+storedCommand.TeamID.String(),
		storedCommand, config.Get().Cache.DefaultExpirationTime)
	return
}

func (c *CommandCache) DeleteCacheCommands(ctx context.Context, in model.CommandsModel) {
	for _, cmd := range in {
		c.GoCache.Delete(cacheCommandPrefix + cmd.Name + ":" + cmd.TeamID.String())
	}
	return
}
