package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	jsonLib "cakcuk/utils/json"
	requestLib "cakcuk/utils/request"
	stringLib "cakcuk/utils/string"
	"html"
	"io"
	"strings"
	"time"

	"fmt"
	"log"
	"strconv"

	uuid "github.com/satori/go.uuid"
)

type CommandService struct {
	Config            *config.Config              `inject:""`
	CommandRepository repository.CommandInterface `inject:""`
}

func (s *CommandService) Help(cmd model.CommandModel, teamID uuid.UUID, botName string) (out string, err error) {
	var opt model.OptionModel
	opt, _ = cmd.OptionsModel.GetOptionByName(model.OptionCommand)
	if opt.Value != "" {
		if cmd, err = s.CommandRepository.GetCommandByName(opt.Value, teamID); err != nil {
			err = fmt.Errorf("Command for %s doesn't exist!", opt.Value)
			return
		}
		out = fmt.Sprintf("\n%s", cmd.PrintWithDescription(botName))
		if s.Config.DebugMode {
			log.Println("[INFO] response help:", out)
		}
		return
	}

	opt, _ = cmd.OptionsModel.GetOptionByName(model.OptionOneLine)
	isOneLine, _ := strconv.ParseBool(opt.Value)

	orderBy := "created"
	orderDirection := repository.AscendingDirection
	cmds, _ := s.CommandRepository.GetSQLCommandsByTeamID(teamID, repository.BaseFilter{
		OrderBy:        &orderBy,
		OrderDirection: &orderDirection,
	})
	out = fmt.Sprintf("%s", cmds.Print(botName, isOneLine))
	if s.Config.DebugMode {
		log.Println("[INFO] response help:", out)
	}
	return
}

func (s *CommandService) Cuk(cmd model.CommandModel) (out string, err error) {
	var opt model.OptionModel
	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionMethod); err != nil {
		return
	}
	method := opt.Value

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionURL); err != nil {
		return
	}
	url := opt.Value

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionHeaders); err != nil {
		return
	}
	headers := getParamsMap(opt.GetMultipleValues())

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionAuth); err != nil {
		return
	}
	authValue := opt.Value
	tempAuthValues := strings.Split(authValue, ":")
	if authValue != "" && len(tempAuthValues) > 1 {
		authValue = requestLib.GetBasicAuth(tempAuthValues[0], tempAuthValues[1])
		headers["Authorization"] = authValue
	}

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionURLParams); err != nil {
		return
	}
	urlParams := getParamsMap(opt.GetMultipleValues())
	url = assignUrlParams(url, urlParams)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionQueryParams); err != nil {
		return
	}
	qParams := getParamsMap(opt.GetMultipleValues())

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionBodyParams); err != nil {
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

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionParseResponse); err != nil {
		return
	}
	templateResponse := opt.Value
	if templateResponse != "" {
		if out, err = renderTemplate(templateResponse, response); err == nil {
			return
		}
	}

	var errPretty error
	if out, errPretty = jsonLib.ToPretty(response); errPretty != nil {
		log.Printf("[ERROR] response pretty string, err: %v", errPretty)
		out = fmt.Sprintf("%s", response)
	}

	if s.Config.DebugMode {
		log.Println("[INFO] response:", out)
	}
	return
}

func (s *CommandService) Cak(cmd model.CommandModel, teamID uuid.UUID, botName, createdBy string) (out string, newCmd model.CommandModel, err error) {
	var opt model.OptionModel
	var tempOpts model.OptionsModel

	if newCmd.Name, err = cmd.OptionsModel.GetOptionValue(model.OptionCommand); err != nil {
		return
	}

	if newCmd.Description, err = cmd.OptionsModel.GetOptionValue(model.OptionDescription); err != nil {
		return
	}

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionMethod); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionURL); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionParseResponse); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionAuth); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionHeaders); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionHeadersDynamic); err != nil {
		return
	}
	if opt.Value != "" {
		if tempOpts, err = opt.ConstructDynamic(opt.Value); err != nil {
			return
		}
		newCmd.OptionsModel.Append(tempOpts...)
	}

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionQueryParams); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionQueryParamsDynamic); err != nil {
		return
	}
	if opt.Value != "" {
		if tempOpts, err = opt.ConstructDynamic(opt.Value); err != nil {
			return
		}
		newCmd.OptionsModel.Append(tempOpts...)
	}

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionURLParams); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionURLParamsDynamic); err != nil {
		return
	}
	if opt.Value != "" {
		if tempOpts, err = opt.ConstructDynamic(opt.Value); err != nil {
			return
		}
		newCmd.OptionsModel.Append(tempOpts...)
	}

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionOutputFile); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if opt, err = cmd.OptionsModel.GetOptionByName(model.OptionPrintOptions); err != nil {
		return
	}
	newCmd.OptionsModel.Append(opt)

	if newCmd.Example == "" {
		newCmd.GenerateExample(botName)
	}

	newCmd.Create(createdBy, teamID)
	if err = s.CommandRepository.CreateNewCommand(newCmd); err != nil {
		err = fmt.Errorf("Command for %s %v", newCmd.Name, err)
		return
	}

	out = fmt.Sprintf("\nNew Command Created\n\n%s\n", newCmd.PrintWithDescription(botName))
	if s.Config.DebugMode {
		log.Println("[INFO] response:", out)
	}
	return
}

func (s *CommandService) ValidateInput(msg *string, teamID uuid.UUID) (cmd model.CommandModel, err error) {
	*msg = strings.Replace(*msg, "\n", " ", -1)
	*msg = html.UnescapeString(*msg)
	stringSlice := strings.Split(*msg, " ")
	if cmd, err = s.CommandRepository.GetCommandByName(strings.ToLower(stringSlice[0]), teamID); err != nil {
		err = fmt.Errorf("Please register your %s command first!", stringSlice[0])
	}
	return
}

func (s *CommandService) DeleteCommands(commands model.CommandsModel, timeout *time.Duration) (err error) {
	if timeout != nil {
		time.Sleep(*timeout)
	}
	return s.CommandRepository.DeleteCommands(commands)
}
