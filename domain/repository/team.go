package repository

import (
	"cakcuk/domain/model"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
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

// TODO
type TeamInterface interface {
	GetTeamBySlackID(slackID string) (out model.TeamModel, err error)
	InsertTeamInfo(team model.TeamModel) (err error)
}

// TODO
type TeamSQL struct {
	DB *sqlx.DB `inject:""`
}

// TODO: resolve team from db
func (t *TeamSQL) GetTeamBySlackID(slackID string) (out model.TeamModel, err error) {
	q := queryResolveTeam + `
		WHERE t.slackID = ?
	`
	if err = t.DB.Unsafe().Get(&out, q, slackID); err != nil {
		log.Println("[INFO] GetTeamBySlackID, query: %s, args: %v", q, slackID)
		log.Println("[ERROR] error: %v", err)
	}
	return
}

func (t TeamSQL) InsertTeamInfo(team model.TeamModel) (err error) {
	args := []interface{}{
		team.ID,
		team.SlackID,
		team.Name,
		team.Domain,
		team.EmailDomain,
		team.CreatedBy,
	}
	if _, err = t.DB.Exec(queryInsertTeam, args...); err != nil {
		log.Println("[INFO] InsertTeamInfo, query: %s, args: %v", queryInsertTeam, args)
		log.Println("[ERROR] error: %v", err)
	}
	return
}
