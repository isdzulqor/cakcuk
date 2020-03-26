package model

import (
	"strings"
	"time"

	uuid "github.com/satori/go.uuid"
)

const (
	SlackEventCallback        = "event_callback"
	SlackEventAppMention      = "app_mention"
	SlackEventMessage         = "message"
	SlackEventURLVerification = "url_verification"
)

// SlackbotModel object model
type SlackbotModel struct {
	ID        uuid.UUID `json:"id" db:"id"`
	SlackID   string    `json:"slackID" db:"slackID"`
	Name      string    `json:"name" db:"name"`
	Created   time.Time `json:"created" db:"created"`
	CreatedBy string    `json:"createdBy" db:"createdBy"`
}

func (s *SlackbotModel) Create(createdBy, slackID string) {
	s.ID = uuid.NewV4()
	s.SlackID = slackID
	s.CreatedBy = createdBy
}

// IsMentioned to check is bot mentioned and clear botID as well
func (s SlackbotModel) IsMentioned(msg *string) bool {
	if strings.Contains(*msg, s.SlackID) {
		*msg = strings.Replace(*msg, "<@"+s.SlackID+">", "", -1)
		*msg = strings.Replace(*msg, "\u003c@"+s.SlackID+"\u003e", "", -1)
		*msg = strings.Replace(*msg, "\u003c@"+s.SlackID+"|"+s.Name+"\u003e", "", -1)
		*msg = strings.TrimSpace(*msg)
		return true
	}
	return false
}

type SlackResponseModel struct {
	Message       string
	Command       CommandModel
	IsFileOutput  bool
	IsPrintOption bool
	IsNoParse     bool
	FilterLike    string
}
