package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	stringLib "cakcuk/utils/string"
	"context"

	"github.com/patrickmn/go-cache"

	"encoding/json"
	"fmt"
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
	ctx := r.Context()

	if err := json.NewDecoder(r.Body).Decode(&requestEvent); err != nil {
		logging.Logger(ctx).Error("slack GetEvents, err:", err)
		return
	}

	if requestEvent.Type != nil && *requestEvent.Type == model.SlackEventURLVerification && requestEvent.Challenge != nil {
		fmt.Fprintf(w, *requestEvent.Challenge)
		return
	}
	if requestEvent.EventID == nil || requestEvent.Type == nil || requestEvent.Event.Type == nil {
		logging.Logger(ctx).Info("slack GetEvents is nil, request event:", jsonLib.ToPrettyNoError(requestEvent))
		return
	}

	logging.Logger(ctx).Debug("slack GetEvents, request event:", jsonLib.ToPrettyNoError(requestEvent))

	if _, found := s.GoCache.Get(*requestEvent.EventID); found {
		// event already proceessed
		return
	}
	s.GoCache.Set(*requestEvent.EventID, "", s.Config.Cache.RequestExpirationTime)
	s.handleEvent(ctx, *requestEvent.Event)
}

func (s SlackbotHandler) HandleRTM(ctx context.Context) {
	rtm, err := s.SlackClient.InitRTM(ctx, s.Config.Slack.RTM.DefaultRetry, s.Config.Slack.RTM.ReconnectTimeout)
	if err != nil {
		logging.Logger(ctx).Fatalf("Failed to init Slack RTM handling: %v", err)
	}
	for event := range rtm.IncomingEvents {
		ctx := logging.GetContext(context.Background())
		s.handleEvent(ctx, event)
	}
	return
}

func (s SlackbotHandler) handleEvent(ctx context.Context, slackEvent external.SlackEvent) {
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
			result, err := s.SlackbotService.HandleMessage(ctx, incomingMessage, slackChannel, *slackEvent.User, *slackEvent.Team)
			if err != nil {
				s.SlackbotService.NotifySlackError(ctx, slackChannel, err, result.IsFileOutput)
				return
			}
			if result.FilterLike != "" {
				result.Message = stringLib.Filter(result.Message, result.FilterLike, false)
			}
			s.SlackbotService.NotifySlackSuccess(ctx, slackChannel, result.Message, result.IsFileOutput)
		}
	}
}
