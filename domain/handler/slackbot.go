package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	jsonLib "cakcuk/utils/json"

	"github.com/patrickmn/go-cache"

	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type SlackbotHandler struct {
	Config          *config.Config           `inject:""`
	SlackbotService *service.SlackbotService `inject:""`
	SlackbotModel   *model.SlackbotModel     `inject:""`
	GoCache         *cache.Cache             `inject:""`
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
	s.GoCache.Set(*requestEvent.EventID, "", s.Config.Cache.RequestExpirationTime)

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
			s.SlackbotService.HandleMessage(incomingMessage, slackChannel, *requestEvent.Event.User, *requestEvent.TeamID)
		}
	}
}
