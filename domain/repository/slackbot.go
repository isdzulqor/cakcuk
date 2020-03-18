package repository

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"log"

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
	GetSlackbotBySlackID(slackID string) (out model.SlackbotModel, err error)
	InsertSlackbotInfo(slackbot model.SlackbotModel) (err error)
}

type SlackbotSQL struct {
	DB *sqlx.DB `inject:""`
}

func (s *SlackbotSQL) GetSlackbotBySlackID(slackID string) (out model.SlackbotModel, err error) {
	q := queryResolveSlackbot + `
		WHERE s.slackID = ?
	`
	if err = s.DB.Unsafe().Get(&out, q, slackID); err != nil {
		log.Printf("[INFO] GetSlackbotBySlackID, query: %s\n", errorLib.FormatQueryError(q, slackID))
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (s SlackbotSQL) InsertSlackbotInfo(slackbot model.SlackbotModel) (err error) {
	args := []interface{}{
		slackbot.ID,
		slackbot.SlackID,
		slackbot.Name,
		slackbot.CreatedBy,
	}
	if _, err = s.DB.Exec(queryInsertSlackbot, args...); err != nil {
		log.Printf("[INFO] InsertSlackbotInfo, query: %s\n", errorLib.FormatQueryError(queryInsertSlackbot, args...))
		log.Printf("[ERROR] error: %v\n", err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}
