package external

import (
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/request"
	"fmt"
	"strconv"
)

type SlackClient struct {
	url   string
	token string
}

func NewSlackClient(url, token string) *SlackClient {
	return &SlackClient{url, token}
}

func (s SlackClient) PostMessage(username, iconEmoji, channel, text string) error {
	params := make(map[string]string)
	params["token"] = s.token
	params["username"] = username
	params["icon_emoji"] = iconEmoji
	params["channel"] = channel
	params["text"] = text
	url := s.url + "/api/chat.postMessage"
	response, err := request.Call("GET", url, params, nil, nil)
	if err != nil {
		return fmt.Errorf("[ERROR] Error posting message to slack, err: %v", err)
	}
	stringResponse := string(response)
	v := jsonLib.Find(stringResponse, "ok")
	if v == "" {
		return fmt.Errorf(stringResponse)
	}
	var isResponseOK bool
	if isResponseOK, err = strconv.ParseBool(v); err != nil {
		return err
	}
	if !isResponseOK {
		return fmt.Errorf(jsonLib.Find(stringResponse, "error"))
	}
	return nil
}

// TODO
func (s SlackClient) UploadFile(username, iconEmoji, channel, text string) error {
	return nil
}
