package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	jsonLib "cakcuk/utils/json"
	requestLib "cakcuk/utils/request"
	"html"
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
	method, url, queryParams, headers, bodyParam := cmd.FromCukCommand()

	var response []byte
	if response, err = requestLib.Call(method, url, queryParams, headers, bodyParam); err != nil {
		return
	}

	var templateResponse string
	if templateResponse, err = cmd.OptionsModel.GetOptionValue(model.OptionParseResponse); err != nil {
		return
	}
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
	if err = newCmd.Create(cmd, botName, createdBy, teamID); err != nil {
		return
	}
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
