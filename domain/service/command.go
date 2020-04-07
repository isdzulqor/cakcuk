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
	ScopeRepository   repository.ScopeInterface   `inject:""`
	UserRepository    repository.UserInterface    `inject:""`
	ScopeService      *ScopeService               `inject:""`
	UserService       *UserService                `inject:""`
}

func (s *CommandService) Help(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName string, scopes model.ScopesModel) (out string, err error) {
	var (
		opt  model.OptionModel
		cmds = model.GetSortedDefaultCommands()
	)
	cmds.Append(scopes.GetAllCommands().GetUnique()...)
	opt, _ = cmd.Options.GetOptionByName(model.OptionCommand)
	if opt.Value != "" {
		if cmd, err = cmds.GetOneByName(opt.Value); err != nil {
			err = fmt.Errorf("Command for `%s` %s. `%s %s @%s` to show existing commands.", opt.Value, err,
				model.CommandHelp, model.OptionOneLine, botName)
			return
		}
		out = fmt.Sprintf("\n%s", cmd.PrintWithDescription(botName))

		logging.Logger(ctx).Debug("help response:", out)
		return
	}

	opt, _ = cmd.Options.GetOptionByName(model.OptionOneLine)
	isOneLine, _ := strconv.ParseBool(opt.Value)
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

	_, _, isNoParse, _ := cmd.ExtractGlobalDefaultOptions()

	var templateResponse string
	if templateResponse, err = cmd.Options.GetOptionValue(model.OptionParseResponse); err != nil {
		return
	}
	if templateResponse != "" && !isNoParse {
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

func (s *CommandService) Cak(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName, executedBy string, scopes model.ScopesModel) (out string, newCmd model.CommandModel, err error) {
	var (
		isUpdate    bool
		scopeNames  []string
		allCommands = scopes.GetAllCommands()
	)

	if isUpdate, scopeNames, err = newCmd.FromCakCommand(cmd, botName); err != nil {
		return
	}

	if scopes, err = scopes.GetByNames(scopeNames); err != nil {
		err = fmt.Errorf("Failed to resolve scopes for `%s`. %v", strings.Join(scopeNames, ","), err)
		logging.Logger(ctx).Warn(err)
		return
	}

	if isUpdate {
		var deletedCommands model.CommandsModel
		if deletedCommands, err = allCommands.GetByNames(newCmd.Name); err == nil && len(deletedCommands) > 0 {
			scopes.DeleteByCommands(deletedCommands)
			if err = s.DeleteCommands(ctx, deletedCommands, nil); err != nil {
				return
			}
		}
	}

	// validate command name not exist on on specified scopes
	if tempScopes, errTemp := scopes.GetByCommandName(newCmd.Name); errTemp == nil && len(tempScopes) > 0 {
		err = fmt.Errorf("Command for `%s` already exists", newCmd.Name)
		return
	}
	newCmd.Create(cmd, botName, executedBy, teamID, scopes)

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

func (s *CommandService) Del(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName string, scopes model.ScopesModel) (out string, deletedCommands model.CommandsModel, err error) {
	var commandNames []string
	if commandNames, err = cmd.FromDelCommand(); err != nil {
		return
	}
	if deletedCommands, err = scopes.GetAllCommands().GetUnique().GetByNames(commandNames...); err != nil {
		return
	}
	if len(deletedCommands) == 0 {
		fmt.Errorf("No Commands deleted!")
		return
	}
	err = s.DeleteCommands(ctx, deletedCommands, nil)

	out = fmt.Sprintf("Successfully delete commands for %s. Just type `%s %s @%s` to show existing commands.",
		strings.Join(deletedCommands.GetNames(), ","), model.CommandHelp, model.OptionOneLine, botName)
	logging.Logger(ctx).Debug("response:", out)
	return
}

// TODO: refactor
func (s *CommandService) Scope(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName, executedBy string, scopes model.ScopesModel) (out string, err error) {
	var (
		action, scopeName   string
		users, commandNames []string
		isOneLine           bool
		currentScope        model.ScopeModel
		commands            model.CommandsModel
		allCommands         = scopes.GetAllCommands()
	)

	if action, scopeName, users, commandNames, isOneLine, err = cmd.FromScopeCommand(); err != nil {
		return
	}

	// scope show all
	if (action == model.ScopeActionShow || action == "") && scopeName == "" && len(commandNames) == 0 {
		out = scopes.Print(isOneLine)
		return
	}

	if len(commandNames) > 0 {
		if commands, err = allCommands.GetByNames(commandNames...); err != nil {
			return
		}
		commands = commands.GetUnique()
	}

	// scope list by command
	if len(scopeName) == 0 && action == "" && len(commandNames) > 0 {
		if scopes, err = scopes.GetByCommandNames(commandNames...); err != nil {
			return
		}
		out = scopes.GetUnique().Print(true)
		return
	}

	if action != model.ScopeActionCreate {
		if currentScope, err = scopes.GetByName(scopeName); err != nil {
			return
		}
	}

	// Validation
	switch action {
	case model.ScopeActionCreate, model.ScopeActionUpdate:
		if len(users) == 0 && len(commandNames) == 0 {
			err = fmt.Errorf("User or Command parameter are mandatory to %s scope", action)
			return
		}
	}

	switch action {
	case model.ScopeActionShow:
		out = currentScope.Print(isOneLine)
		return
	case model.ScopeActionCreate:
		if currentScope, err = s.ScopeService.Create(ctx, scopeName, executedBy, teamID, users, commands); err != nil {
			return
		}
		out = currentScope.Print(false)
		return
	case model.ScopeActionUpdate:
		if currentScope, err = s.ScopeService.Update(ctx, executedBy, currentScope, teamID, users, commands); err != nil {
			return
		}
		out = currentScope.Print(false)
		return
	case model.ScopeActionDelete:
		var deleteType string
		if currentScope, deleteType, err = s.ScopeService.Delete(ctx, executedBy, currentScope, teamID, users, commands); err != nil {
			return
		}
		if deleteType == ScopeDeleteComplete {
			out = fmt.Sprintf("Successfully delete scope for `%s`", currentScope.Name)
			return
		}
		out = fmt.Sprintf("Successfully reduce scope for `%s`\n", currentScope.Name)
		out += currentScope.Print(false)
		return
	}

	logging.Logger(ctx).Debug("scope response:", out)
	return
}

// TODO: superUser scope validation
func (s *CommandService) SuperUser(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName, executedBy string,
	scopes model.ScopesModel) (out string, err error) {
	var (
		action         string
		users          []string
		currentUsers   model.UsersModel
		publicScope, _ = scopes.GetByName(model.ScopePublic)
	)

	if action, users, err = cmd.FromSuperUserCommand(); err != nil {
		return
	}

	switch action {
	case model.SuperUserActionList:
		if currentUsers, err = s.UserRepository.GetUsersByTeamID(ctx, teamID, repository.DefaultFilter()); err != nil {
			if errorLib.IsSame(err, errorLib.ErrorNotExist) {
				err = fmt.Errorf("No super user has been set!")
			}
			return
		}
		out = "Super User List\n\n" + currentUsers.Print()
		return
	case model.SuperUserActionShow:
		// TODO: if super admin mode, will GetScopesByTeamID only
		var userScopes model.ScopesModel
		if userScopes, err = s.ScopeRepository.GetScopesByTeamIDAndUserSlackID(ctx, teamID, users[0],
			repository.DefaultFilter()); err != nil {
			return
		}
		userScopes = append(model.ScopesModel{publicScope}, userScopes...)
		userName := userScopes.GetUserNameByUserReferenceID(users[0])

		out = "Access for " + userName + "\n\n"
		out += "Commands: "
		out += "\n" + userScopes.GetAllCommands().GetUnique().Print(botName, true)
		out += "\nScopes: "
		out += "\n" + userScopes.Print(true)
		return
	case model.SuperUserActionSet:
		if currentUsers, err = s.UserService.Set(ctx, executedBy, teamID, users); err != nil {
			return
		}
		out = "Successfully add super user\n\n" + currentUsers.Print()
		return
	case model.SuperUserActionDelete:
		if currentUsers, err = s.UserService.Delete(ctx, teamID, users); err != nil {
			return
		}
		out = "Successfully delete super user\n\n" + currentUsers.Print()
		return
	}
	logging.Logger(ctx).Debug("super user response:", out)
	return
}

func (s *CommandService) CustomCommand(ctx context.Context, cmd model.CommandModel) (out string, err error) {
	cukCommand := cmd.Options.ConvertCustomOptionsToCukCmd()
	out, err = s.Cuk(ctx, cukCommand)
	return
}

func (s *CommandService) ValidateInput(ctx context.Context, msg *string, teamID uuid.UUID, userSlackID string) (cmd model.CommandModel, scopes model.ScopesModel, err error) {
	*msg = strings.Replace(*msg, "\n", " ", -1)
	*msg = html.UnescapeString(*msg)
	stringSlice := strings.Split(*msg, " ")

	var (
		ok              bool
		defaultCommands = model.GetDefaultCommands()
		publicScope     model.ScopeModel
		commandName     = strings.ToLower(stringSlice[0])
	)

	if publicScope, err = s.ScopeRepository.GetOneScopeByName(ctx, teamID, model.ScopePublic); err != nil {
		return
	}
	// TODO: if super admin mode, will GetScopesByTeamID only
	if scopes, err = s.ScopeRepository.GetScopesByTeamIDAndUserSlackID(ctx, teamID, userSlackID,
		repository.DefaultFilter()); err != nil {
		return
	}
	scopes = append(model.ScopesModel{publicScope}, scopes...)
	if cmd, ok = defaultCommands[commandName]; ok {
		return
	}

	if cmd, err = scopes.GetAllCommands().GetOneByName(commandName); err != nil {
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
