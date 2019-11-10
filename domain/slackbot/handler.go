package slackbot

import (
	"cakcuk/domain/command"
	stringLib "cakcuk/utils/string"
	"fmt"
	"log"
	"strings"

	"github.com/nlopes/slack"
)

func (s *SlackBot) HandleEvents() {
	for msg := range s.SlackRTM.IncomingEvents {
		switch ev := msg.Data.(type) {
		case *slack.MessageEvent:
			if s.isMentioned(&ev.Text) {
				clearUnusedWords(&ev.Text)
				if s.Config.DebugMode {
					log.Printf("[INFO] ev.Text:  %s\n", ev.Text)
				}
				response, err := s.handleSlackMsg(ev.Text, ev.Channel)
				if err != nil {
					s.notifySlackError(ev.Channel, err)
				} else {
					s.notifySlackSuccess(ev.Channel, response)
				}
			}
		default:
			if s.Config.DebugMode {
				log.Printf("[INFO] Unhandle Event %v", ev)
			}
		}
	}
}

// TODO
func (s *SlackBot) handleSlackMsg(msg, channel string) (response string, err error) {
	var cmd command.Command
	if cmd, err = s.ValidateInput(&msg); err != nil {
		return
	}

	if err = cmd.Extract(&msg); err != nil {
		return
	}
	s.notifySlackCommandExecuted(channel, cmd)

	switch cmd.Name {
	case "help":

	case "cuk":
		response, err = s.Service.cukHit(cmd)
	}
	return
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
	var replacer = strings.NewReplacer(
		"Reminder: ", "",
		"“", "\"",
		"”", "\"",
		"‘", "\"",
		"’", "\"",
	)
	*msg = replacer.Replace(*msg)

	clearURLS(msg)
}

func clearURLS(msg *string) {
	var replacer = strings.NewReplacer(
		"<", "",
		">", "",
	)
	urlProtocol := "http"
	for strings.Contains(*msg, "<"+urlProtocol) {
		value := stringLib.StringBetween(*msg, "<", ">")
		if strings.Contains(value, "https") {
			urlProtocol = "https"
		}
		if strings.Contains(value, "|") {
			flatURL := urlProtocol + "://" + strings.Split(value, "|")[1]
			*msg = strings.Replace(*msg, fmt.Sprintf("<%s>", value), flatURL, -1)
		} else {
			*msg = replacer.Replace(*msg)
		}
	}
}
