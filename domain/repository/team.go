package repository

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"log"

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
	GetTeamBySlackID(slackID string) (out model.TeamModel, err error)
	InsertTeamInfo(team model.TeamModel) (err error)
}

type TeamRepository struct {
	SQL   *TeamSQL   `inject:""`
	Cache *TeamCache `inject:""`
}

func (t *TeamRepository) GetTeamBySlackID(slackID string) (out model.TeamModel, err error) {
	if out, err = t.Cache.GetCacheTeamBySlackID(slackID); err != nil || out.ID != uuid.Nil {
		return
	}
	if out, err = t.SQL.GetSQLTeamBySlackID(slackID); err != nil {
		return
	}
	go t.Cache.SetCacheTeam(out)
	return
}

func (t *TeamRepository) InsertTeamInfo(team model.TeamModel) (err error) {
	if err = t.SQL.InsertSQLTeamInfo(team); err != nil {
		return
	}
	go t.Cache.SetCacheTeam(team)
	return
}

type TeamSQL struct {
	DB *sqlx.DB `inject:""`
}

func (t *TeamSQL) GetSQLTeamBySlackID(slackID string) (out model.TeamModel, err error) {
	q := queryResolveTeam + `
		WHERE t.slackID = ?
	`
	if err = t.DB.Unsafe().Get(&out, q, slackID); err != nil {
		log.Printf("[INFO] GetTeamBySlackID, query: %s, args: %v\n", q, slackID)
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (t TeamSQL) InsertSQLTeamInfo(team model.TeamModel) (err error) {
	args := []interface{}{
		team.ID,
		team.SlackID,
		team.Name,
		team.Domain,
		team.EmailDomain,
		team.CreatedBy,
	}
	if _, err = t.DB.Exec(queryInsertTeam, args...); err != nil {
		log.Printf("[INFO] InsertTeamInfo, query: %s, args: %v\n", queryInsertTeam, args)
		log.Printf("[ERROR] error: %v\n", err)
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

func (t *TeamCache) GetCacheTeamBySlackID(slackID string) (out model.TeamModel, err error) {
	if v, found := t.GoCache.Get(cacheTeamPrefix + slackID); found {
		out = v.(model.TeamModel)
		return
	}
	return
}

func (t *TeamCache) SetCacheTeam(in model.TeamModel) {
	t.GoCache.Set(cacheTeamPrefix+in.SlackID, in, config.Get().Cache.DefaultExpirationTime)
	return
}
