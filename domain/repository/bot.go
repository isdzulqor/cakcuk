package repository

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"

	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

const (
	queryResolveBot = `
		SELECT
			s.id,
			s.referenceID,
			s.teamID,
			s.name,
			s.source,
			s.created,
			s.createdBy
		FROM
			Bot s
	`
	queryInsertBot = `
		INSERT INTO Bot (
			id,
			referenceID,
			teamID,
			name,
			source,
			createdBy
		) VALUES (?, ?, ?, ?, ?, ?)
		ON DUPLICATE KEY UPDATE 
		referenceID = VALUES(referenceID),
		teamID = VALUES(teamID),
		name = VALUES(name)
	`
	queryInsertBotSQLite = `
		INSERT OR REPLACE INTO Bot (
			id,
			referenceID,
			teamID,
			name,
			source,
			createdBy
		) VALUES (?, ?, ?, ?, ?, ?)
	`
)

type BotInterface interface {
	GetBotByReferenceIDAndTeamID(ctx context.Context, referenceID string, teamID uuid.UUID) (out model.BotModel, err error)
	GetBotByTeamID(ctx context.Context, teamID uuid.UUID) (out model.BotModel, err error)
	InsertBotInfo(ctx context.Context, bot model.BotModel) (err error)
}

type BotSQL struct {
	DB *sqlx.DB `inject:""`
}

func (s *BotSQL) GetBotByReferenceIDAndTeamID(ctx context.Context, referenceID string, teamID uuid.UUID) (out model.BotModel, err error) {
	q := queryResolveBot + `
		WHERE s.referenceID = ? AND s.teamID = ?
	`
	if err = s.DB.Unsafe().GetContext(ctx, &out, q, referenceID, teamID); err != nil {
		err = errorLib.TranslateSQLError(err)
		if err != errorLib.ErrorNotExist {
			logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, referenceID, teamID))
			logging.Logger(ctx).Error(err)
			return
		}
	}
	return
}

func (s *BotSQL) GetBotByTeamID(ctx context.Context, teamID uuid.UUID) (out model.BotModel, err error) {
	q := queryResolveBot + `
		WHERE s.teamID = ?
	`
	if err = s.DB.Unsafe().GetContext(ctx, &out, q, teamID); err != nil {
		err = errorLib.TranslateSQLError(err)
		if err != errorLib.ErrorNotExist {
			logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, teamID))
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
		bot.TeamID,
		bot.Name,
		bot.Source,
		bot.CreatedBy,
	}

	q := queryInsertBot
	if config.Get().SQLITE.Enabled {
		q = queryInsertBotSQLite
	}

	if _, err = s.DB.ExecContext(ctx, q, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}
