package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	jsonLib "cakcuk/utils/json"
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

type SlackbotHandler struct {
	Config           *config.Config            `inject:""`
	SlackbotService  *service.SlackbotService  `inject:""`
	SlackTeamService *service.SlackTeamService `inject:""`
	SlackRTM         *slack.RTM                `inject:""`
	SlackbotModel    *model.SlackbotModel      `inject:""`
}

// TODO: hello event
func (s *SlackbotHandler) HandleEvents() {
	for msg := range s.SlackRTM.IncomingEvents {
		switch ev := msg.Data.(type) {
		case *slack.HelloEvent:
		case *slack.MessageEvent:
			if s.Config.DebugMode {
				log.Printf("[INFO] incoming event:  %s\n", jsonLib.ToStringJsonNoError(ev))
			}
			if s.SlackbotModel.IsMentioned(&ev.Text) {
				clearUnusedWords(&ev.Text)
				resp, err := s.handleSlackMsg(ev.Text, ev.Channel)
				if err != nil {
					s.SlackbotService.NotifySlackError(ev.Channel, err, resp.isOutputFile)
				} else {
					s.SlackbotService.NotifySlackSuccess(ev.Channel, resp.response, resp.isOutputFile)
				}
			}
		default:
			if s.Config.DebugMode {
				log.Printf("[INFO] Unhandle Event %v", jsonLib.ToStringJsonNoError(ev))
			}
		}
	}
}

// TODO
func (s *SlackbotHandler) handleSlackMsg(msg, channel string) (out slackResponse, err error) {
	var cmd model.CommandModel
	var optOutputFile model.OptionModel
	var isOutputFile bool

	if cmd, err = s.SlackbotService.ValidateInput(&msg); err != nil {
		return
	}

	if err = cmd.Extract(&msg); err != nil {
		return
	}
	s.SlackbotService.NotifySlackCommandExecuted(channel, cmd)

	if optOutputFile, err = cmd.OptionsModel.GetOptionByName("--outputFile"); err != nil {
		return
	}
	isOutputFile, _ = strconv.ParseBool(optOutputFile.Value)
	out.isOutputFile = isOutputFile
	switch cmd.Name {
	case "help":
		out.response = s.SlackbotService.HelpHit(cmd, *s.SlackbotModel)
	case "cuk":
		out.response, err = s.SlackbotService.CukHit(cmd)
	case "cak":
		out.response, err = s.SlackbotService.CakHit(cmd)
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
