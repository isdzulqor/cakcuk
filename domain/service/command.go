package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	errorLib "cakcuk/utils/errors"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	requestLib "cakcuk/utils/request"
	"context"
	"html"
	"strings"
	"time"

	"fmt"
	"strconv"

	uuid "github.com/satori/go.uuid"
)

type CommandService struct {
	Config            *config.Config              `inject:""`
	CommandRepository repository.CommandInterface `inject:""`
}

func (s *CommandService) Help(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName string) (out string, err error) {
	var opt model.OptionModel
	opt, _ = cmd.OptionsModel.GetOptionByName(model.OptionCommand)
	if opt.Value != "" {
		if cmd, err = s.CommandRepository.GetCommandByName(ctx, opt.Value, teamID); err != nil {
			err = fmt.Errorf("Command for `%s` doesn't exist! `%s %s @%s` to show existing commands.", opt.Value,
				model.CommandHelp, model.OptionOneLine, botName)
			return
		}
		out = fmt.Sprintf("\n%s", cmd.PrintWithDescription(botName))

		logging.Logger(ctx).Debug("help response:", out)
		return
	}

	opt, _ = cmd.OptionsModel.GetOptionByName(model.OptionOneLine)
	isOneLine, _ := strconv.ParseBool(opt.Value)

	cmds, _ := s.CommandRepository.GetSQLCommandsByTeamID(ctx, teamID, repository.DefaultFilter())
	out = fmt.Sprintf("%s", cmds.Print(botName, isOneLine))

	logging.Logger(ctx).Debug("help response:", out)
	return
}

func (s *CommandService) Cuk(ctx context.Context, cmd model.CommandModel) (out string, err error) {
	method, url, queryParams, headers, bodyParam := cmd.FromCukCommand()
	var response []byte
	if response, err = requestLib.Call(ctx, method, url, queryParams, headers, bodyParam); err != nil {
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
		logging.Logger(ctx).Errorf("pretty string response, err: %v", errPretty)
		out = fmt.Sprintf("%s", response)
	}
	logging.Logger(ctx).Debug("response:", out)
	return
}

func (s *CommandService) Cak(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName, createdBy string) (out string, newCmd model.CommandModel, err error) {
	var isUpdate bool
	if isUpdate, err = newCmd.FromCakCommand(cmd, botName); err != nil {
		return
	}
	if isUpdate {
		if _, err = s.delete(ctx, teamID, repository.DefaultFilter(), newCmd.Name); err != nil {
			err = fmt.Errorf("Can't delete command for `%s` to force update. %v", newCmd.Name, err)
			logging.Logger(ctx).Warn(err)
		}
	}
	newCmd.Create(cmd, botName, createdBy, teamID)

	if err = s.CommandRepository.CreateNewCommand(ctx, newCmd); err != nil {
		if errorLib.IsSame(err, errorLib.ErrorAlreadyExists) {
			err = fmt.Errorf("Command for `%s` %v. Try `%s` to force update.", newCmd.Name, err, model.OptionUpdate)
			return
		}
		err = fmt.Errorf("Command for `%s` %v", newCmd.Name, err)
		return
	}

	out = fmt.Sprintf("\nNew Command Created\n\n%s\n", newCmd.PrintWithDescription(botName))
	logging.Logger(ctx).Debug("response:", out)
	return
}

func (s *CommandService) Del(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName string) (out string, commands model.CommandsModel, err error) {
	var commandNames []string
	if commandNames, err = cmd.FromDelCommand(); err != nil {
		return
	}
	if commands, err = s.delete(ctx, teamID, repository.DefaultFilter(), commandNames...); err != nil {
		return
	}
	out = fmt.Sprintf("Successfully delete commands for %s. Just type `%s %s @%s` to show existing commands.",
		strings.Join(commands.GetNames(), ","), model.CommandHelp, model.OptionOneLine, botName)
	logging.Logger(ctx).Debug("response:", out)
	return
}

func (s *CommandService) delete(ctx context.Context, teamID uuid.UUID, filter repository.BaseFilter, commandNames ...string) (commands model.CommandsModel, err error) {
	if commands, err = s.CommandRepository.GetSQLCommandsByNames(ctx, commandNames, teamID, filter); err != nil {
		return
	}
	if len(commands) == 0 {
		err = fmt.Errorf("No commands to be deleted. Show existing commands by typing `%s %s @%s`", model.CommandHelp, model.OptionOneLine, botName)
		return
	}
	err = s.DeleteCommands(ctx, commands, nil)
	return
}

func (s *CommandService) ValidateInput(ctx context.Context, msg *string, teamID uuid.UUID) (cmd model.CommandModel, err error) {
	*msg = strings.Replace(*msg, "\n", " ", -1)
	*msg = html.UnescapeString(*msg)
	stringSlice := strings.Split(*msg, " ")
	if cmd, err = s.CommandRepository.GetCommandByName(ctx, strings.ToLower(stringSlice[0]), teamID); err != nil {
		err = fmt.Errorf("Command for `%s` is unregistered. Use `%s` for creating new command. `%s %s=%s` for details.",
			stringSlice[0], model.CommandCak, model.CommandHelp, model.OptionCommand, model.CommandCak)
	}
	return
}

func (s *CommandService) DeleteCommands(ctx context.Context, commands model.CommandsModel, timeout *time.Duration) (err error) {
	if timeout != nil {
		time.Sleep(*timeout)
	}
	return s.CommandRepository.DeleteCommands(ctx, commands)
}
