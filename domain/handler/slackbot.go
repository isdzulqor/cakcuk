package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	jsonLib "cakcuk/utils/json"
	stringLib "cakcuk/utils/string"

	cache "github.com/patrickmn/go-cache"

	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
)

type slackResponse struct {
	response     string
	isOutputFile bool
}

type SlackbotHandler struct {
	Config           *config.Config           `inject:""`
	SlackbotService  *service.SlackbotService `inject:""`
	SlackTeamService *service.TeamService     `inject:""`
	SlackbotModel    *model.SlackbotModel     `inject:""`
	GoCache          *cache.Cache             `inject:""`
}

func (s SlackbotHandler) GetEvents(w http.ResponseWriter, r *http.Request) {
	var requestEvent model.SlackEventRequestModel

	if err := json.NewDecoder(r.Body).Decode(&requestEvent); err != nil {
		log.Println("[ERROR] slack GetEvents, err:", err)
		return
	}
	if requestEvent.Type != nil && *requestEvent.Type == model.SlackEventURLVerification && requestEvent.Challenge != nil {
		fmt.Fprintf(w, *requestEvent.Challenge)
		return
	}
	if requestEvent.EventID == nil || requestEvent.Type == nil || requestEvent.Event.Type == nil {
		log.Println("[ERROR] slack GetEvents is nil, request event:", jsonLib.ToPrettyNoError(requestEvent))
		return
	}
	if s.Config.DebugMode {
		log.Println("[INFO] slack GetEvents, request event:", jsonLib.ToPrettyNoError(requestEvent))
	}

	if _, found := s.GoCache.Get(*requestEvent.EventID); found {
		return
	}
	s.GoCache.Set(*requestEvent.EventID, "", cache.DefaultExpiration)

	var slackChannel, incomingMessage string
	if requestEvent.Event.Text != nil {
		incomingMessage = *requestEvent.Event.Text
	}
	if requestEvent.Event.Channel != nil {
		slackChannel = *requestEvent.Event.Channel
	}
	switch *requestEvent.Event.Type {
	case model.SlackEventAppMention, model.SlackEventMessage:
		if s.SlackbotModel.IsMentioned(&incomingMessage) {
			clearUnusedWords(&incomingMessage)
			resp, err := s.handleSlackMsg(incomingMessage, slackChannel, *requestEvent.Event.User, *requestEvent.TeamID)
			if err != nil {
				s.SlackbotService.NotifySlackError(slackChannel, err, resp.isOutputFile)
			} else {
				s.SlackbotService.NotifySlackSuccess(slackChannel, resp.response, resp.isOutputFile)
			}
		}
	}
}

// TODO
func (s *SlackbotHandler) handleSlackMsg(msg, channel, slackUserID, slackTeamID string) (out slackResponse, err error) {
	var cmd model.CommandModel
	var optOutputFile model.OptionModel
	var isOutputFile bool

	if cmd, err = s.SlackbotService.ValidateInput(&msg, slackTeamID); err != nil {
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
		out.response = s.SlackbotService.HelpHit(cmd, *s.SlackbotModel, slackTeamID)
	case "cuk":
		out.response, err = s.SlackbotService.CukHit(cmd)
	case "cak":
		out.response, err = s.SlackbotService.CakHit(cmd, *s.SlackbotModel, slackUserID, slackTeamID)
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
