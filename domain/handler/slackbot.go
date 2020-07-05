package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	"cakcuk/utils/response"
	stringLib "cakcuk/utils/string"
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

	SlackStartedMessage = "Type `help -ol @Cakcuk` or `help @Cakcuk` to get started! Just try <https://cakcuk.io/play|Cakcuk Playground> to play around!"
)

type SlackbotHandler struct {
	Config          *config.Config           `inject:""`
	SlackbotService *service.SlackbotService `inject:""`
	CommandService  *service.CommandService  `inject:""`
	TeamService     *service.TeamService     `inject:""`
	SlackClient     *external.SlackClient    `inject:""`
	GoCache         *cache.Cache             `inject:""`
	SlackOauth2     *external.SlackOauth2    `inject:""`
}

// AddToSlack handle add to slack button
func (s SlackbotHandler) AddToSlack(w http.ResponseWriter, r *http.Request) {
	url := s.SlackOauth2.Config.AuthCodeURL(s.Config.Slack.Oauth2.State)

	cakcukSecret := r.Header.Get("x-cakcuk-secret-key")
	if cakcukSecret != "" && cakcukSecret == s.Config.SecretKey {
		w.Header().Set("x-slack-url", url)
		response.Success(r.Context(), w, http.StatusOK, "Success")
		return
	}
	http.Redirect(w, r, url, http.StatusFound)
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
	go s.prepareHandleEvent(ctx, *requestEvent.Event, requestEvent.TeamID)
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

func (s SlackbotHandler) prepareHandleEvent(ctx context.Context, slackEvent external.SlackEvent, teamID *string) {
	// only listen certains events
	eventType := stringLib.ReadSafe(slackEvent.Type)
	switch eventType {
	case SlackAppHomeOpened, SlackEventAppMention, SlackEventMessage, SlackEventCallback:
	default:
		return
	}

	teamInfo, err := s.TeamService.GetTeamInfo(ctx, stringLib.ReadValued(teamID, slackEvent.Team))
	if err != nil {
		logging.Logger(ctx).Warn("handle event, err:", err)
		return
	}

	s.handleEvent(ctx, stringLib.ReadSafe(slackEvent.User), eventType, stringLib.ReadSafe(slackEvent.Channel), stringLib.ReadSafe(slackEvent.Text), teamInfo)
}

func (s SlackbotHandler) HandleRTM(ctx context.Context) {
	var slackEvent external.SlackEvent
	for event := range s.SlackClient.RTM.IncomingEvents {
		ctx := logging.GetContext(context.Background())
		if err := slackEvent.FromSlackEvent(event.Data); err == nil {
			go s.prepareHandleEvent(ctx, slackEvent, nil)
		}
	}
	return
}

func (s SlackbotHandler) handleEvent(ctx context.Context, user, eventType, slackChannel, incomingMessage string, teamInfo model.TeamModel) {
	defer func() {
		if r := recover(); r != nil {
			go s.SlackbotService.NotifySlackError(ctx, &teamInfo.ReferenceToken, slackChannel, fmt.Errorf("Failed to handle event! %v", r), false)
			logging.Logger(ctx).Error(r)
			return
		}
	}()

	botInfo, err := s.SlackbotService.GetBot(ctx, teamInfo.ID)
	if err != nil {
		logging.Logger(ctx).Error("failed to get bot info, err: %v", err)
	}

	switch eventType {
	case SlackAppHomeOpened:
		if _, found := s.GoCache.Get(slackChannel); found {
			// event already proceessed
			return
		}
		go s.GoCache.Set(slackChannel, "", s.Config.Cache.DefaultExpirationTime)
		s.SlackbotService.NotifySlackSuccess(ctx, &teamInfo.ReferenceToken, slackChannel, SlackStartedMessage, false, false)
	case SlackEventAppMention, SlackEventMessage, SlackEventCallback:
		if user == botInfo.ReferenceID {
			// it will ignore if it's the input from the bot itself
			return
		}
		if botInfo.IsMentioned(&incomingMessage) {
			sanitizeWords(&incomingMessage)
			cmdResponse, err := s.CommandService.Prepare(ctx, incomingMessage, user, teamInfo.ReferenceID,
				botInfo.Name, model.SourceSlack, &teamInfo)
			if err != nil {
				go s.SlackbotService.NotifySlackError(ctx, &teamInfo.ReferenceToken, slackChannel, err, cmdResponse.IsFileOutput)
				return
			}
			if cmdResponse.IsHelp {
				go s.SlackbotService.NotifySlackSuccess(ctx, &teamInfo.ReferenceToken, slackChannel, cmdResponse.Message, cmdResponse.IsFileOutput, true)
				return
			}
			if !cmdResponse.IsNoResponse {
				// notify command executed
				s.SlackbotService.NotifySlackSuccess(ctx, &teamInfo.ReferenceToken, slackChannel, cmdResponse.Command.GetExecutedCommand(cmdResponse.IsPrintOption), false, false)
			}
			cmdResponse, err = s.CommandService.Exec(ctx, cmdResponse, botInfo.Name, user)
			if err != nil {
				go s.SlackbotService.NotifySlackError(ctx, &teamInfo.ReferenceToken, slackChannel, err, cmdResponse.IsFileOutput)
				return
			}
			if !cmdResponse.IsNoResponse {
				go s.SlackbotService.NotifySlackSuccess(ctx, &teamInfo.ReferenceToken, slackChannel, cmdResponse.Message, cmdResponse.IsFileOutput, true)
			}
		}
	}
}
