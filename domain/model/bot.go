package model

import (
	"strings"
	"time"

	uuid "github.com/satori/go.uuid"
)

// BotModel object model
type BotModel struct {
	ID          uuid.UUID `json:"id" db:"id"`
	ReferenceID string    `json:"referenceID" db:"referenceID"`
	Name        string    `json:"name" db:"name"`
	Created     time.Time `json:"created" db:"created"`
	CreatedBy   string    `json:"createdBy" db:"createdBy"`
}

func (s *BotModel) Create(createdBy, referenceID string) {
	s.ID = uuid.NewV4()
	s.ReferenceID = referenceID
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
