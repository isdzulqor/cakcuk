package model

import (
	"strings"
	"time"

	"github.com/nlopes/slack"
	uuid "github.com/satori/go.uuid"
)

// SlackbotModel object model
type SlackbotModel struct {
	ID        uuid.UUID `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	Created   time.Time `json:"created" db:"created"`
	CreatedBy string    `json:"createdBy" db:"createdBy"`
	User      slack.User
}

// IsMentioned to check is bot mentioned and clear botID as well
func (s SlackbotModel) IsMentioned(msg *string) bool {
	if strings.Contains(*msg, s.User.ID) {
		*msg = strings.Replace(*msg, "<@"+s.User.ID+">", "", -1)
		*msg = strings.TrimSpace(*msg)
		return true
	}
	return false
}
