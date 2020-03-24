package repository

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

const (
	queryResolveSlackbot = `
		SELECT
			s.id,
			s.slackID,
			s.name,
			s.created,
			s.createdBy
		FROM
			Slackbot s
	`
	queryInsertSlackbot = `
		INSERT INTO Slackbot (
			id,
			slackID,
			name,
			createdBy
		) VALUES (?, ?, ?, ?)
		ON DUPLICATE KEY UPDATE name = VALUES(name)
	`
)

type SlackbotInterface interface {
	GetSlackbotBySlackID(ctx context.Context, slackID string) (out model.SlackbotModel, err error)
	InsertSlackbotInfo(ctx context.Context, slackbot model.SlackbotModel) (err error)
}

type SlackbotSQL struct {
	DB *sqlx.DB `inject:""`
}

// TODO: context
func (s *SlackbotSQL) GetSlackbotBySlackID(ctx context.Context, slackID string) (out model.SlackbotModel, err error) {
	q := queryResolveSlackbot + `
		WHERE s.slackID = ?
	`
	if err = s.DB.Unsafe().GetContext(ctx, &out, q, slackID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, slackID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

// TODO: context
func (s SlackbotSQL) InsertSlackbotInfo(ctx context.Context, slackbot model.SlackbotModel) (err error) {
	args := []interface{}{
		slackbot.ID,
		slackbot.SlackID,
		slackbot.Name,
		slackbot.CreatedBy,
	}
	if _, err = s.DB.ExecContext(ctx, queryInsertSlackbot, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(queryInsertSlackbot, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}
