package repository

import (
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
	`
)

// TODO
type SlackbotInterface interface {
	// Insert Slackbot One Info
	// Update Slackbot One Info
	// Get Slackbot One Info
	InsertSlackbotInfo()
}

// TODO
type SlackbotSQL struct {
	DB *sqlx.DB `inject:""`
}

func (d SlackbotSQL) InsertSlackbotInfo() {

}
