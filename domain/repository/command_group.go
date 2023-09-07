package repository

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"
)

// CommandGroupInterface defines the interface for CommandGroup-related database operations
type CommandGroupInterface interface {
	InsertCommandGroup(ctx context.Context, input model.CommandGroup) error
	GetCommandGroupByName(ctx context.Context, groupName string) (*model.CommandGroup, error)
	GetCommandGroupsByTeamID(ctx context.Context, teamID string) ([]model.CommandGroup, error)
	DeleteCommandGroupByName(ctx context.Context, name string) error
}

// CommandGroupRepository is responsible for handling CommandGroup and CommandCommandGroup related database operations
type CommandGroupRepository struct {
	DB *sqlx.DB `inject:""`
}

// InsertCommandGroup inserts an CommandGroup record into the database
func (r *CommandGroupRepository) InsertCommandGroup(ctx context.Context, input model.CommandGroup) error {
	q := `INSERT INTO CommandGroup (groupName, commandID, teamID, givenID)
	VALUES (?, ?, ?, ?)`
	args := []interface{}{input.GroupName, input.CommandID, input.TeamID, input.GivenID}
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

func (r *CommandGroupRepository) GetCommandGroupByName(ctx context.Context, groupName string) (*model.CommandGroup, error) {
	var out model.CommandGroup
	err := r.DB.Unsafe().GetContext(ctx, &out, `
	    SELECT * FROM CommandGroup WHERE groupName = ?
	`, groupName)
	if err != nil {
		return nil, fmt.Errorf("unable to get CommandGroup: %v", err)
	}
	return &out, nil
}

func (r *CommandGroupRepository) GetCommandGroupsByTeamID(ctx context.Context, teamID string) ([]model.CommandGroup, error) {
	var out []model.CommandGroup
	err := r.DB.Unsafe().SelectContext(ctx, &out, `
	    SELECT * FROM CommandGroup WHERE teamID = ?
	`, teamID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("unable to get CommandGroups: %v", err)
	}
	return out, nil
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
