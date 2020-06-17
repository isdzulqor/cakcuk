package external

import (
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"cakcuk/utils/request"
	timeLib "cakcuk/utils/time"
	"context"
	"encoding/json"
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/slack-go/slack"
	"golang.org/x/oauth2"
)

type SlackEvent struct {
	ClientMessageID *string `json:"client_msg_id,omitempty"`
	Type            *string `json:"type,omitempty"`
	Text            *string `json:"text,omitempty"`
	User            *string `json:"user,omitempty"`
	Ts              *string `json:"ts,omitempty"`
	Team            *string `json:"team,omitempty"`
	Channel         *string `json:"channel,omitempty"`
	EventTs         *string `json:"event_ts,omitempty"`
	Blocks          *[]struct {
		Type     *string `json:"type,omitempty"`
		BlockID  *string
		Elements *[]struct {
			Type     *string `json:"type,omitempty"`
			Elements *[]struct {
				Type *string `json:"type,omitempty"`
				Text *string `json:"text,omitempty"`
			} `json:"elements,omitempty"`
		} `json:"elements,omitempty"`
	} `json:"blocks,omitempty"`
}

func (s *SlackEvent) FromSlackEvent(in interface{}) error {
	temp, err := json.Marshal(in)
	if err != nil {
		return err
	}
	json.Unmarshal([]byte(temp), s)
	return nil
}

type SlackEventRequestModel struct {
	Token       *string           `json:"token,omitempty"`
	Challenge   *string           `json:"challenge,omitempty"`
	TeamID      *string           `json:"team_id,omitempty"`
	APIAppID    *string           `json:"api_app_id,omitempty"`
	Type        *string           `json:"type,omitempty"`
	EventID     *string           `json:"event_id,omitempty"`
	EventTime   *timeLib.UnixTime `json:"event_time,omitempty"`
	AuthedUsers *[]string         `json:"authed_users,omitempty"`
	Event       *SlackEvent       `json:"event,omitempty"`
}

type SlackClient struct {
	API *slack.Client
	RTM *slack.RTM
}

func InitSlackClient(slackToken string, debugMode, isEventAPI, isRTM bool) (out *SlackClient) {
	out = new(SlackClient)
	out.API = slack.New(
		slackToken,
		slack.OptionDebug(debugMode),
		slack.OptionLog(log.New(os.Stdout, "slack-bot: ", log.Lshortfile|log.LstdFlags)),
	)
	if isRTM {
		logging.Logger(context.Background()).Info("Slack RTM is enabled")
		out.RTM = out.API.NewRTM()
		go out.RTM.ManageConnection()
	}
	return
}

type SlackOauth2Response struct {
	Ok         *bool   `json:"ok"`
	Error      *string `json:"error"`
	AppID      *string `json:"app_id"`
	AuthedUser *struct {
		ID *string `json:"id"`
	} `json:"authed_user"`
	Scope       *string `json:"scope"`
	TokenType   *string `json:"token_type"`
	AccessToken *string `json:"access_token"`
	BotUserID   *string `json:"bot_user_id"`
	Team        *struct {
		ID   *string `json:"id"`
		Name *string `json:"name"`
	} `json:"team"`
	Enterprise      interface{} `json:"enterprise"`
	IncomingWebhook *struct {
		Channel          *string `json:"channel"`
		ChannelID        *string `json:"channel_id"`
		ConfigurationURL *string `json:"configuration_url"`
		URL              *string `json:"url"`
	} `json:"incoming_webhook"`
}

type SlackOauth2 struct {
	Config *oauth2.Config
	state  string
}

func InitSlackOauth2Config(state, redirectURL, clientID, clientSecret, authURL, tokenURL string, scopes []string) (out *SlackOauth2) {
	out.Config = &oauth2.Config{
		RedirectURL:  redirectURL,
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Scopes:       scopes,
		Endpoint: oauth2.Endpoint{
			AuthURL:  authURL,
			TokenURL: tokenURL,
		},
	}
	out.state = state
	return
}

func (s *SlackOauth2) Oauth2Exchange(ctx context.Context, state string, code string) (response SlackOauth2Response, err error) {
	if state != s.state {
		err = errorLib.ErrorSlackOauthInvalid.AppendMessage("invalid oauth state")
		return
	}

	headers := map[string]string{
		"Content-Type": "application/x-www-form-urlencoded",
	}

	urlForms := url.Values{
		"grant_type":    []string{"authorization_code"},
		"code":          []string{code},
		"redirect_uri":  []string{s.Config.RedirectURL},
		"client_id":     []string{s.Config.ClientID},
		"client_secret": []string{s.Config.ClientSecret},
	}

	var resp []byte
	resp, _, err = request.Request(ctx, "POST", s.Config.Endpoint.TokenURL, nil, headers, strings.NewReader(urlForms.Encode()), false)
	if err = json.Unmarshal(resp, &response); err != nil {
		err = errorLib.ErrorSlackOauthInvalid.AppendMessage(err.Error())
		return
	}

	if response.Ok != nil {
		if !*response.Ok && response.Error != nil {
			err = errorLib.ErrorSlackOauthInvalid.AppendMessage(*response.Error)
			return
		}
		return
	}
	err = errorLib.ErrorSlackOauthInvalid
	return
}
