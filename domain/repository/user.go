package repository

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"

	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

const (
	querySelectUser = `
		SELECT 
			u.id,
			u.name,
			u.referenceID,
			u.teamID,
			u.created,
			u.createdBy,
			u.updated,
			u.updatedBy
		FROM ` + "`User` u"
	queryInsertUsersHeader = `
		INSERT INTO User (
			id,
			name,
			referenceID,
			teamID,
			created,
			createdBy,
			updated,
			updatedBy
		) VALUES 
	`
	queryInsertUsersQMarks = `(?, ?, ?, ?, ?, ?, ?, ?)`
	queryInsertUsersFooter = `ON DUPLICATE KEY UPDATE 
			name = VALUES(name), 
			updated = VALUES(updated), 
			updatedBy = VALUES(updatedBy)
	`
	queryDeleteUsers = `
		DELETE 
			u 
		FROM 
			User u
		WHERE u.id IN 
	`
)

type UserInterface interface {
	GetUsersByTeamID(ctx context.Context, teamID uuid.UUID, filter BaseFilter) (out model.UsersModel, err error)
	GetUsersByReferenceIDs(ctx context.Context, teamID uuid.UUID, referenceIDs []string) (out model.UsersModel, err error)
	GetUserOneByReferenceID(ctx context.Context, teamID uuid.UUID, referenceID string) (out model.UserModel, err error)
	InsertUsers(ctx context.Context, users ...model.UserModel) (err error)
	DeleteUsers(ctx context.Context, users ...model.UserModel) (err error)
}

type UserRepository struct {
	DB *sqlx.DB `inject:""`
}

func (r UserRepository) GetUsersByTeamID(ctx context.Context, teamID uuid.UUID, filter BaseFilter) (out model.UsersModel, err error) {
	q := querySelectUser + `
		WHERE u.teamID = ?
	` + filter.GenerateQuery("u.")

	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, teamID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, teamID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	if len(out) == 0 {
		err = errorLib.ErrorNotExist
	}
	return
}

func (r UserRepository) GetUsersByReferenceIDs(ctx context.Context, teamID uuid.UUID, referenceIDs []string) (out model.UsersModel, err error) {
	var marks string
	args := []interface{}{
		teamID,
	}
	lastReferenceIndex := len(referenceIDs) - 1
	for i, refID := range referenceIDs {
		marks += "?"
		if i != lastReferenceIndex {
			marks += ","
		}
		args = append(args, refID)
	}

	q := querySelectUser + `
		WHERE u.teamID = ? AND u.referenceID IN 
	` + "(" + marks + ")"

	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r UserRepository) DeleteUsers(ctx context.Context, users ...model.UserModel) (err error) {
	var (
		marks string
		args  []interface{}
	)

	lastUserIdx := len(users) - 1
	for i, user := range users {
		marks += "?"
		if i != lastUserIdx {
			marks += ","
		}
		args = append(args, user.ID)
	}
	q := queryDeleteUsers + "(" + marks + ")"
	if _, err = r.DB.Unsafe().ExecContext(ctx, q, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r UserRepository) InsertUsers(ctx context.Context, users ...model.UserModel) (err error) {
	var (
		args      []interface{}
		q, qMarks string
	)
	lastIndex := len(users) - 1
	for i, user := range users {
		args = append(args, user.ID, user.Name, user.ReferenceID, user.TeamID, user.Created, user.CreatedBy, user.Updated, user.UpdatedBy)
		qMarks += queryInsertUsersQMarks
		if i != lastIndex {
			qMarks += ",\n"
		}
	}
	q = queryInsertUsersHeader + qMarks + queryInsertUsersFooter
	if _, err = r.DB.Unsafe().ExecContext(ctx, q, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r UserRepository) GetUserOneByReferenceID(ctx context.Context, teamID uuid.UUID, referenceID string) (out model.UserModel, err error) {
	var temp model.UsersModel
	if temp, err = r.GetUsersByReferenceIDs(ctx, teamID, []string{referenceID}); err != nil {
		return
	}
	if len(temp) >= 1 {
		out = temp[0]
		return
	}
	err = errorLib.ErrorNotExist
	return
}
