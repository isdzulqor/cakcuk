package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	"context"

	"github.com/patrickmn/go-cache"

	"encoding/json"
	"fmt"
	"net/http"
)

const (
	SlackEventCallback        = "event_callback"
	SlackEventAppMention      = "app_mention"
	SlackEventMessage         = "message"
	SlackEventURLVerification = "url_verification"
)

type SlackbotHandler struct {
	Config          *config.Config           `inject:""`
	SlackbotService *service.SlackbotService `inject:""`
	CommandService  *service.CommandService  `inject:""`
	BotModel        *model.BotModel          `inject:""`
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

	if requestEvent.Type != nil && *requestEvent.Type == SlackEventURLVerification && requestEvent.Challenge != nil {
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
	go s.GoCache.Set(*requestEvent.EventID, "", s.Config.Cache.RequestExpirationTime)
	go s.guardHandleEvent(ctx, *requestEvent.Event)
}

func (s SlackbotHandler) guardHandleEvent(ctx context.Context, slackEvent external.SlackEvent) {
	defer func() {
		if r := recover(); r != nil {
			go s.SlackbotService.NotifySlackError(ctx, *slackEvent.Channel, fmt.Errorf("Failed to handle event! %v", r), false)
			logging.Logger(ctx).Error(r)
			return
		}
	}()
	s.handleEvent(ctx, slackEvent)
}

func (s SlackbotHandler) HandleRTM(ctx context.Context) {
	var slackEvent external.SlackEvent
	for event := range s.SlackClient.RTM.IncomingEvents {
		ctx := logging.GetContext(context.Background())
		if err := slackEvent.FromSlackEvent(event.Data); err == nil {
			go s.guardHandleEvent(ctx, slackEvent)
		}
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
	if slackEvent.Type == nil {
		return
	}
	switch *slackEvent.Type {
	case SlackEventAppMention, SlackEventMessage, SlackEventCallback:
		if s.BotModel.IsMentioned(&incomingMessage) {
			sanitizeWords(&incomingMessage)
			cmdResponse, err := s.CommandService.Prepare(ctx, incomingMessage, *slackEvent.User, *slackEvent.Team, s.BotModel.Name)
			if err != nil {
				go s.SlackbotService.NotifySlackError(ctx, slackChannel, err, cmdResponse.IsFileOutput)
				return
			}
			if cmdResponse.IsHelp {
				go s.SlackbotService.NotifySlackSuccess(ctx, slackChannel, cmdResponse.Message, cmdResponse.IsFileOutput)
				return
			}
			if !cmdResponse.IsNoResponse {
				s.SlackbotService.NotifySlackCommandExecuted(ctx, slackChannel, cmdResponse.Command, cmdResponse.IsPrintOption)
			}
			cmdResponse, err = s.CommandService.Exec(ctx, cmdResponse, s.BotModel.Name, *slackEvent.User)
			if err != nil {
				go s.SlackbotService.NotifySlackError(ctx, slackChannel, err, cmdResponse.IsFileOutput)
				return
			}
			if !cmdResponse.IsNoResponse {
				go s.SlackbotService.NotifySlackSuccess(ctx, slackChannel, cmdResponse.Message, cmdResponse.IsFileOutput)
			}
		}
	}
}
