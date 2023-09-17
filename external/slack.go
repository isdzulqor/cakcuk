package external

import (
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"cakcuk/utils/request"
	stringLib "cakcuk/utils/string"
	timeLib "cakcuk/utils/time"
	"context"
	"encoding/json"
	"fmt"
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
	ThreadTs        *string `json:"thread_ts,omitempty"`
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
	API       *slack.Client
	RTM       *slack.RTM
	CustomAPI *SlackClientCustom
}

func InitSlackClient(slackURL, slackToken string, debugMode, isEventAPI, isRTM bool, retry int) (out *SlackClient) {
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
	out.CustomAPI = InitSlackClientCustom(slackURL, slackToken, retry)
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
	out = new(SlackOauth2)
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

// Oauth2Acess https://api.slack.com/methods/oauth.v2.access
func (s *SlackOauth2) Oauth2Acess(ctx context.Context, state string, code string) (response SlackOauth2Response, err error) {
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

type SlackUserCustom struct {
	ID       *string `json:"id,omitempty"`
	Name     *string `json:"name,omitempty"`
	RealName *string `json:"real_name,omitempty"`
}

type SlackUserCustoms []SlackUserCustom

func (u SlackUserCustoms) GetOneByID(id string) (SlackUserCustom, error) {
	for _, user := range u {
		if stringLib.ReadSafe(user.ID) == id {
			return user, nil
		}
	}
	return SlackUserCustom{}, fmt.Errorf("No user found")
}

type SlackBaseResponse struct {
	Ok    bool    `json:"ok,omitempty"`
	Error *string `json:"error,omitempty"`
}

type SlackTeamCustom struct {
	ID          *string `json:"id,omitempty"`
	Name        *string `json:"name,omitempty"`
	Domain      *string `json:"domain,omitempty"`
	EmailDomain *string `json:"email_domain,omitempty"`
}

type SlackAuthCustom struct {
	URL    *string `json:"url,omitempty"`
	Team   *string `json:"team,omitempty"`
	User   *string `json:"user,omitempty"`
	TeamID *string `json:"team_id,omitempty"`
	UserID *string `json:"user_id,omitempty"`
	BotID  *string `json:"bot_id,omitempty"`
}

type SlackClientCustom struct {
	url   string
	token string
	retry int
}

func InitSlackClientCustom(slackURL string, slackToken string, retry int) *SlackClientCustom {
	return &SlackClientCustom{
		url:   slackURL,
		token: slackToken,
		retry: retry,
	}
}

func (s SlackClientCustom) GetAuthTest(ctx context.Context, token *string) (out SlackAuthCustom, err error) {
	var response struct {
		SlackBaseResponse
		*SlackAuthCustom
	}

	slackURL := s.url + "/api/auth.test"
	headers := map[string]string{
		"Authorization": s.readToken(token),
	}

	resp, _, err := request.Request(ctx, "GET", slackURL, nil, headers, nil, false)
	if err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if err = json.Unmarshal(resp, &response); err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if !response.Ok && response.Error != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(*response.Error)
		return
	}
	if response.SlackAuthCustom == nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(string(resp))
		return
	}
	out = *response.SlackAuthCustom
	return
}

func (s SlackClientCustom) PostMessage(ctx context.Context, input InputPostMessage) (err error) {
	var slackBaseResponse SlackBaseResponse

	slackURL := s.url + "/api/chat.postMessage"
	params := url.Values{
		"username": {input.Username},
		"channel":  {input.Channel},
		"text":     {input.Text},
	}
	if input.ThreadTs != nil && *input.ThreadTs != "" {
		params.Set("thread_ts", *input.ThreadTs)
	}

	headers := map[string]string{
		"Authorization": s.readToken(input.Token),
	}

	resp, _, err := request.Request(ctx, "POST", slackURL, params, headers, nil, false)
	if err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if err = json.Unmarshal(resp, &slackBaseResponse); err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if !slackBaseResponse.Ok && slackBaseResponse.Error != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(*slackBaseResponse.Error)
		return
	}
	return
}

func (s SlackClientCustom) LeaveChannel(ctx context.Context, input InputLeaveChannel) (err error) {
	var slackBaseResponse SlackBaseResponse

	slackURL := s.url + "/api/conversations.leave"
	params := url.Values{
		"channel": {input.Channel},
	}

	headers := map[string]string{
		"Authorization": s.readToken(input.Token),
	}

	resp, _, err := request.Request(ctx, "POST", slackURL, params, headers, nil, false)
	if err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if err = json.Unmarshal(resp, &slackBaseResponse); err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if !slackBaseResponse.Ok && slackBaseResponse.Error != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(*slackBaseResponse.Error)
		return
	}
	return
}

func (s SlackClientCustom) GetTeamInfo(ctx context.Context, token *string) (out SlackTeamCustom, err error) {
	var response struct {
		SlackBaseResponse
		SlackTeamCustom *SlackTeamCustom `json:"team,omitempty"`
	}

	slackURL := s.url + "/api/team.info"
	headers := map[string]string{
		"Authorization": s.readToken(token),
	}

	resp, _, err := request.Request(ctx, "GET", slackURL, nil, headers, nil, false)
	if err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if err = json.Unmarshal(resp, &response); err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if !response.Ok && response.Error != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(*response.Error)
		return
	}
	if response.SlackTeamCustom == nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(string(resp))
		return
	}
	out = *response.SlackTeamCustom
	return
}

func (s SlackClientCustom) GetUsersInfo(ctx context.Context, token *string, userSlackIDs []string) (out SlackUserCustoms, err error) {
	var response struct {
		SlackBaseResponse
		SlackUserCustoms *[]SlackUserCustom `json:"users,omitempty"`
	}

	slackURL := s.url + "/api/users.info"
	params := url.Values{
		"users": {strings.Join(userSlackIDs, ",")},
	}
	headers := map[string]string{
		"Authorization": s.readToken(token),
	}

	resp, _, err := request.Request(ctx, "GET", slackURL, params, headers, nil, false)
	if err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if err = json.Unmarshal(resp, &response); err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if !response.Ok && response.Error != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(*response.Error)
		return
	}
	if response.SlackUserCustoms == nil || len(*response.SlackUserCustoms) == 0 {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(string(resp))
		return
	}
	out = *response.SlackUserCustoms
	return
}

func (s SlackClientCustom) UploadFile(ctx context.Context, token *string, channels []string, filename, content string, threadTs *string) (err error) {
	var slackBaseResponse SlackBaseResponse
	slackURL := s.url + "/api/files.upload"
	params := url.Values{
		"channels": {strings.Join(channels, ",")},
		"filename": {filename},
		"content":  {content},
	}
	if threadTs != nil && *threadTs != "" {
		params.Set("thread_ts", *threadTs)
	}
	headers := map[string]string{
		"Authorization": s.readToken(token),
	}
	resp, _, err := request.Request(ctx, "POST", slackURL, params, headers, nil, false)
	if err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if err = json.Unmarshal(resp, &slackBaseResponse); err != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(err.Error())
		return
	}
	if !slackBaseResponse.Ok && slackBaseResponse.Error != nil {
		err = errorLib.ErrorSlackClientInvalid.AppendMessage(*slackBaseResponse.Error)
		return
	}
	return
}

func (s SlackClientCustom) readToken(token *string) string {
	if token != nil && *token != "" {
		return "Bearer " + *token
	}
	return "Bearer " + s.token
}
