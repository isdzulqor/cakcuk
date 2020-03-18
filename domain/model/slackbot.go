package model

import (
	timeLib "cakcuk/utils/time"
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

type SlackEventRequestModel struct {
	Token       *string           `json:"token,omitempty"`
	Challenge   *string           `json:"challenge,omitempty"`
	TeamID      *string           `json:"team_id,omitempty"`
	APIAppID    *string           `json:"api_app_id,omitempty"`
	Type        *string           `json:"type,omitempty"`
	EventID     *string           `json:"event_id,omitempty"`
	EventTime   *timeLib.UnixTime `json:"event_time,omitempty"`
	AuthedUsers *[]string         `json:"authed_users,omitempty"`
	Event       *struct {
		ClientMessageID *string `json:"client_msg_id,omitempty"`
		Type            *string `json:"type,omitempty"`
		Text            *string `json:"text,omitempty"`
		User            *string `json:"user,omitempty"`
		Ts              *string `json:"ts,omitempty"`
		Team            *string `json:"team,omitempty"`
		Channel         *string `json:"channel,omitempty"`
		EventTs         *string `json:"event_ts,omitempty"`
		Blocks          *[]struct {
			Type     *string `json:"type,omitempty"`
			BlockID  *string
			Elements *[]struct {
				Type     *string `json:"type,omitempty"`
				Elements *[]struct {
					Type *string `json:"type,omitempty"`
					Text *string `json:"text,omitempty"`
				} `json:"elements,omitempty"`
			} `json:"elements,omitempty"`
		} `json:"blocks,omitempty"`
	} `json:"event,omitempty"`
}

// IsMentioned to check is bot mentioned and clear botID as well
func (s SlackbotModel) IsMentioned(msg *string) bool {
	if strings.Contains(*msg, s.SlackID) {
		*msg = strings.Replace(*msg, "<@"+s.SlackID+">", "", -1)
		*msg = strings.Replace(*msg, "\u003c@"+s.SlackID+"\u003e", "", -1)
		*msg = strings.TrimSpace(*msg)
		return true
	}
	return false
}
