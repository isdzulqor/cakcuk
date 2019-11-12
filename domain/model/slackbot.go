package model

import (
	"strings"

	"github.com/nlopes/slack"
)

// SlackbotModel object model
type SlackbotModel struct {
	User slack.User
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
