package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	errorLib "cakcuk/utils/errors"
	jsonLib "cakcuk/utils/json"
	"cakcuk/utils/logging"
	requestLib "cakcuk/utils/request"
	stringLib "cakcuk/utils/string"
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
	TeamService       *TeamService                `inject:""`
	UserService       *UserService                `inject:""`
}

func (s *CommandService) Prepare(ctx context.Context, textInput, userReferenceID, teamReferenceID string,
	botName string) (out model.CommandResponseModel, err error) {
	if stringLib.IsEmpty(textInput) {
		err = fmt.Errorf("Try `%s @%s` for details. Visit playground %s/play to explore more!",
			model.CommandHelp, botName, s.Config.Site.LandingPage)
		return
	}
	if out.Team, err = s.TeamService.GetTeamInfo(ctx, teamReferenceID); err != nil {
		return
	}
	if out.Command, out.Scopes, out.IsHelp, err = s.ValidateInput(ctx, &textInput, out.Team.ID, userReferenceID); err != nil {
		return
	}
	if out.IsHelp {
		commandName := &out.Command.Name
		if out.Message, err = s.Help(ctx, out.Command, out.Team.ID, botName, out.Scopes, commandName); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
		return
	}

	if err = out.Command.Extract(&textInput); err != nil {
		err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
		return
	}
	out.IsFileOutput, out.IsPrintOption, out.IsNoParse, out.FilterLike = out.Command.ExtractGlobalDefaultOptions()
	return
}

func (s *CommandService) Exec(ctx context.Context, in model.CommandResponseModel, botName, executedBy string) (out model.CommandResponseModel, err error) {
	out = in
	switch out.Command.Name {
	case model.CommandHelp:
		if out.Message, err = s.Help(ctx, out.Command, out.Team.ID, botName, out.Scopes, nil); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
	case model.CommandCuk:
		out.Message, err = s.Cuk(ctx, out.Command)
	case model.CommandCak:
		if out.Message, _, err = s.Cak(ctx, out.Command, out.Team.ID, botName, executedBy, out.Scopes); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
		}
	case model.CommandDel:
		if out.Message, _, err = s.Del(ctx, out.Command, out.Team.ID, botName, out.Scopes); err != nil {
			err = errorLib.ErrorDel.AppendMessage(err.Error())
		}
	case model.CommandScope:
		if out.Message, err = s.Scope(ctx, out.Command, out.Team.ID, botName, executedBy, out.Scopes); err != nil {
			err = errorLib.ErrorScope.AppendMessage(err.Error())
		}
	case model.CommandSuperUser:
		if out.Message, err = s.SuperUser(ctx, out.Command, out.Team.ID, botName, executedBy, out.Scopes); err != nil {
			err = errorLib.ErrorSuperUser.AppendMessage(err.Error())
		}
	default:
		if out.Message, err = s.CustomCommand(ctx, out.Command); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
		}
	}
	if out.FilterLike != "" {
		out.Message = stringLib.Filter(out.Message, out.FilterLike, false)
	}
	return
}

func (s *CommandService) Help(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName string, scopes model.ScopesModel, commandName *string) (out string, err error) {
	var (
		opt  model.OptionModel
		cmds = model.GetSortedDefaultCommands()
	)
	cmds.Append(scopes.GetAllCommands().GetUnique()...)

	opt, _ = cmd.Options.GetOptionByName(model.OptionOneLine)
	isOneLine, _ := strconv.ParseBool(opt.Value)

	opt, _ = cmd.Options.GetOptionByName(model.OptionCommand)
	if cmd.Name == model.CommandHelp && opt.Value != "" {
		commandName = &opt.Value
	}
	if commandName != nil {
		if cmd, err = cmds.GetOneByName(*commandName); err != nil {
			err = fmt.Errorf("Command for `%s` %s. `%s %s @%s` to show existing commands.", *commandName, err,
				model.CommandHelp, model.OptionOneLine, botName)
			return
		}
		out = fmt.Sprintf("\n%s", cmd.PrintWithDescription(botName, isOneLine))

		logging.Logger(ctx).Debug("help response:", out)
		return
	}

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
		if err == errorLib.ErrorAlreadyExists {
			err = fmt.Errorf("Command for `%s` %v. Try `%s` to force update.", newCmd.Name, err, model.OptionUpdate)
			return
		}
		err = fmt.Errorf("Command for `%s` %v", newCmd.Name, err)
		return
	}

	out = fmt.Sprintf("\nNew Command Created\n\n%s\n", newCmd.PrintWithDescription(botName, false))
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

	// TODO: ScopeActionShowAll
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

	// TODO: ScopeActionList
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

	switch action {
	case model.ScopeActionShow:
		out = currentScope.Print(isOneLine)
		return
	case model.ScopeActionCreate:
		if currentScope, err = s.ScopeService.Create(ctx, scopeName, executedBy, teamID, users, commands); err != nil {
			return
		}
		out = fmt.Sprintf("Successfully create scope\n\n")
		out += currentScope.Print(false)
		return
	case model.ScopeActionUpdate:
		if currentScope, err = s.ScopeService.Update(ctx, executedBy, currentScope, teamID, users, commands); err != nil {
			return
		}
		out = fmt.Sprintf("Successfully update scope\n\n")
		out += currentScope.Print(false)
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
			if err == errorLib.ErrorNotExist {
				err = fmt.Errorf("No super user has been set!")
			}
			return
		}
		out = "Super User List\n\n" + currentUsers.Print()
		return
	case model.SuperUserActionShow:
		var userScopes model.ScopesModel
		if userScopes, err = s.ScopeRepository.GetScopesByTeamIDAndUserReferenceID(ctx, teamID, users[0],
			repository.DefaultFilter()); err != nil {
			return
		}
		userScopes = append(model.ScopesModel{publicScope}, userScopes...)

		// TODO: source | mention is based on source
		out = "Access for " + model.MentionSlack(users[0]) + "\n\n"
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

func (s *CommandService) ValidateInput(ctx context.Context, msg *string, teamID uuid.UUID, userReferenceID string) (cmd model.CommandModel, scopes model.ScopesModel, isHelp bool, err error) {
	*msg = strings.Replace(*msg, "\n", " ", -1)
	*msg = html.UnescapeString(*msg)
	stringSlice := strings.Split(*msg, " ")

	var (
		ok              bool
		defaultCommands = model.GetDefaultCommands()
		publicScope     model.ScopeModel
		commandName     = strings.ToLower(stringSlice[0])
	)

	if _, err = s.UserRepository.GetUserOneByReferenceID(ctx, teamID, userReferenceID); err != nil && err == errorLib.ErrorNotExist {
		// not super user
		if scopes, err = s.ScopeRepository.GetScopesByTeamIDAndUserReferenceID(ctx, teamID, userReferenceID,
			repository.DefaultFilter()); err != nil {
			return
		}
		if publicScope, err = s.ScopeRepository.GetOneScopeByName(ctx, teamID, model.ScopePublic); err != nil {
			return
		}
		scopes = append(model.ScopesModel{publicScope}, scopes...)
	} else {
		// super user
		if scopes, err = s.ScopeRepository.GetScopesByTeamID(ctx, teamID); err != nil {
			return
		}
	}

	isHelp = strings.Contains(*msg, model.OptionHelp) || strings.Contains(*msg, model.ShortOptionHelp+" ")

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
