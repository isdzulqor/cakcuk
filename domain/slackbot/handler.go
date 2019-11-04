package slackbot

import (
	"fmt"
	"log"
	"strings"

	"github.com/nlopes/slack"
)

func (s *SlackBot) HandleEvents() {
	for msg := range s.SlackRTM.IncomingEvents {
		switch ev := msg.Data.(type) {
		case *slack.MessageEvent:
			clearUnusedWords(&ev.Text)
			if s.isMentioned(&ev.Text) {
				if s.Config.DebugMode {
					log.Printf("[INFO] ev.Text:  %s\n", ev.Text)
				}
				s.handleSlackMsg(ev.Text)
			}
		default:
			if s.Config.DebugMode {
				log.Printf("[INFO] Unhandle Event %v", ev)
			}
		}
	}
}

// TODO
func (s *SlackBot) handleSlackMsg(msg string) {
	fmt.Println("handle slack msg")
}

// isMentioned to check is bot mentioned and clear bot name as well
func (s SlackBot) isMentioned(msg *string) bool {
	if strings.Contains(*msg, s.User.ID) {
		*msg = strings.Replace(*msg, "<@"+s.User.ID+">", "", -1)
		*msg = strings.TrimSpace(*msg)
		return true
	}
	return false
}

// clearUnusedWords clear all unnecessary words
func clearUnusedWords(msg *string) {
	unusedWords := [1]string{"Reminder: "}
	for _, element := range unusedWords {
		*msg = strings.Replace(*msg, element, "", -1)
	}
}
