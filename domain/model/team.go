package model

import (
	"time"

	"github.com/slack-go/slack"

	uuid "github.com/satori/go.uuid"
)

type TeamModel struct {
	ID          uuid.UUID `json:"id" db:"id"`
	ReferenceID string    `json:"referenceID" db:"referenceID"`
	Name        string    `json:"name" db:"name"`
	Domain      string    `json:"domain" db:"domain"`
	EmailDomain string    `json:"emailDomain" db:"emailDomain"`
	Created     time.Time `json:"created" db:"created"`
	CreatedBy   string    `json:"createdBy" db:"createdBy"`
}

func (t *TeamModel) Create(createdBy, referenceID string) {
	t.ID = uuid.NewV4()
	t.CreatedBy = createdBy
	t.ReferenceID = referenceID
}

func (t *TeamModel) FromSlackTeam(slackTeam slack.TeamInfo) {
	t.Name = slackTeam.Name
	t.Domain = slackTeam.Domain
	t.EmailDomain = slackTeam.EmailDomain
	t.ReferenceID = slackTeam.ID
}
