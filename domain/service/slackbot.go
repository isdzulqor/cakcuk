package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	errorLib "cakcuk/utils/error"
	jsonLib "cakcuk/utils/json"
	requestLib "cakcuk/utils/request"

	"github.com/nlopes/slack"

	"fmt"
	"log"
	"strconv"
	"strings"
)

type SlackbotService struct {
	SlackbotRepository repository.SlackbotInterface `inject:""`
	CommandRepository  repository.CommandInterface  `inject:""`
	Config             *config.Config               `inject:""`
	SlackClient        *slack.Client                `inject:""`
}

func (s *SlackbotService) HelpHit(cmd model.CommandModel, botName string) (respString string) {
	var opt model.OptionModel
	var err error
	opt, err = cmd.OptionModels.GetOptionByName("--command")
	cmd, err = s.CommandRepository.GetCommandByName(opt.Value)

	if err != nil {
		cmds, _ := s.CommandRepository.GetCommandsByBotID(botName)
		respString = fmt.Sprintf("```\n%s```", cmds.Print(botName))
		if s.Config.DebugMode {
			log.Println("[INFO] response helpHit:", respString)
		}
		return
	}

	respString = fmt.Sprintf("```\n%s```", cmd.PrintWithDescription(botName))
	if s.Config.DebugMode {
		log.Println("[INFO] response helpHit:", respString)
	}
	return
}

// TODO: add body params (form-data, x-www-for-urlencoded, raw)
func (s *SlackbotService) CukHit(cmd model.CommandModel) (respString string, err error) {
	var opt model.OptionModel
	if opt, err = cmd.OptionModels.GetOptionByName("--method"); err != nil {
		return
	}
	method := opt.Value

	if opt, err = cmd.OptionModels.GetOptionByName("--url"); err != nil {
		return
	}
	url := opt.Value

	if opt, err = cmd.OptionModels.GetOptionByName("--headers"); err != nil {
		return
	}
	flatHeaders := opt.GetMultipleValues()
	headers := getParamsMap(flatHeaders)

	if opt, err = cmd.OptionModels.GetOptionByName("--queryParams"); err != nil {
		return
	}

	flatQParams := opt.GetMultipleValues()
	qParams := getParamsMap(flatQParams)

	var response []byte
	if response, err = requestLib.Call(method, url, qParams, headers, nil); err != nil {
		return
	}

	if opt, err = cmd.OptionModels.GetOptionByName("--pretty"); err != nil {
		return
	}
	isPretty, _ := strconv.ParseBool(opt.Value)
	if isPretty {
		respString, err = jsonLib.ToPretty(response)
		if s.Config.DebugMode {
			log.Println("[INFO] response pretty:", respString)
		}
		return
	}

	respString = fmt.Sprintf("%s", response)
	if s.Config.DebugMode {
		log.Println("[INFO] response:", respString)
	}
	return
}

func getParamsMap(in []string) (out map[string]string) {
	out = make(map[string]string)
	for _, h := range in {
		if strings.Contains(h, ":") {
			k := strings.Split(h, ":")[0]
			v := strings.Split(h, ":")[1]
			out[k] = v
		}
	}
	return
}

func (s *SlackbotService) NotifySlackCommandExecuted(channel string, cmd model.CommandModel) {
	msg := fmt.Sprintf("Executing *%s*...", cmd.Name)
	msg += cmd.OptionModels.PrintValuedOptions()
	_, _, err := s.SlackClient.PostMessage(channel, slack.MsgOptionAsUser(true), slack.MsgOptionText(msg, false))
	if err != nil {
		log.Printf("[ERROR] notifySlackCommandExecuted, err: %s", err)
	}
}

func (s *SlackbotService) NotifySlackWithFile(channel string, response string) {
	params := slack.FileUploadParameters{
		Filename: "output.txt", Content: response,
		Channels: []string{channel},
	}
	if _, err := s.SlackClient.UploadFile(params); err != nil {
		log.Printf("[ERROR] notifySlackWithFile, err: %s", err)
	}
}

func (s *SlackbotService) NotifySlackSuccess(channel string, response string, isFileOutput bool) {
	if isFileOutput {
		s.NotifySlackWithFile(channel, response)
		return
	}
	_, _, err := s.SlackClient.PostMessage(channel, slack.MsgOptionAsUser(true), slack.MsgOptionText(response, false))
	if err != nil {
		log.Printf("[ERROR] notifySlackSuccess, err: %s", err)
	}
}

func (s *SlackbotService) NotifySlackError(channel string, errData error, isFileOutput bool) {
	var errLib *errorLib.Error
	var msg string
	var ok bool
	if errLib, ok = errData.(*errorLib.Error); ok {
		msg = errLib.Message
	}
	if !ok {
		msg = errData.Error()
	}
	if isFileOutput {
		s.NotifySlackWithFile(channel, msg)
		return
	}
	_, _, err := s.SlackClient.PostMessage(channel, slack.MsgOptionAsUser(true), slack.MsgOptionText(msg, false))
	if err != nil {
		log.Printf("[ERROR] notifySlackError, err: %s", err)
	}
}

func (s *SlackbotService) ValidateInput(msg *string) (cmd model.CommandModel, err error) {
	stringSlice := strings.Split(*msg, " ")

	cmd, err = s.CommandRepository.GetCommandByName(strings.ToLower(stringSlice[0]))
	return
}
