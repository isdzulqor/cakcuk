package model

import (
	"time"

	uuid "github.com/satori/go.uuid"
)

type TeamModel struct {
	ID          uuid.UUID `json:"id" db:"id"`
	SlackID     string    `json:"string" db:"string"`
	Name        string    `json:"name" db:"name"`
	Domain      string    `json:"domain" db:"domain"`
	EmailDomain string    `json:"emailDomain" db:"emailDomain"`
	Created     time.Time `json:"created" db:"created"`
	CreatedBy   string    `json:"createdBy" db:"createdBy"`
}

func (t *TeamModel) Create(createdBy, slackID string) {
	t.ID = uuid.NewV4()
	t.CreatedBy = createdBy
	t.SlackID = slackID
}
