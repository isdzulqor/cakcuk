package external

import (
	"cakcuk/utils/logging"
	timeLib "cakcuk/utils/time"
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/slack-go/slack"
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
