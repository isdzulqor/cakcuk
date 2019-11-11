package slackbot

import (
	"cakcuk/config"
	"cakcuk/domain/command"
	stringLib "cakcuk/utils/string"
	"fmt"
	"log"
	"strconv"
	"strings"

	"github.com/nlopes/slack"
)

type slackResponse struct {
	response     string
	isOutputFile bool
}

type Handler struct {
	Config   *config.Config `inject:""`
	Service  *Service       `inject:""`
	SlackRTM *slack.RTM     `inject:""`
	SlackBot *SlackBot      `inject:""`
}

func (h *Handler) HandleEvents() {
	if h.SlackBot == nil {
		fmt.Println("COK h.SlackBot")
	}
	if h.SlackRTM == nil {
		fmt.Println("COK h.SlackRTM")
	}
	for msg := range h.SlackRTM.IncomingEvents {
		switch ev := msg.Data.(type) {
		case *slack.MessageEvent:
			if h.SlackBot.isMentioned(&ev.Text) {
				clearUnusedWords(&ev.Text)
				if h.Config.DebugMode {
					log.Printf("[INFO] ev.Text:  %s\n", ev.Text)
				}
				resp, err := h.handleSlackMsg(ev.Text, ev.Channel)
				if err != nil {
					h.Service.notifySlackError(ev.Channel, err, resp.isOutputFile)
				} else {
					h.Service.notifySlackSuccess(ev.Channel, resp.response, resp.isOutputFile)
				}
			}
		default:
			if h.Config.DebugMode {
				log.Printf("[INFO] Unhandle Event %v", ev)
			}
		}
	}
}

// TODO
func (h *Handler) handleSlackMsg(msg, channel string) (out slackResponse, err error) {
	var cmd command.Command
	var optOutputFile command.Option
	var isOutputFile bool

	if cmd, err = h.Service.ValidateInput(&msg); err != nil {
		return
	}

	if err = cmd.Extract(&msg); err != nil {
		return
	}
	h.Service.notifySlackCommandExecuted(channel, cmd)

	if optOutputFile, err = cmd.Options.GetOptionByName("--outputFile"); err != nil {
		return
	}
	isOutputFile, _ = strconv.ParseBool(optOutputFile.Value)
	out.isOutputFile = isOutputFile

	switch cmd.Name {
	case "help":
		out.response = h.Service.helpHit(cmd, h.SlackBot.User.Name)
	case "cuk":
		out.response, err = h.Service.cukHit(cmd)
	}
	return
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
