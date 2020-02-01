package service

import (
	"bytes"
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/error"
	jsonLib "cakcuk/utils/json"
	requestLib "cakcuk/utils/request"
	stringLib "cakcuk/utils/string"
	"encoding/json"
	"html"
	"io"
	"text/template"

	"fmt"
	"log"
	"strconv"
	"strings"
)

type SlackbotService struct {
	SlackbotRepository repository.SlackbotInterface `inject:""`
	CommandRepository  repository.CommandInterface  `inject:""`
	TeamRepository     repository.TeamInterface     `inject:""`
	Config             *config.Config               `inject:""`
	SlackClient        *external.SlackClient        `inject:""`
}

func (s *SlackbotService) HelpHit(cmd model.CommandModel, slackbot model.SlackbotModel, slackTeamID string) (respString string) {
	var opt model.OptionModel
	var err error
	team, err := s.TeamRepository.GetTeamBySlackID(slackTeamID)
	if err != nil {
		return
	}
	opt, _ = cmd.OptionsModel.GetOptionByName("--command")
	if opt.Value != "" {
		if cmd, err = s.CommandRepository.GetCommandByName(opt.Value, team.ID); err == nil {
			respString = fmt.Sprintf("\n%s", cmd.PrintWithDescription(slackbot.Name))
			if s.Config.DebugMode {
				log.Println("[INFO] response helpHit:", respString)
			}
			return
		}
	}

	opt, _ = cmd.OptionsModel.GetOptionByName("--oneLine")
	isOneLine, _ := strconv.ParseBool(opt.Value)

	orderBy := "created"
	orderDirection := repository.AscendingDirection
	cmds, _ := s.CommandRepository.GetSQLCommandsByTeamID(team.ID, repository.BaseFilter{
		OrderBy:        &orderBy,
		OrderDirection: &orderDirection,
	})
	respString = fmt.Sprintf("%s", cmds.Print(slackbot.Name, isOneLine))
	if s.Config.DebugMode {
		log.Println("[INFO] response helpHit:", respString)
	}
	return
}

func (s *SlackbotService) CukHit(cmd model.CommandModel) (respString string, err error) {
	var opt model.OptionModel
	if opt, err = cmd.OptionsModel.GetOptionByName("--method"); err != nil {
		return
	}
	method := opt.Value

	if opt, err = cmd.OptionsModel.GetOptionByName("--url"); err != nil {
		return
	}
	url := opt.Value

	if opt, err = cmd.OptionsModel.GetOptionByName("--headers"); err != nil {
		return
	}
	headers := getParamsMap(opt.GetMultipleValues())

	if opt, err = cmd.OptionsModel.GetOptionByName("--auth"); err != nil {
		return
	}
	authValue := opt.Value
	tempAuthValues := strings.Split(authValue, ":")
	if authValue != "" && len(tempAuthValues) > 1 {
		authValue = requestLib.GetBasicAuth(tempAuthValues[0], tempAuthValues[1])
		headers["Authorization"] = authValue
	}

	if opt, err = cmd.OptionsModel.GetOptionByName("--urlParams"); err != nil {
		return
	}
	urlParams := getParamsMap(opt.GetMultipleValues())
	url = assignUrlParams(url, urlParams)

	if opt, err = cmd.OptionsModel.GetOptionByName("--queryParams"); err != nil {
		return
	}
	qParams := getParamsMap(opt.GetMultipleValues())

	if opt, err = cmd.OptionsModel.GetOptionByName("--bodyParams"); err != nil {
		return
	}
	var bodyParam io.Reader
	if opt.Value != "" {
		bodyParam = stringLib.ToIoReader(opt.Value)
		if _, ok := headers["Content-Type"]; !ok {
			if jsonLib.IsJSON(opt.Value) {
				headers["Content-Type"] = "application/json"
			}
		}
	}

	var response []byte
	if response, err = requestLib.Call(method, url, qParams, headers, bodyParam); err != nil {
		return
	}

	if opt, err = cmd.OptionsModel.GetOptionByName("--parseResponse"); err != nil {
		return
	}
	templateResponse := opt.Value
	if templateResponse != "" {
		if respString, err = renderTemplate(templateResponse, response); err == nil {
			return
		}
	}

	var errPretty error
	if respString, errPretty = jsonLib.ToPretty(response); errPretty != nil {
		log.Printf("[ERROR] response pretty string, err: %v", errPretty)
		respString = fmt.Sprintf("%s", response)
	}

	if s.Config.DebugMode {
		log.Println("[INFO] response:", respString)
	}
	return
}

func (s *SlackbotService) CakHit(cmd model.CommandModel, slackbot model.SlackbotModel, slackUserID,
	slackTeamID string) (respString string, err error) {
	var opt model.OptionModel
	var tempOpts model.OptionsModel
	if opt, err = cmd.OptionsModel.GetOptionByName("--command"); err != nil {
		return
	}
	newCmd := model.CommandModel{
		Name: opt.Value,
	}
	if opt, err = cmd.OptionsModel.GetOptionByName("--description"); err != nil {
		return
	}
	newCmd.Description = opt.Value

	if opt, err = cmd.OptionsModel.GetOptionByName("--method"); err != nil {
		return
	}
	newCmd.OptionsModel = append(newCmd.OptionsModel, opt)

	if opt, err = cmd.OptionsModel.GetOptionByName("--url"); err != nil {
		return
	}
	newCmd.OptionsModel = append(newCmd.OptionsModel, opt)

	if opt, err = cmd.OptionsModel.GetOptionByName("--parseResponse"); err != nil {
		return
	}
	newCmd.OptionsModel = append(newCmd.OptionsModel, opt)

	if opt, err = cmd.OptionsModel.GetOptionByName("--auth"); err != nil {
		return
	}
	newCmd.OptionsModel = append(newCmd.OptionsModel, opt)

	if opt, err = cmd.OptionsModel.GetOptionByName("--headers"); err != nil {
		return
	}
	newCmd.OptionsModel = append(newCmd.OptionsModel, opt)

	if opt, err = cmd.OptionsModel.GetOptionByName("--headersDynamic"); err != nil {
		return
	}
	if opt.Value != "" {
		if tempOpts, err = opt.ConstructDynamic(opt.Value); err != nil {
			return
		}
		newCmd.OptionsModel = append(newCmd.OptionsModel, tempOpts...)
	}

	if opt, err = cmd.OptionsModel.GetOptionByName("--queryParams"); err != nil {
		return
	}
	newCmd.OptionsModel = append(newCmd.OptionsModel, opt)

	if opt, err = cmd.OptionsModel.GetOptionByName("--queryParamsDynamic"); err != nil {
		return
	}
	if opt.Value != "" {
		if tempOpts, err = opt.ConstructDynamic(opt.Value); err != nil {
			return
		}
		newCmd.OptionsModel = append(newCmd.OptionsModel, tempOpts...)
	}

	if opt, err = cmd.OptionsModel.GetOptionByName("--urlParams"); err != nil {
		return
	}
	newCmd.OptionsModel = append(newCmd.OptionsModel, opt)

	if opt, err = cmd.OptionsModel.GetOptionByName("--urlParamsDynamic"); err != nil {
		return
	}
	if opt.Value != "" {
		if tempOpts, err = opt.ConstructDynamic(opt.Value); err != nil {
			return
		}
		newCmd.OptionsModel = append(newCmd.OptionsModel, tempOpts...)
	}

	if opt, err = cmd.OptionsModel.GetOptionByName("--outputFile"); err != nil {
		return
	}
	newCmd.OptionsModel = append(newCmd.OptionsModel, opt)

	if newCmd.Example == "" {
		newCmd.AutoGenerateExample(slackbot.Name)
	}

	slackUser, err := s.SlackClient.GetUserInfo(slackUserID)
	if err != nil {
		return
	}
	team, err := s.TeamRepository.GetTeamBySlackID(slackTeamID)
	if err != nil {
		return
	}
	newCmd.Create(slackUser.Name, team.ID)
	if err = s.CommandRepository.CreateNewCommand(newCmd); err != nil {
		return
	}

	respString = fmt.Sprintf("\nNew Command Created\n\n%s\n", newCmd.PrintWithDescription(slackbot.Name))
	if s.Config.DebugMode {
		log.Println("[INFO] response:", respString)
	}
	return
}

var escapeSequencesReplacer = strings.NewReplacer(
	`\n `, "\n",
	`\n`, "\n",
	`\t`, "\t",
)

func renderTemplate(givenTemplate string, jsonData []byte) (out string, err error) {
	t := template.Must(template.New("").Parse(givenTemplate))
	m := map[string]interface{}{}
	if err = json.Unmarshal(jsonData, &m); err != nil {
		return
	}
	var buffer bytes.Buffer
	if err = t.Execute(&buffer, m); err != nil {
		return
	}

	out = escapeSequencesReplacer.Replace(buffer.String())
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

func assignUrlParams(url string, urlParams map[string]string) string {
	for k, v := range urlParams {
		replacer := "{{" + k + "}}"
		url = strings.Replace(url, replacer, v, -1)
	}
	return url
}

func (s *SlackbotService) NotifySlackCommandExecuted(channel string, cmd model.CommandModel) {
	msg := fmt.Sprintf("Executing *%s*...", cmd.Name)
	msg += cmd.OptionsModel.PrintValuedOptions()
	if err := s.SlackClient.PostMessage(s.Config.Slack.Username, s.Config.Slack.IconEmoji, channel, msg); err != nil {
		log.Printf("[ERROR] notifySlackCommandExecuted, err: %v", err)
	}
}

func (s *SlackbotService) NotifySlackWithFile(channel string, response string) {
	if err := s.SlackClient.UploadFile([]string{channel}, "output.txt", response); err != nil {
		log.Printf("[ERROR] notifySlackWithFile, err: %v", err)
	}
}

func (s *SlackbotService) NotifySlackSuccess(channel string, response string, isFileOutput bool) {
	textMessages := stringLib.SplitByLength(response, s.Config.Slack.CharacterLimit)

	for _, text := range textMessages {
		if isFileOutput {
			s.NotifySlackWithFile(channel, text)
			continue
		}
		text = "```" + text + "```"
		if err := s.SlackClient.PostMessage(s.Config.Slack.Username, s.Config.Slack.IconEmoji, channel, text); err != nil {
			log.Printf("[ERROR] notifySlackSuccess, err: %v", err)
		}
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
	if err := s.SlackClient.PostMessage(s.Config.Slack.Username, s.Config.Slack.IconEmoji, channel, msg); err != nil {
		log.Printf("[ERROR] notifySlackError, err: %v", err)
	}
}

func (s *SlackbotService) ValidateInput(msg *string, slackTeamID string) (cmd model.CommandModel, err error) {
	*msg = strings.Replace(*msg, "\n", " ", -1)
	*msg = html.UnescapeString(*msg)
	stringSlice := strings.Split(*msg, " ")
	team, err := s.TeamRepository.GetTeamBySlackID(slackTeamID)
	if err != nil {
		return
	}
	cmd, err = s.CommandRepository.GetCommandByName(strings.ToLower(stringSlice[0]), team.ID)
	return
}
