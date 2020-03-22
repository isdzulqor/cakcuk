package external

import (
	"cakcuk/config"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/request"
	timeLib "cakcuk/utils/time"
	"encoding/json"
	"fmt"
	"log"
	"strings"

	"golang.org/x/net/websocket"
)

type SlackClient struct {
	url   string
	token string
	retry int
}

type SlackUser struct {
	ID       *string `json:"id,omitempty"`
	Name     *string `json:"name,omitempty"`
	RealName *string `json:"real_name,omitempty"`
}

type SlackBaseResponse struct {
	Ok    bool    `json:"ok,omitempty"`
	Error *string `json:"error,omitempty"`
}

type SlackTeam struct {
	ID          *string `json:"id,omitempty"`
	Name        *string `json:"name,omitempty"`
	Domain      *string `json:"domain,omitempty"`
	EmailDomain *string `json:"email_domain,omitempty"`
}

type SlackAuth struct {
	URL    *string `json:"url,omitempty"`
	Team   *string `json:"team,omitempty"`
	User   *string `json:"user,omitempty"`
	TeamID *string `json:"team_id,omitempty"`
	UserID *string `json:"user_id,omitempty"`
	BotID  *string `json:"bot_id,omitempty"`
}

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

type SlackRTM struct {
	URL  *string    `json:"url,omitempty"`
	Team *SlackTeam `json:"team,omitempty"`
	Self *SlackUser `json:"self,omitempty"`
}

func NewSlackClient(url, token string, retry int) *SlackClient {
	return &SlackClient{url, token, retry}
}

func (s SlackClient) GetAuthTest() (out SlackAuth, err error) {
	var response struct {
		SlackBaseResponse
		*SlackAuth
	}

	url := s.url + "/api/auth.test"
	params := make(map[string]string)
	params["token"] = s.token
	resp, err := request.CallWithRetry("GET", url, params, nil, nil, s.retry)
	if err != nil {
		return
	}
	if err = json.Unmarshal(resp, &response); err != nil {
		return
	}
	if !response.Ok && response.Error != nil {
		err = fmt.Errorf(*response.Error)
		return
	}
	if response.SlackAuth == nil {
		err = fmt.Errorf(string(resp))
		return
	}
	out = *response.SlackAuth
	return
}

func (s SlackClient) PostMessage(username, iconEmoji, channel, text string) error {
	var slackBaseResponse SlackBaseResponse

	url := s.url + "/api/chat.postMessage"
	params := make(map[string]string)
	params["token"] = s.token
	params["username"] = username
	params["icon_emoji"] = iconEmoji
	params["channel"] = channel
	params["text"] = fmt.Sprintf("%.4000s", text)
	resp, err := request.CallWithRetry("POST", url, params, nil, nil, s.retry)
	if err != nil {
		return err
	}
	if err = json.Unmarshal(resp, &slackBaseResponse); err != nil {
		return err
	}
	if !slackBaseResponse.Ok && slackBaseResponse.Error != nil {
		return fmt.Errorf(*slackBaseResponse.Error)
	}
	return nil
}

func (s SlackClient) GetTeamInfo() (out SlackTeam, err error) {
	var response struct {
		SlackBaseResponse
		SlackTeam *SlackTeam `json:"team,omitempty"`
	}

	url := s.url + "/api/team.info"
	params := make(map[string]string)
	params["token"] = s.token
	resp, err := request.CallWithRetry("GET", url, params, nil, nil, s.retry)
	if err != nil {
		return
	}
	if err = json.Unmarshal(resp, &response); err != nil {
		return
	}
	if !response.Ok && response.Error != nil {
		err = fmt.Errorf(*response.Error)
		return
	}
	if response.SlackTeam == nil {
		err = fmt.Errorf(string(resp))
		return
	}
	out = *response.SlackTeam
	return
}

func (s SlackClient) GetUserInfo(userSlackID string) (out SlackUser, err error) {
	var response struct {
		SlackBaseResponse
		SlackUsers *[]SlackUser `json:"users,omitempty"`
	}

	url := s.url + "/api/users.info"
	params := make(map[string]string)
	params["token"] = s.token
	params["users"] = userSlackID
	resp, err := request.CallWithRetry("GET", url, params, nil, nil, s.retry)
	if err != nil {
		return
	}
	if err = json.Unmarshal(resp, &response); err != nil {
		return
	}
	if !response.Ok && response.Error != nil {
		err = fmt.Errorf(*response.Error)
		return
	}
	if response.SlackUsers == nil || len(*response.SlackUsers) == 0 {
		err = fmt.Errorf(string(resp))
		return
	}
	out = (*response.SlackUsers)[0]
	return
}

func (s SlackClient) UploadFile(channels []string, filename, content string) error {
	var slackBaseResponse SlackBaseResponse

	url := s.url + "/api/files.upload"
	params := make(map[string]string)
	params["token"] = s.token
	params["channels"] = strings.Join(channels, ",")
	params["filename"] = filename
	params["content"] = fmt.Sprintf("%.4000s", content)

	resp, err := request.CallWithRetry("POST", url, params, nil, nil, s.retry)
	if err != nil {
		return err
	}
	if err = json.Unmarshal(resp, &slackBaseResponse); err != nil {
		return err
	}
	if !slackBaseResponse.Ok && slackBaseResponse.Error != nil {
		return fmt.Errorf(*slackBaseResponse.Error)
	}
	return nil
}

func (s SlackClient) ConnectRTM() (out SlackRTM, err error) {
	var response struct {
		SlackBaseResponse
		*SlackRTM
	}

	url := s.url + "/api/rtm.connect"
	params := map[string]string{
		"token": s.token,
	}
	resp, err := request.CallWithRetry("GET", url, params, nil, nil, s.retry)
	if err != nil {
		return
	}
	if err = json.Unmarshal(resp, &response); err != nil {
		return
	}
	if !response.Ok && response.Error != nil {
		err = fmt.Errorf(*response.Error)
		return
	}
	if response.SlackRTM == nil {
		err = fmt.Errorf(string(resp))
		return
	}
	out = *response.SlackRTM
	return
}

func (s SlackClient) InitRTM(retry int) (out *SlackWebsocket, err error) {
	var rtm SlackRTM
	if rtm, err = s.ConnectRTM(); err != nil {
		return
	}
	out = &SlackWebsocket{
		URL:   *rtm.URL,
		Retry: retry,
	}
	err = out.start()
	return
}

type SlackWebsocket struct {
	URL            string
	Retry          int
	conn           *websocket.Conn
	quit           chan struct{}
	IncomingEvents chan SlackEvent
}

func (sw *SlackWebsocket) start() error {
	var err error
	retry := sw.Retry
	for retry != 0 {
		if sw.conn, err = websocket.Dial(sw.URL, "", "http://localhost"); err == nil {
			break
		}
		retry--
	}
	if err != nil {
		return err
	}
	sw.quit = make(chan struct{})
	sw.IncomingEvents = make(chan SlackEvent)

	go sw.loop()
	return nil
}

func (sw *SlackWebsocket) stop() {
	if err := sw.conn.Close(); err != nil {
		log.Printf("[ERROR] Failed to close websocket connection: %v", err)
	}
	sw.reconnect()
}

func (sw *SlackWebsocket) reconnect() {
	sw.start()
}

func (sw *SlackWebsocket) loop() {
	for {
		select {
		case <-sw.quit:
			sw.stop()
		default:
			var msg string
			var slackEventData SlackEvent
			if err := websocket.Message.Receive(sw.conn, &msg); err != nil {
				log.Println("[ERROR] Error to receive message data from websocket server - %v", err)
				close(sw.quit)
			} else {
				if config.Get().DebugMode {
					log.Println("[INFO] Incoming event from slack websocket:", msg)
				}
				if err = jsonLib.UnmarshalFromString(msg, &slackEventData); err == nil {
					sw.IncomingEvents <- slackEventData
				}
			}
		}
	}
}
