package slackbot

import (
	"strings"

	"github.com/nlopes/slack"
)

// SlackBot object model
type SlackBot struct {
	User slack.User
}

// isMentioned to check is bot mentioned and clear botID as well
func (s SlackBot) isMentioned(msg *string) bool {
	if strings.Contains(*msg, s.User.ID) {
		*msg = strings.Replace(*msg, "<@"+s.User.ID+">", "", -1)
		*msg = strings.TrimSpace(*msg)
		return true
	}
	return false
}
