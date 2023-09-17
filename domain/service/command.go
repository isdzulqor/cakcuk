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
	"cakcuk/utils/template"
	"context"
	"encoding/json"
	"html"
	"strings"
	"time"

	"fmt"
	"strconv"

	uuid "github.com/satori/go.uuid"
)

type CommandService struct {
	Config                 *config.Config                   `inject:""`
	CommandRepository      repository.CommandInterface      `inject:""`
	CommandGroupRepository repository.CommandGroupInterface `inject:""`
	ScopeRepository        repository.ScopeInterface        `inject:""`
	UserRepository         repository.UserInterface         `inject:""`
	ScopeService           *ScopeService                    `inject:""`
	TeamService            *TeamService                     `inject:""`
	UserService            *UserService                     `inject:""`
	ConsoleService         *ConsoleService                  `inject:""`
	SlackbotService        *SlackbotService                 `inject:""`
}

func (s *CommandService) Prepare(ctx context.Context, textInput, userReferenceID, teamReferenceID string,
	botName, source string, channelRef string, teamInfo *model.TeamModel) (out model.CommandResponseModel, err error) {
	out.Source = source
	if stringLib.IsEmpty(textInput) {
		slackStartedMsg := strings.ReplaceAll(model.SlackStartedMessage, "https://cakcuk.io/play", s.Config.Site.PlayPage)
		err = fmt.Errorf(slackStartedMsg)
		return
	}
	if teamInfo == nil {
		if out.Team, err = s.TeamService.GetTeamInfo(ctx, teamReferenceID); err != nil {
			return
		}
	} else {
		out.Team = *teamInfo
	}

	if out.Command, out.Scopes, out.IsHelp, err = s.ValidateInput(ctx, &textInput, out.Team.ID, userReferenceID, out.Source, channelRef); err != nil {
		return
	}

	if out.IsHelp {
		commandName := &out.Command.Name
		if out.Message, err = s.Help(ctx, out.Command, out.Team.ID, botName, out.Scopes, commandName); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
		return
	}

	if out.Command.Name == model.CommandCakGroup {
		if err = out.Command.ExtractFromCakGroup(&textInput); err != nil {
			err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
			return
		}
	} else {
		if out.Command.CommandChildren != nil && len(out.Command.CommandChildren) > 0 {
			// command group extraction
			for i, cmdChild := range out.Command.CommandChildren {
				err = cmdChild.Extract(&textInput)
				if err != nil {
					err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
					return
				}
				cmdChild.CommandChildren = nil
				out.Command.CommandChildren[i] = cmdChild
			}
		} else {
			if err = out.Command.Extract(&textInput); err != nil {
				err = errorLib.ErrorExtractCommand.AppendMessage(err.Error())
				return
			}
		}
	}

	out.IsFileOutput, out.IsPrintOption, out.IsNoParse, out.IsNoResponse, out.FilterLike = out.Command.ExtractGlobalDefaultOptions()
	return
}

func (s *CommandService) Exec(ctx context.Context, in model.CommandResponseModel, botName, executedBy, channelRef string) (out model.CommandResponseModel, err error) {
	out = in
	switch out.Command.Name {
	case model.CommandHelp:
		if out.Message, err = s.Help(ctx, out.Command, out.Team.ID, botName, out.Scopes, nil); err != nil {
			err = errorLib.ErrorHelp.AppendMessage(err.Error())
		}
	case model.CommandCuk:
		out.Message, out.DumpRequest, out.RawResponse, err = s.Cuk(ctx, out.Command)
	case model.CommandCak:
		var newCreatedCommand model.CommandModel
		if out.Message, newCreatedCommand, err = s.Cak(ctx, out.Command, out.Team.ID, botName, executedBy, out.Scopes); err != nil {
			err = errorLib.ErrorCak.AppendMessage(err.Error())
		}
		if err == nil {
			out.ObjectedCommands = model.CommandsModel{newCreatedCommand}
		}
	case model.CommandDel:
		if out.Message, out.ObjectedCommands, err = s.Del(ctx, out.Command, out.Team.ID, botName, out.Scopes); err != nil {
			err = errorLib.ErrorDel.AppendMessage("You may not have access to delete the command")
		}
	case model.CommandScope:
		if out.Message, err = s.Scope(ctx, out.Command, out.Team, botName, executedBy, in.Source, out.Scopes); err != nil {
			err = errorLib.ErrorScope.AppendMessage(err.Error())
		}
	case model.CommandSuperUser:
		if out.Message, err = s.SuperUser(ctx, out.Command, out.Team, botName, executedBy, in.Source, out.Scopes); err != nil {
			err = errorLib.ErrorSuperUser.AppendMessage(err.Error())
		}
	case model.CommandConsole:
		if out.Message, err = s.Console(ctx, executedBy, channelRef, out.Team); err != nil {
			err = errorLib.ErrorSuperUser.AppendMessage(err.Error())
		}
	case model.CommandCakGroup:
		var newCreatedCommand model.CommandModel
		if out.Message, newCreatedCommand, err = s.CakGroup(ctx, InputCakGroup{
			cmd:        out.Command,
			teamID:     out.Team.ID,
			botName:    botName,
			executedBy: executedBy,
			scopes:     out.Scopes,
		}); err != nil {
			err = errorLib.ErrorCakGroup.AppendMessage(err.Error())
		}
		if err == nil {
			out.ObjectedCommands = model.CommandsModel{newCreatedCommand}
		}
	default:
		if out.Message, out.DumpRequest, out.RawResponse, err = s.CustomCommand(ctx, out.Command); err != nil {
			err = errorLib.ErrorCustomCommand.AppendMessage(err.Error())
		}
	}
	if out.FilterLike != "" {
		out.Message = stringLib.Filter(out.Message, out.FilterLike, false)
	}
	return
}

// Console will return the presigned URL to access the Web Console
// and send the password via DM
func (s *CommandService) Console(ctx context.Context, executedBy, channelRef string, teamInfo model.TeamModel) (string, error) {
	authSign, err := model.CreateAuthSign(executedBy, teamInfo.ReferenceID, channelRef, s.Config.Console.AuthSignExpirationTime)
	if err != nil {
		return "", fmt.Errorf("failed to create auth sign: %s", err.Error())
	}

	token := s.Config.Slack.Token

	encryptedAuthSign, err := authSign.Encrypt(s.Config.EncryptionPassword)
	if err != nil {
		return "", fmt.Errorf("failed to encrypt auth sign: %s", err.Error())
	}
	presignedURL := fmt.Sprintf("%s/#/console?auth_sign=%s", s.Config.Site.LandingPage, encryptedAuthSign)

	msg := fmt.Sprintf("Please open the following link to access the Console\n\n%s\n\nGet the password from the Private Message.", presignedURL)

	go func() {
		// Send Password via DM
		// the password used by the user to access the Web Console
		msgPassword := fmt.Sprintf("Your console password is: `%s`", authSign.Password)
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		err = s.SlackbotService.PostSlackMsg(ctx, &token, executedBy, msgPassword, nil)
		if err != nil {
			logging.Logger(ctx).Warnf("failed to send password to user: %s", err.Error())
		}
	}()

	return msg, nil
}

func (s *CommandService) Help(ctx context.Context, cmd model.CommandModel, teamID uuid.UUID, botName string, scopes model.ScopesModel, commandName *string) (out string, err error) {
	var (
		opt  model.OptionModel
		cmds = model.GetSortedDefaultCommands()
	)
	cmds.Append(scopes.GetAllCommands().GetUnique().MergeCommandGroup()...)
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
		out = fmt.Sprintf("%s", cmd.PrintWithDescription(botName, isOneLine))

		logging.Logger(ctx).Debug("help response:", out)
		return
	}

	out = fmt.Sprintf("%s", cmds.Print(botName, isOneLine))

	logging.Logger(ctx).Debug("help response:", out)
	return
}

func (s *CommandService) Cuk(ctx context.Context, cmd model.CommandModel) (out, dumpRequest, rawResponse string, err error) {
	outputCukCommand := cmd.FromCukCommand()
	var response, tempDumpRequest []byte
	if outputCukCommand.WithSSHID != "" {
		var sshConfig *model.SSH
		sshConfig, err = s.ConsoleService.GetSSHByID(ctx, outputCukCommand.WithSSHID)
		if err != nil {
			err = fmt.Errorf("unable to get ssh config: %v", err)
			return
		}

		// perform HTTPs request with SSH tunnel
		response, tempDumpRequest, err = requestLib.RequestWithSSH(ctx, requestLib.InputRequestWithSSH{
			InputRequest: requestLib.InputRequest{
				Method:      outputCukCommand.HttpMethod,
				Url:         outputCukCommand.BaseURL,
				QueryParams: outputCukCommand.QueryParam,
				Body:        outputCukCommand.Body,
				Headers:     outputCukCommand.Headers,
				IsDump:      true,
			},
			InputWithSSH: requestLib.InputWithSSH{
				Host:     sshConfig.Host,
				Port:     sshConfig.Port,
				Username: sshConfig.Username,
				Password: sshConfig.Password,
				SSHKey:   sshConfig.SSHKey,
			},
		})
		if err != nil {
			err = fmt.Errorf("unable to request with ssh: %v", err)
			return
		}
	} else {
		if response, tempDumpRequest, err = requestLib.RequestWithUnescapeUnicode(ctx, outputCukCommand.HttpMethod,
			outputCukCommand.BaseURL, outputCukCommand.QueryParam, outputCukCommand.Headers, outputCukCommand.Body, true); err != nil {
			return
		}
	}

	dumpRequest = string(tempDumpRequest)
	rawResponse = string(response)

	_, _, isNoParse, _, _ := cmd.ExtractGlobalDefaultOptions()

	if outputCukCommand.TemplateResponse != "" && !isNoParse {
		if jsonLib.IsJson(rawResponse) {
			out, err = template.Render(outputCukCommand.TemplateResponse, response)
			return
		}
	}

	out = rawResponse
	if jsonLib.IsJson(rawResponse) {
		var errPretty error
		if out, errPretty = jsonLib.ToPretty(response); errPretty != nil {
			logging.Logger(ctx).Warnf("pretty string response, err: %v", errPretty)
			out = fmt.Sprintf("%s", response)
		}
	}
	logging.Logger(ctx).Debug("response:", out)
	return
}

// TODO: fix issue
func (s *CommandService) CakGroup(ctx context.Context, input InputCakGroup) (out string, newCmd model.CommandModel, err error) {
	var parentCmd model.CommandModel
	groupName, err := input.cmd.Options.GetOptionValue(model.OptionCommand)
	if err != nil || groupName == "" {
		groupName, err := input.cmd.Options.GetOptionValue(model.ShortOptionCommand)
		if err != nil || groupName == "" {
			err = fmt.Errorf("Failed to create command group: %v", err)
			return "", newCmd, err
		}
	}

	// TODO: handle with transaction
	cleanUpFunc := func(groupName string, parentCmd model.CommandModel) {
		// TODO: handle with transaction
		newCtx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		go s.CommandGroupRepository.DeleteCommandGroupByName(newCtx, groupName)
		go s.CommandRepository.DeleteCommands(newCtx, model.CommandsModel{parentCmd})
	}

	for i, cmdChild := range input.cmd.CommandChildren {
		cmdChild.GroupName = groupName
		// for now, it will no handled by transaction
		// TODO: transaction
		_, newCmd, err = s.Cak(ctx, cmdChild, input.teamID, input.botName, input.executedBy, input.scopes)
		if err != nil {
			go cleanUpFunc(groupName, parentCmd)
			err = fmt.Errorf("Failed to create command group: %v", err)
			return
		}
		if i == 0 {
			parentCmd = newCmd
			parentCmd.Name = newCmd.GroupName
		} else {
			parentCmd.Options = append(parentCmd.Options, newCmd.Options...)
		}
		parentCmd.AppendCommandChildren(newCmd)

		label, _ := newCmd.Options.GetOptionValue(model.OptionLabel)
		inputCG := model.CommandGroup{
			GroupName: groupName,
			CommandID: newCmd.ID,
			TeamID:    input.teamID,
		}
		if label != "" {
			inputCG.Label = &label
		}

		// insert new command group
		// TODO: handle with transaction
		err = s.CommandGroupRepository.InsertCommandGroup(ctx, inputCG)
		if err != nil {
			go cleanUpFunc(groupName, parentCmd)
			err = fmt.Errorf("Failed to create command group: %v", err)
			return
		}
	}
	newCmd = parentCmd
	out = fmt.Sprintf("New Command Group Created\n\n%s\n", newCmd.PrintWithDescription(botName, false))
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
			err = fmt.Errorf("Command %v. Try `%s` to force update. Or delete it first with `del` command.", err, model.OptionUpdate)
			return
		}
		err = fmt.Errorf("Command for `%s` %v", newCmd.Name, err)
		return
	}

	out = fmt.Sprintf("New Command Created\n\n%s\n", newCmd.PrintWithDescription(botName, false))
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
func (s *CommandService) Scope(ctx context.Context, cmd model.CommandModel, teamInfo model.TeamModel, botName, executedBy, source string, scopes model.ScopesModel) (out string, err error) {
	var (
		action, scopeName                string
		users, commandNames, channelRefs []string
		isOneLine                        bool
		currentScope                     model.ScopeModel
		commands                         model.CommandsModel
		allCommands                      = scopes.GetAllCommands()
	)

	if action, scopeName, users, channelRefs, commandNames, isOneLine, err = cmd.FromScopeCommand(source); err != nil {
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
		if currentScope, err = s.ScopeService.Create(ctx, scopeName, executedBy, source, teamInfo, users, commands, channelRefs); err != nil {
			if err == errorLib.ErrorAlreadyExists {
				err = fmt.Errorf("`%s` scope already exists", scopeName)
			}
			return
		}
		out = fmt.Sprintf("Successfully create scope\n\n")
		out += currentScope.Print(false)
		if source == model.SourcePlayground {
			go s.ScopeService.DeleteWithTimeout(ctx, &s.Config.Playground.DeletionTime, currentScope)
		}
		return
	case model.ScopeActionUpdate:
		if currentScope, err = s.ScopeService.Update(ctx, executedBy, source, currentScope, teamInfo, users, commands, channelRefs); err != nil {
			return
		}
		out = fmt.Sprintf("Successfully update scope\n\n")
		out += currentScope.Print(false)
		if source == model.SourcePlayground {
			go s.ScopeService.DeleteWithTimeout(ctx, &s.Config.Playground.DeletionTime, currentScope)
		}
		return
	case model.ScopeActionDelete:
		var deleteType string
		if currentScope, deleteType, err = s.ScopeService.Delete(ctx, executedBy, source, currentScope, teamInfo, users, commands, channelRefs); err != nil {
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
func (s *CommandService) SuperUser(ctx context.Context, cmd model.CommandModel, teamInfo model.TeamModel, botName, executedBy, source string,
	scopes model.ScopesModel) (out string, err error) {
	var (
		action         string
		users          []string
		currentUsers   model.UsersModel
		publicScope, _ = scopes.GetByName(model.ScopePublic)
		isFirstSet     bool
	)

	if action, users, err = cmd.FromSuperUserCommand(); err != nil {
		return
	}

	if isFirstSet, err = s.UserService.Validate(ctx, action, executedBy, teamInfo.ID); err != nil {
		return
	}

	switch action {
	case model.SuperUserActionList:
		if currentUsers, err = s.UserRepository.GetUsersByTeamID(ctx, teamInfo.ID, repository.DefaultFilter()); err != nil {
			if err == errorLib.ErrorNotExist {
				out = fmt.Sprint("No Superuser has been set, need to set Superuser first by using `set` option")
				err = nil
			}
			return
		}
		out = "Superuser List\n\n" + currentUsers.Print()
		return
	case model.SuperUserActionShow:
		var userScopes model.ScopesModel
		if userScopes, err = s.ScopeRepository.GetScopesByTeamIDAndUserReferenceID(ctx, teamInfo.ID, users[0],
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
		if currentUsers, err = s.UserService.Set(ctx, executedBy, source, teamInfo, users, isFirstSet); err != nil {
			return
		}
		out = "Successfully add Superuser\n\n" + currentUsers.Print()
		if source == model.SourcePlayground {
			go s.UserService.DeleteWithTimeout(ctx, &s.Config.Playground.DeletionTime, currentUsers...)
		}
		return
	case model.SuperUserActionDelete:
		if currentUsers, err = s.UserService.Delete(ctx, teamInfo.ID, users); err != nil {
			return
		}
		out = "Successfully delete Superuser for:\n\n" + currentUsers.Print()
		return
	}
	logging.Logger(ctx).Debug("Superuser response:", out)
	return
}

func (s *CommandService) CustomCommand(ctx context.Context, cmd model.CommandModel) (out, dumpRequest, rawResponse string, err error) {
	if cmd.CommandChildren != nil && len(cmd.CommandChildren) > 0 {
		labelsMap := map[string]interface{}{}

		// command group execution
		for _, cmdChild := range cmd.CommandChildren {
			if cmdChild.Name == cmd.GroupName {
				// currently there's an issue caused by this
				// for now will be tackled by this block code
				// TODO: find root cause
				continue
			}

			if len(labelsMap) > 0 {
				// indicate that the command group use label feature
				// example of the label map:
				// {
				// 	"label": {
				// 		"label_name": {
				// 			"data": {
				// 				"login": {
				// 					"token": "random-token"
				// 				}
				// 			}
				// 		},
				// 		"another_label_name": {
				// 			"response_message": "halo"
				// 		}
				// 	}
				// }
				err = cmdChild.RefreshOptionValuesWithLabel(map[string]interface{}{
					"label": labelsMap,
				})
				if err != nil {
					err = fmt.Errorf("Failed to execute command group: %v", err)
					return out, dumpRequest, rawResponse, err
				}
			}

			cukCommand := cmdChild.Options.ConvertCustomOptionsToCukCmd()
			tempOut, tempDumpRequest, tempRawResponse, err := s.Cuk(ctx, cukCommand)
			if err != nil {
				err = fmt.Errorf("Failed to execute command group: %v", err)
				return out, dumpRequest, rawResponse, err
			}

			// for now the label value just retrieved from the option
			// it's able to be retrieved from `CommandGroup.label` SQL table
			label, _ := cmdChild.Options.GetOptionValue(model.OptionLabel)
			if label != "" {
				var b interface{}
				// ignore error for now
				json.Unmarshal([]byte(tempOut), &b)
				labelsMap[label] = b
			}

			// TODO: handle global default options
			_, _, _, isNoResponse, _ := cmdChild.ExtractGlobalDefaultOptions()
			if !isNoResponse {
				if out != "" {
					out += "\n"
				}
				out += tempOut
			}
			if dumpRequest != "" {
				dumpRequest += "\n"
				dumpRequest += tempDumpRequest
			}
			if rawResponse != "" {
				rawResponse += "\n"
				rawResponse += tempRawResponse
			}
		}

		return
	}
	cukCommand := cmd.Options.ConvertCustomOptionsToCukCmd()
	out, dumpRequest, rawResponse, err = s.Cuk(ctx, cukCommand)
	return
}

func (s *CommandService) ValidateInput(ctx context.Context, msg *string, teamID uuid.UUID, userReferenceID, source, channelRef string) (cmd model.CommandModel, scopes model.ScopesModel, isHelp bool, err error) {
	*msg = strings.Replace(*msg, "\n", " ", -1)
	*msg = html.UnescapeString(*msg)
	stringSlice := strings.Split(*msg, " ")

	var (
		ok              bool
		scopeName       string
		defaultCommands = model.GetDefaultCommands()
		publicScope     model.ScopeModel
		commandName     = strings.ToLower(stringSlice[0])
	)

	_, isDefaultCmd := defaultCommands[commandName]
	if !isDefaultCmd {
		isEligible := false
		isEligible, err = s.ScopeRepository.CheckUserCanAccess(ctx, teamID, userReferenceID, commandName, channelRef)
		if err != nil {
			return
		}
		if !isEligible {
			err = fmt.Errorf("You are not eligible for `%s` command", commandName)
			return
		}
	}

	if _, err = s.UserRepository.GetUserOneByReferenceID(ctx, teamID, userReferenceID); err != nil &&
		err == errorLib.ErrorNotExist && source != model.SourcePlayground {
		// not Superuser
		if scopes, err = s.ScopeRepository.GetScopesByTeamIDAndUserReferenceID(ctx, teamID, userReferenceID,
			repository.DefaultFilter()); err != nil {
			return
		}

		if publicScope, err = s.ScopeRepository.GetOneScopeByName(ctx, teamID, model.ScopePublic); err != nil {
			return
		}
		scopes = append(model.ScopesModel{publicScope}, scopes...)
	} else {
		// Superuser or playground
		if scopes, err = s.ScopeRepository.GetScopesByTeamID(ctx, teamID); err != nil {
			return
		}
	}

	isHelp = strings.Contains(*msg, model.OptionHelp) || strings.Contains(*msg, model.ShortOptionHelp+" ")
	if cmd, ok = defaultCommands[commandName]; ok {
		return
	}

	// get scope inputted by user if it's there
	if strings.Contains(*msg, model.OptionScope) {
		scopeName = stringLib.StringAfter(*msg, model.OptionScope+"=")
	}
	if strings.Contains(*msg, model.ShortOptionScope) {
		scopeName = stringLib.StringAfter(*msg, model.ShortOptionScope+"=")
	}
	if temp := strings.Split(scopeName, " "); len(temp) > 0 {
		scopeName = temp[0]
	}

	if scopeName != "" {
		tempScope, errScope := scopes.GetByName(scopeName)
		if errScope != nil {
			err = fmt.Errorf("Scope for `%s` is not in your scope list. Try `%s @cakcuk` for listing scope",
				scopeName, model.CommandScope)
			return
		}
		if cmd, err = tempScope.Commands.GetOneByName(commandName); err != nil {
			err = fmt.Errorf("Command for `%s` is unregistered. Try `%s` for creating new command. `%s %s=%s` for details.",
				stringSlice[0], model.CommandCak, model.CommandHelp, model.OptionCommand, model.CommandCak)
		}
		cmd.Options.Append(model.OptionScopeValue)
		return
	}

	if cmd, err = scopes.GetAllCommands().MergeCommandGroup().GetOneByName(commandName); err != nil {
		err = fmt.Errorf("Command for `%s` is unregistered. Try `%s` for creating new command. `%s %s=%s` for details.",
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
