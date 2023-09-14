package repository

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"
)

// CommandGroupInterface defines the interface for CommandGroup-related database operations
type CommandGroupInterface interface {
	InsertCommandGroup(ctx context.Context, input model.CommandGroup) error
	DeleteCommandGroupByName(ctx context.Context, name string) error
}

// CommandGroupRepository is responsible for handling CommandGroup and CommandCommandGroup related database operations
type CommandGroupRepository struct {
	DB *sqlx.DB `inject:""`
}

// InsertCommandGroup inserts an CommandGroup record into the database
func (r *CommandGroupRepository) InsertCommandGroup(ctx context.Context, input model.CommandGroup) error {
	q := `INSERT INTO CommandGroup (groupName, commandID, teamID, label)
	VALUES (?, ?, ?, ?)`
	args := []interface{}{input.GroupName, input.CommandID, input.TeamID, input.Label}
	_, err := r.DB.ExecContext(ctx, q, args...)
	if err != nil {
		err = errorLib.TranslateSQLError(err)
		if err != errorLib.ErrorNotExist {
			logging.Logger(ctx).Info(errorLib.FormatQueryError(q, args...))
			logging.Logger(ctx).Error(err)
			return err
		}
	}
	return nil
}

func (r *CommandGroupRepository) DeleteCommandGroupByName(ctx context.Context, name string) error {
	_, err := r.DB.Unsafe().ExecContext(ctx, `
	    DELETE FROM CommandGroup WHERE groupName = ?
	`, name)
	if err != nil {
		return fmt.Errorf("unable to delete CommandGroup: %v", err)
	}
	return nil
}
