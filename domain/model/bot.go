package model

import (
	"strings"
	"time"

	uuid "github.com/satori/go.uuid"
)

const (
	SlackStartedMessage = "Type `help -ol @Cakcuk` or `help @Cakcuk` to get started! Just try <https://cakcuk.io/play|Cakcuk Playground> to play around!"
)

// BotModel object model
type BotModel struct {
	ID          uuid.UUID `json:"id" db:"id"`
	ReferenceID string    `json:"referenceID" db:"referenceID"`
	TeamID      uuid.UUID `json:"teamID" db:"teamID"`
	Name        string    `json:"name" db:"name"`
	Source      string    `json:"source" db:"source"`
	Created     time.Time `json:"created" db:"created"`
	CreatedBy   string    `json:"createdBy" db:"createdBy"`
}

func (s *BotModel) Create(createdBy, referenceID, name, source string, teamID uuid.UUID) {
	s.ID = uuid.NewV4()
	s.ReferenceID = referenceID
	s.TeamID = teamID
	s.Name = name
	s.Source = source
	s.CreatedBy = createdBy
}

// IsMentioned to check is bot mentioned and clear botID as well
func (s BotModel) IsMentioned(msg *string) bool {
	if strings.Contains(*msg, s.ReferenceID) {
		*msg = strings.Replace(*msg, "<@"+s.ReferenceID+">", "", -1)
		*msg = strings.Replace(*msg, "\u003c@"+s.ReferenceID+"\u003e", "", -1)
		*msg = strings.Replace(*msg, "\u003c@"+s.ReferenceID+"|"+s.Name+"\u003e", "", -1)
		*msg = strings.TrimSpace(*msg)
		return true
	}
	return false
}
