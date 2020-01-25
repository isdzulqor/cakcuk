package external

import (
	"cakcuk/utils/request"
	"encoding/json"
	"fmt"
	"strings"
)

type SlackClient struct {
	url   string
	token string
}

type SlackUser struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	RealName string `json:"real_name"`
}

type SlackBaseResponse struct {
	Ok    bool    `json:"ok"`
	Error *string `json:"error,omitempty"`
}

type SlackTeam struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Domain      string `json:"domain"`
	EmailDomain string `json:"email_domain"`
}

func NewSlackClient(url, token string) *SlackClient {
	return &SlackClient{url, token}
}

func (s SlackClient) PostMessage(username, iconEmoji, channel, text string) error {
	var slackBaseResponse SlackBaseResponse

	url := s.url + "/api/chat.postMessage"
	params := make(map[string]string)
	params["token"] = s.token
	params["username"] = username
	params["icon_emoji"] = iconEmoji
	params["channel"] = channel
	params["text"] = text
	resp, err := request.Call("POST", url, params, nil, nil)
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
	resp, err := request.Call("GET", url, params, nil, nil)
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
	resp, err := request.Call("GET", url, params, nil, nil)
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
	params["content"] = content

	resp, err := request.Call("POST", url, params, nil, nil)
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
