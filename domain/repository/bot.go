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
	queryResolveBot = `
		SELECT
			s.id,
			s.referenceID,
			s.name,
			s.created,
			s.createdBy
		FROM
			Bot s
	`
	queryInsertBot = `
		INSERT INTO Bot (
			id,
			referenceID,
			name,
			createdBy
		) VALUES (?, ?, ?, ?)
		ON DUPLICATE KEY UPDATE name = VALUES(name)
	`
)

type BotInterface interface {
	GetBotByReferenceID(ctx context.Context, referenceID string) (out model.BotModel, err error)
	InsertBotInfo(ctx context.Context, bot model.BotModel) (err error)
}

type BotSQL struct {
	DB *sqlx.DB `inject:""`
}

func (s *BotSQL) GetBotByReferenceID(ctx context.Context, referenceID string) (out model.BotModel, err error) {
	q := queryResolveBot + `
		WHERE s.referenceID = ?
	`
	if err = s.DB.Unsafe().GetContext(ctx, &out, q, referenceID); err != nil {
		err = errorLib.TranslateSQLError(err)
		if err != errorLib.ErrorNotExist {
			logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, referenceID))
			logging.Logger(ctx).Error(err)
			return
		}
	}
	return
}

func (s BotSQL) InsertBotInfo(ctx context.Context, bot model.BotModel) (err error) {
	args := []interface{}{
		bot.ID,
		bot.ReferenceID,
		bot.Name,
		bot.CreatedBy,
	}
	if _, err = s.DB.ExecContext(ctx, queryInsertBot, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(queryInsertBot, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}
