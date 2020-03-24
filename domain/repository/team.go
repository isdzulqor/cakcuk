package repository

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/patrickmn/go-cache"
	uuid "github.com/satori/go.uuid"
)

const (
	queryResolveTeam = `
		SELECT
			t.id,
			t.slackID,
			t.name,
			t.domain,
			t.emailDomain,
			t.created,
			t.createdBy
		FROM
			Team t
	`
	queryInsertTeam = `
		INSERT INTO Team (
			id,
			slackID,
			name,
			domain,
			emailDomain,
			createdBy
		) VALUES (?, ?, ?, ?, ?, ?)
		ON DUPLICATE KEY UPDATE 
			name = VALUES(name), 
			domain = VALUES(domain), 
			emailDomain = VALUES(emailDomain)
	`
)

type TeamInterface interface {
	GetTeamBySlackID(ctx context.Context, slackID string) (out model.TeamModel, err error)
	InsertTeamInfo(ctx context.Context, team model.TeamModel) (err error)

	GetSQLTeamBySlackID(ctx context.Context, slackID string) (out model.TeamModel, err error)
}

type TeamRepository struct {
	SQL   *TeamSQL   `inject:""`
	Cache *TeamCache `inject:""`
}

func (t *TeamRepository) GetTeamBySlackID(ctx context.Context, slackID string) (out model.TeamModel, err error) {
	if out, err = t.Cache.GetCacheTeamBySlackID(ctx, slackID); err != nil || out.ID != uuid.Nil {
		return
	}
	if out, err = t.SQL.GetSQLTeamBySlackID(ctx, slackID); err != nil {
		return
	}
	go t.Cache.SetCacheTeam(ctx, out)
	return
}

func (t *TeamRepository) InsertTeamInfo(ctx context.Context, team model.TeamModel) (err error) {
	if err = t.SQL.InsertSQLTeamInfo(ctx, team); err != nil {
		return
	}
	go t.Cache.SetCacheTeam(ctx, team)
	return
}

func (t *TeamRepository) GetSQLTeamBySlackID(ctx context.Context, slackID string) (out model.TeamModel, err error) {
	return t.SQL.GetSQLTeamBySlackID(ctx, slackID)
}

type TeamSQL struct {
	DB *sqlx.DB `inject:""`
}

func (t *TeamSQL) GetSQLTeamBySlackID(ctx context.Context, slackID string) (out model.TeamModel, err error) {
	q := queryResolveTeam + `
		WHERE t.slackID = ?
	`
	if err = t.DB.Unsafe().GetContext(ctx, &out, q, slackID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, slackID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (t TeamSQL) InsertSQLTeamInfo(ctx context.Context, team model.TeamModel) (err error) {
	args := []interface{}{
		team.ID,
		team.SlackID,
		team.Name,
		team.Domain,
		team.EmailDomain,
		team.CreatedBy,
	}
	if _, err = t.DB.ExecContext(ctx, queryInsertTeam, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(queryInsertTeam, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

const (
	cacheTeamPrefix = "team:"
)

type TeamCache struct {
	GoCache *cache.Cache `inject:""`
}

func (t *TeamCache) GetCacheTeamBySlackID(ctx context.Context, slackID string) (out model.TeamModel, err error) {
	if v, found := t.GoCache.Get(cacheTeamPrefix + slackID); found {
		out = v.(model.TeamModel)
		return
	}
	return
}

func (t *TeamCache) SetCacheTeam(ctx context.Context, in model.TeamModel) {
	t.GoCache.Set(cacheTeamPrefix+in.SlackID, in, config.Get().Cache.DefaultExpirationTime)
	return
}
