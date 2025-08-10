package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	"cakcuk/external"
	"cakcuk/utils/commandutil"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	"cakcuk/utils/response"
	stringLib "cakcuk/utils/string"
	"context"
	"strings"

	"github.com/patrickmn/go-cache"
	"github.com/slack-go/slack/slackevents"

	"encoding/json"
	"fmt"
	"net/http"
)

const (
	SlackEventCallback            = "event_callback"
	SlackEventAppMention          = "app_mention"
	SlackAppHomeOpened            = "app_home_opened"
	SlackEventMessage             = "message"
	SlackEventURLVerification     = "url_verification"
	SlackEventMemberJoinedChannel = "member_joined_channel"
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

	s.SlackbotService.ProcessOauth2(ctx, r.FormValue("state"), r.FormValue("code"))
	http.Redirect(w, r, s.Config.Site.LandingPage, http.StatusTemporaryRedirect)
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
	s.GoCache.Set(*requestEvent.EventID, "", s.Config.Cache.RequestExpirationTime)
	s.prepareHandleEvent(ctx, *requestEvent.Event, requestEvent.TeamID)
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
	case SlackAppHomeOpened, SlackEventAppMention, SlackEventMessage, SlackEventCallback, SlackEventMemberJoinedChannel:
	default:
		return
	}

	teamInfo, err := s.TeamService.GetTeamInfo(ctx, stringLib.ReadValued(teamID, slackEvent.Team))
	if err != nil {
		logging.Logger(ctx).Warn("handle event, err:", err)
		return
	}

	s.handleEvent(ctx,
		stringLib.ReadSafe(slackEvent.User),
		eventType,
		stringLib.ReadSafe(slackEvent.Channel),
		stringLib.ReadSafe(slackEvent.Text),
		slackEvent.ThreadTs,
		teamInfo)
}

func (s SlackbotHandler) handleEvent(ctx context.Context, user, eventType, slackChannel, incomingMessage string, threadTs *string, teamInfo model.TeamModel) {
	defer func() {
		if r := recover(); r != nil {
			s.SlackbotService.NotifySlackError(ctx, &teamInfo.ReferenceToken, slackChannel, fmt.Errorf("Failed to handle event! %v", r), false, threadTs)
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
		s.GoCache.Set(slackChannel, "", s.Config.Cache.DefaultExpirationTime)
		slackStartedMsg := strings.ReplaceAll(model.SlackStartedMessage, "https://cakcuk.io/play", s.Config.Site.PlayPage)
		s.SlackbotService.NotifySlackSuccess(ctx, &teamInfo.ReferenceToken, slackChannel, slackStartedMsg, false, false, threadTs)
	case SlackEventMemberJoinedChannel:
		if len(s.Config.AllowedChannels) > 0 {
			if user == botInfo.ReferenceID {
				// means its the first time the bot joined the channel
				// so we need to check if the channel is allowed
				if !stringLib.StringContains(s.Config.AllowedChannels, slackChannel) {
					// if not allowed, then notify the channel and leave
					err := s.SlackbotService.LeaveChannel(ctx, &teamInfo.ReferenceToken, slackChannel, threadTs)
					if err != nil {
						logging.Logger(ctx).Error("failed to leave channel, err:", err)
					}
				}
			}
		}
	case SlackEventAppMention, SlackEventMessage, SlackEventCallback:
		if user == botInfo.ReferenceID {
			// it will ignore if it's the input from the bot itself
			return
		}

		if len(s.Config.AllowedChannels) > 0 {
			// if allowed channels is not empty, then it will only listen to the allowed channels
			// if allowed channels is empty, then it will listen to all channels
			if !stringLib.StringContains(s.Config.AllowedChannels, slackChannel) {
				// if not allowed, then leave the channel
				err := s.SlackbotService.LeaveChannel(ctx, &teamInfo.ReferenceToken, slackChannel, threadTs)
				if err != nil {
					logging.Logger(ctx).Error("failed to leave channel, err:", err)
				}
				return
			}
		}

		if botInfo.IsMentioned(&incomingMessage) {
			commandutil.SanitizeWords(&incomingMessage)
			cmdResponse, err := s.CommandService.Prepare(ctx, incomingMessage, user, teamInfo.ReferenceID,
				botInfo.Name, model.SourceSlack, slackChannel, &teamInfo)
			if err != nil {
				s.SlackbotService.NotifySlackError(ctx, &teamInfo.ReferenceToken, slackChannel, err, cmdResponse.IsFileOutput, threadTs)
				return
			}
			if cmdResponse.IsHelp {
				s.SlackbotService.NotifySlackSuccess(ctx, &teamInfo.ReferenceToken, slackChannel, cmdResponse.Message, cmdResponse.IsFileOutput, true, threadTs)
				return
			}
			// isNoResponse only work for commmands other than command group
			// command group isNoResponse is working on child command level
			if !cmdResponse.IsNoResponse || cmdResponse.Command.GroupName != "" {
				// notify command executed
				s.SlackbotService.NotifySlackSuccess(ctx, &teamInfo.ReferenceToken, slackChannel, cmdResponse.Command.GetExecutedCommand(cmdResponse.IsPrintOption), false, false, threadTs)
			}
			cmdResponse, err = s.CommandService.Exec(ctx, cmdResponse, botInfo.Name, user, slackChannel)
			if err != nil {
				s.SlackbotService.NotifySlackError(ctx, &teamInfo.ReferenceToken, slackChannel, err, cmdResponse.IsFileOutput, threadTs)
				return
			}
			// isNoResponse only work for commmands other than command group
			// command group isNoResponse is working on child command level
			if !cmdResponse.IsNoResponse || cmdResponse.Command.GroupName != "" {
				s.SlackbotService.NotifySlackSuccess(ctx, &teamInfo.ReferenceToken, slackChannel, cmdResponse.Message, cmdResponse.IsFileOutput, true, threadTs)
			}
		}
	}
}
