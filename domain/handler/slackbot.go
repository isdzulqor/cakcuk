package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	stringLib "cakcuk/utils/string"

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
	SlackClient     *external.SlackClient    `inject:""`
	GoCache         *cache.Cache             `inject:""`
}

func (s SlackbotHandler) GetEvents(w http.ResponseWriter, r *http.Request) {
	var requestEvent external.SlackEventRequestModel

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
		// event already proceessed
		return
	}
	s.GoCache.Set(*requestEvent.EventID, "", s.Config.Cache.RequestExpirationTime)
	s.handleEvent(*requestEvent.Event)
}

func (s SlackbotHandler) HandleRTM() {
	rtm, err := s.SlackClient.InitRTM(s.Config.Slack.RTM.DefaultRetry)
	if err != nil {
		log.Fatalf("[ERROR] Failed to init Slack RTM handling: %v", err)
	}
	for event := range rtm.IncomingEvents {
		s.handleEvent(event)
	}
	return
}

func (s SlackbotHandler) handleEvent(slackEvent external.SlackEvent) {
	var slackChannel, incomingMessage string
	if slackEvent.Text != nil {
		incomingMessage = *slackEvent.Text
	}
	if slackEvent.Channel != nil {
		slackChannel = *slackEvent.Channel
	}
	switch *slackEvent.Type {
	case model.SlackEventAppMention, model.SlackEventMessage, model.SlackEventCallback:
		if s.SlackbotModel.IsMentioned(&incomingMessage) {
			clearUnusedWords(&incomingMessage)
			result, err := s.SlackbotService.HandleMessage(incomingMessage, slackChannel, *slackEvent.User, *slackEvent.Team)
			if err != nil {
				s.SlackbotService.NotifySlackError(slackChannel, err, result.IsFileOutput)
				return
			}
			if result.FilterLike != "" {
				result.Message = stringLib.Filter(result.Message, result.FilterLike)
			}
			s.SlackbotService.NotifySlackSuccess(slackChannel, result.Message, result.IsFileOutput)
		}
	}
}
