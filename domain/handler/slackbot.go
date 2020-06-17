package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	"cakcuk/utils/response"
	"context"

	"github.com/patrickmn/go-cache"
	"github.com/slack-go/slack/slackevents"

	"encoding/json"
	"fmt"
	"net/http"
)

const (
	SlackEventCallback        = "event_callback"
	SlackEventAppMention      = "app_mention"
	SlackAppHomeOpened        = "app_home_opened"
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
	SlackOauth2     *external.SlackOauth2    `inject:""`
}

// AddToSlack handle add to slack button
func (s SlackbotHandler) AddToSlack(w http.ResponseWriter, r *http.Request) {
	url := s.SlackOauth2.Config.AuthCodeURL(s.Config.Slack.Oauth2.State)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// Callback handling oauth2 callback
func (s SlackbotHandler) Callback(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	go s.SlackbotService.ProcessOauth2(ctx, r.FormValue("state"), r.FormValue("code"))
	http.Redirect(w, r, s.Config.Site.LandingPage, http.StatusTemporaryRedirect)
	return
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

	if err := s.validateSlackEvent(requestEvent); err != nil {
		response.Failed(ctx, w, http.StatusBadRequest, err)
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

func (s SlackbotHandler) validateSlackEvent(requestEvent external.SlackEventRequestModel) error {
	event, err := json.Marshal(requestEvent)
	if err != nil {
		return err
	}
	_, err = slackevents.ParseEvent(json.RawMessage(event),
		slackevents.OptionVerifyToken(&slackevents.TokenComparator{VerificationToken: s.Config.Slack.VerificationToken}))
	return err
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
	case SlackAppHomeOpened:
		if _, found := s.GoCache.Get(slackChannel); found {
			// event already proceessed
			return
		}
		go s.GoCache.Set(slackChannel, "", s.Config.Cache.RequestExpirationTime)
		s.SlackbotService.NotifySlackSuccess(ctx, slackChannel,
			"Type `help @cakcuk` to get started! See <https://cakcuk.io/#/play|Cakcuk Playground> to play around!", false, false)
	case SlackEventAppMention, SlackEventMessage, SlackEventCallback:
		if s.BotModel.IsMentioned(&incomingMessage) {
			sanitizeWords(&incomingMessage)
			cmdResponse, err := s.CommandService.Prepare(ctx, incomingMessage, *slackEvent.User, *slackEvent.Team,
				s.BotModel.Name, model.SourceSlack)
			if err != nil {
				go s.SlackbotService.NotifySlackError(ctx, slackChannel, err, cmdResponse.IsFileOutput)
				return
			}
			if cmdResponse.IsHelp {
				go s.SlackbotService.NotifySlackSuccess(ctx, slackChannel, cmdResponse.Message, cmdResponse.IsFileOutput, true)
				return
			}
			if !cmdResponse.IsNoResponse {
				// notify command executed
				s.SlackbotService.NotifySlackSuccess(ctx, slackChannel, cmdResponse.Command.GetExecutedCommand(cmdResponse.IsPrintOption), false, false)
			}
			cmdResponse, err = s.CommandService.Exec(ctx, cmdResponse, s.BotModel.Name, *slackEvent.User)
			if err != nil {
				go s.SlackbotService.NotifySlackError(ctx, slackChannel, err, cmdResponse.IsFileOutput)
				return
			}
			if !cmdResponse.IsNoResponse {
				go s.SlackbotService.NotifySlackSuccess(ctx, slackChannel, cmdResponse.Message, cmdResponse.IsFileOutput, true)
			}
		}
	}
}
