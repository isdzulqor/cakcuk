package model

import (
	"cakcuk/config"
	jsonLib "cakcuk/utils/json"
	requestLib "cakcuk/utils/request"
	stringLib "cakcuk/utils/string"
	"fmt"
	"io"
	"net/url"
	"strconv"
	"strings"
	"time"

	uuid "github.com/satori/go.uuid"
)

const (
	Description = "description"
	Example     = "example"
	Mandatory   = "mandatory"
	Encrypted   = "encrypted"
	Multiple    = "multiple"

	CommandHelp      = "help"
	CommandCak       = "cak"
	CommandCuk       = "cuk"
	CommandDel       = "del"
	CommandScope     = "scope"
	CommandSuperUser = "su"

	Dynamic      = "Dynamic"
	ShortDynamic = "d"

	OptionCommand           = "--command"
	OptionOneLine           = "--oneline"
	OptionOutputFile        = "--outputFile"
	OptionPrintOptions      = "--printOptions"
	OptionMethod            = "--method"
	OptionURL               = "--url"
	OptionBasicAuth         = "--basicAuth"
	OptionHeaders           = "--headers"
	OptionQueryParams       = "--queryParams"
	OptionURLParams         = "--urlParams"
	OptionBodyParams        = "--bodyParams"
	OptionParseResponse     = "--parseResponse"
	OptionDescription       = "--description"
	OptionUpdate            = "--update"
	OptionFilter            = "--filter"
	OptionHelp              = "--help"
	OptionNoParse           = "--noParse"
	OptionShow              = "--show"
	OptionCreate            = "--create"
	OptionUser              = "--user"
	OptionDel               = "--del"
	OptionScope             = "--scope"
	OptionSet               = "--set"
	OptionBodyJSON          = "--bodyJson"
	OptionBodyURLEncode     = "--bodyUrlEncode"
	OptionBodyFormMultipart = "--bodyFormMultipart"

	OptionHeadersDynamic           = OptionHeaders + Dynamic
	OptionQueryParamsDynamic       = OptionQueryParams + Dynamic
	OptionURLParamsDynamic         = OptionURLParams + Dynamic
	OptionBodyURLEncodeDynamic     = OptionBodyURLEncode + Dynamic
	OptionBodyFormMultipartDynamic = OptionBodyFormMultipart + Dynamic

	ShortOptionCommand           = "-c"
	ShortOptionOneLine           = "-ol"
	ShortOptionOutputFile        = "-of"
	ShortOptionPrintOptions      = "-po"
	ShortOptionMethod            = "-m"
	ShortOptionURL               = "-u"
	ShortOptionBasicAuth         = "-ba"
	ShortOptionHeaders           = "-h"
	ShortOptionQueryParams       = "-qp"
	ShortOptionURLParams         = "-up"
	ShortOptionBodyParams        = "-bp"
	ShortOptionParseResponse     = "-pr"
	ShortOptionDescription       = "-d"
	ShortOptionHelp              = OptionHelp
	ShortOptionUpdate            = OptionUpdate
	ShortOptionFilter            = "-f"
	ShortOptionNoParse           = "-np"
	ShortOptionShow              = "-s"
	ShortOptionCreate            = "-cr"
	ShortOptionUser              = "-u"
	ShortOptionDel               = "-d"
	ShortOptionScope             = "-sc"
	ShortOptionSet               = OptionSet
	ShortOptionBodyJSON          = "-bj"
	ShortOptionBodyURLEncode     = "-bue"
	ShortOptionBodyFormMultipart = "-bfm"

	ShortOptionHeadersDynamic           = ShortOptionHeaders + ShortDynamic
	ShortOptionQueryParamsDynamic       = ShortOptionQueryParams + ShortDynamic
	ShortOptionURLParamsDynamic         = ShortOptionURLParams + ShortDynamic
	ShortOptionBodyURLEncodeDynamic     = ShortOptionBodyURLEncode + ShortDynamic
	ShortOptionBodyFormMultipartDynamic = ShortOptionBodyFormMultipart + ShortDynamic

	MultipleValueSeparator = "&&"

	// TODO:
	ScopeActionShowAll = "show_all"
	ScopeActionList    = "list"

	ScopeActionShow   = "show"
	ScopeActionCreate = "create"
	ScopeActionUpdate = "update"
	ScopeActionDelete = "delete"

	SuperUserActionList   = "list"
	SuperUserActionSet    = "set"
	SuperUserActionShow   = "show"
	SuperUserActionDelete = "delete"
)

var (
	DefaultOptionNames = []string{
		OptionCommand,
		OptionOneLine,
		OptionOutputFile,
		OptionPrintOptions,
		OptionMethod,
		OptionURL,
		OptionBasicAuth,
		OptionHeaders,
		OptionQueryParams,
		OptionURLParams,
		OptionBodyParams,
		OptionParseResponse,
		OptionDescription,
		OptionHeadersDynamic,
		OptionQueryParamsDynamic,
		OptionURLParamsDynamic,
		OptionUpdate,
		OptionFilter,
		OptionNoParse,
		OptionHelp,
		OptionBodyJSON,
		OptionBodyURLEncode,
		OptionBodyFormMultipart,
		OptionBodyURLEncodeDynamic,
		OptionBodyFormMultipartDynamic,
	}

	DefaultShortOptionNames = []string{
		ShortOptionCommand,
		ShortOptionOneLine,
		ShortOptionOutputFile,
		ShortOptionPrintOptions,
		ShortOptionMethod,
		ShortOptionURL,
		ShortOptionBasicAuth,
		ShortOptionHeaders,
		ShortOptionQueryParams,
		ShortOptionURLParams,
		ShortOptionBodyParams,
		ShortOptionParseResponse,
		ShortOptionDescription,
		ShortOptionHeadersDynamic,
		ShortOptionQueryParamsDynamic,
		ShortOptionURLParamsDynamic,
		ShortOptionUpdate,
		ShortOptionFilter,
		ShortOptionNoParse,
		ShortOptionHelp,
		ShortOptionBodyJSON,
		ShortOptionBodyURLEncode,
		ShortOptionBodyFormMultipart,
		ShortOptionBodyURLEncodeDynamic,
		ShortOptionBodyFormMultipartDynamic,
	}

	GlobalDefaultOptions = OptionsModel{
		OptionModel{
			Name:            OptionOutputFile,
			ShortName:       ShortOptionOutputFile,
			Description:     "print output data into file",
			IsSingleOption:  true,
			IsMandatory:     false,
			IsMultipleValue: false,
			Example:         OptionOutputFile,
		},
		OptionModel{
			Name:            OptionPrintOptions,
			ShortName:       ShortOptionPrintOptions,
			Description:     "print detail options when executing command",
			IsSingleOption:  true,
			IsMandatory:     false,
			IsMultipleValue: false,
			Example:         OptionPrintOptions,
		},
		OptionModel{
			Name:            OptionFilter,
			ShortName:       ShortOptionFilter,
			Description:     "filter output, grep like in terminal",
			IsSingleOption:  false,
			IsMandatory:     false,
			IsMultipleValue: false,
			Example:         OptionFilter + "=show",
		},
	}
)

// CommandModel represents command attribute
type CommandModel struct {
	ID                 uuid.UUID `json:"id" db:"id"`
	TeamID             uuid.UUID `json:"teamID" db:"teamID"`
	Name               string    `json:"name" db:"name"`
	Description        string    `json:"description" db:"description"`
	Example            string    `json:"example" db:"example"`
	CompleteDesciption *string   `json:"completeDescription" db:"completeDescription"`
	IsDefaultCommand   bool      `json:"isDefaultCommand"`
	Created            time.Time `json:"created" db:"created"`
	CreatedBy          string    `json:"createdBy" db:"createdBy"`

	Options        OptionsModel        `json:"options"`
	CommandDetails CommandDetailsModel `json:"commandDetails"`
}

func (c *CommandModel) Create(in CommandModel, botName, createdBy string, teamID uuid.UUID, scopes ScopesModel) {
	c.ID = uuid.NewV4()
	c.TeamID = teamID
	c.CreatedBy = createdBy
	c.Options.Create(createdBy, c.ID)
	c.CommandDetails.Create(c.ID, createdBy, scopes.GetIDs()...)
}

func (c *CommandModel) ReduceCommandDetail(scopes ScopesModel) (deletedCommandDetails CommandDetailsModel, err error) {
	for _, scope := range scopes {
		if deleted, err := c.CommandDetails.RemoveByScopeID(scope.ID); err == nil {
			deletedCommandDetails = append(deletedCommandDetails, deleted...)
		}
	}
	if len(deletedCommandDetails) == 0 {
		err = fmt.Errorf("No commandDetail for command %s that contains scope in %s to be deleted", c.Name, strings.Join(scopes.GetNames(), ", "))
	}
	return
}

func (c *CommandModel) FromCakCommand(in CommandModel, botName string) (isUpdate bool, scopeNames []string, err error) {
	for _, tempOpt := range in.Options {
		switch tempOpt.Name {
		case OptionCommand:
			if ContainsDefaultCommands(tempOpt.Value) {
				err = fmt.Errorf("`%s` is default command. Try `%s %s=%s @%s`.",
					tempOpt.Value, CommandHelp, OptionCommand, CommandCak, botName)
				return
			}
			c.Name = tempOpt.Value
			continue
		case OptionDescription:
			c.Description = tempOpt.Value
			continue
		case OptionScope:
			if tempOpt.Value != "" {
				scopeNames = tempOpt.GetMultipleValues()
				continue
			}
		case OptionOutputFile, OptionPrintOptions, OptionURL, OptionQueryParams,
			OptionBodyJSON, OptionBodyURLEncode, OptionBodyFormMultipart,
			OptionURLParams, OptionMethod, OptionBasicAuth,
			OptionHeaders, OptionParseResponse, OptionFilter, OptionNoParse:
			tempOpt.IsHidden = true
		case OptionUpdate:
			isUpdate = strings.ToLower(tempOpt.Value) == "true"
			continue
		case OptionBodyParams:
			if strings.ToUpper(tempOpt.DefaultValue) == "GET" || strings.ToUpper(tempOpt.Value) == "GET" {
				tempOpt.IsHidden = true
			}
			if strings.ToUpper(tempOpt.DefaultValue) == "" && strings.ToUpper(tempOpt.Value) == "" {
				tempOpt.IsHidden = true
			}
		}
		if tempOpt.IsDynamic {
			if tempOpt.Value != "" {
				var tempOpts OptionsModel
				if tempOpts, err = tempOpt.ConstructDynamic(tempOpt.Value); err != nil {
					return
				}
				c.Options.Append(tempOpts...)
			}
			continue
		}
		tempOpt.SetDefaultValueFromValue()
		c.Options.Append(tempOpt)
	}
	c.GenerateExample(botName)
	return
}

func (c *CommandModel) FromDelCommand() (commandNames []string, err error) {
	for _, tempOpt := range c.Options {
		switch tempOpt.Name {
		case OptionCommand:
			commandNames = tempOpt.GetMultipleValues()
			if ContainsDefaultCommands(commandNames...) {
				err = fmt.Errorf("Could not delete default commands.")
				return
			}
		}
	}
	if len(commandNames) == 0 {
		err = fmt.Errorf("command Could not be empty.")
	}
	return
}

func (c *CommandModel) FromScopeCommand() (action, scopeName string, users, commandNames []string, isOneLine bool, err error) {
	for _, tempOpt := range c.Options {
		if tempOpt.Value == "" {
			continue
		}
		switch tempOpt.Name {
		case OptionShow:
			scopeName = tempOpt.Value
			action = ScopeActionShow
		case OptionCreate:
			scopeName = tempOpt.Value
			action = ScopeActionCreate
		case OptionUpdate:
			scopeName = tempOpt.Value
			action = ScopeActionUpdate
		case OptionDel:
			scopeName = tempOpt.Value
			action = ScopeActionDelete
		case OptionUser:
			users = extractSlackIDs(tempOpt.GetMultipleValues())
		case OptionCommand:
			commandNames = tempOpt.GetMultipleValues()
		case OptionOneLine:
			isOneLine, _ = strconv.ParseBool(tempOpt.Value)
		}
	}
	return
}

func (c *CommandModel) FromSuperUserCommand() (action string, users []string, err error) {
	action = SuperUserActionList
	for _, tempOpt := range c.Options {
		if tempOpt.Value == "" {
			continue
		}
		switch tempOpt.Name {
		case OptionShow:
			action = SuperUserActionShow
		case OptionSet:
			action = SuperUserActionSet
		case OptionDel:
			action = SuperUserActionDelete
		default:
			err = fmt.Errorf("action of %s command need to be specified", CommandSuperUser)
			return
		}
		users = extractSlackIDs(tempOpt.GetMultipleValues())
	}
	return
}

func (c CommandModel) ExtractGlobalDefaultOptions() (isFileOutput, isPrintOption, isNoParse bool, filterLike string) {
	for _, tempOpt := range c.Options {
		switch tempOpt.Name {
		case OptionOutputFile:
			isFileOutput, _ = strconv.ParseBool(tempOpt.Value)
		case OptionNoParse:
			isNoParse, _ = strconv.ParseBool(tempOpt.Value)
		case OptionPrintOptions:
			isPrintOption, _ = strconv.ParseBool(tempOpt.Value)
		case OptionFilter:
			filterLike = tempOpt.Value
		}
	}
	return
}

func (c *CommandModel) FromCukCommand() (httpMethod, baseURL string, queryParams url.Values,
	headers map[string]string, body io.Reader) {
	urlParams := make(map[string]string)
	urlForms := make(url.Values)
	queryParams = make(url.Values)
	headers = make(map[string]string)

	for _, tempOpt := range c.Options {
		switch tempOpt.Name {
		case OptionMethod:
			httpMethod = tempOpt.Value
		case OptionURL:
			baseURL = tempOpt.Value
		case OptionHeaders:
			headers = tempOpt.AppendParamsMap(headers)
		case OptionQueryParams:
			queryParams = tempOpt.AppendURLValues(queryParams)
		case OptionURLParams:
			urlParams = tempOpt.AppendParamsMap(urlParams)
		case OptionBodyJSON:
			if tempOpt.Value != "" {
				headers["Content-Type"] = "application/json"
				body = stringLib.ToIoReader(tempOpt.Value)
			}
		// TODO:
		case OptionBodyFormMultipart:
			if tempOpt.Value != "" {
			}
		case OptionBodyURLEncode:
			if tempOpt.Value != "" {
				urlForms = tempOpt.AppendURLValues(urlForms)
				headers["Content-Type"] = "application/x-www-form-urlencoded"
				body = strings.NewReader(urlForms.Encode())
			}
		case OptionBodyParams:
			if tempOpt.Value != "" {
				body = stringLib.ToIoReader(tempOpt.Value)
				if _, ok := headers["Content-Type"]; !ok {
					headers["Content-Type"] = "text/plain"
					if jsonLib.IsJson(tempOpt.Value) {
						headers["Content-Type"] = "application/json"
					}
				}
			}
		case OptionBasicAuth:
			authValue := tempOpt.Value
			tempAuthValues := strings.Split(authValue, ":")
			if authValue != "" && len(tempAuthValues) > 1 {
				authValue = requestLib.GetBasicAuth(tempAuthValues[0], tempAuthValues[1])
				headers["Authorization"] = authValue
			}
		}
	}
	baseURL = requestLib.AssignUrlParams(baseURL, urlParams)
	return
}

func (c *CommandModel) GenerateExample(botName string) {
	var optionsExample string
	for _, o := range c.Options {
		if o.IsHidden {
			continue
		}
		if !o.IsCustom && o.Value != "" {
			continue
		}
		optionsExample += " " + o.Example
	}
	c.Example = c.Name + optionsExample + " @" + botName
	return
}

func (c CommandModel) Clone() CommandModel {
	c.Options = append(OptionsModel{}, c.Options...)
	c.CommandDetails = append(CommandDetailsModel{}, c.CommandDetails...)
	return c
}

func (c CommandModel) Print(botName string, isOneLine bool) string {
	if isOneLine {
		return fmt.Sprintf("- %s [options] @%s", c.Name, botName)
	}
	return c.printDetail(botName, false, isOneLine)
}

func (c CommandModel) PrintWithDescription(botName string, isOneLine bool) string {
	return c.printDetail(botName, true, isOneLine)
}

func (c CommandModel) printDetail(botName string, isCompleteDescription, isOneLine bool) (out string) {
	out = fmt.Sprintf("- %s [options] @%s\n\t%s\n\ti.e: %s", c.Name, botName, c.Description, c.Example)
	out += c.Options.Print(isOneLine)
	if !isOneLine {
		if isCompleteDescription && c.CompleteDesciption != nil {
			out = fmt.Sprintf("%sDescription\n%s", out, c.CompleteDesciption)
		}
	}
	return
}

// Extract to get options from user input
func (c *CommandModel) Extract(msg *string) (err error) {
	*msg = strings.TrimSpace(strings.Replace(*msg, c.Name, "", 1))
	*msg += " "
	if c.Options != nil {
		for i, opt := range c.Options {
			value := opt.ExtractValue(*c, *msg)
			if opt.IsMandatory && opt.Value == "" && value == "" {
				err = fmt.Errorf("Option for `%s` is mandatory! Try `%s %s=%s` for details.", opt.Name,
					CommandHelp, OptionCommand, c.Name)
				return
			}
			if value != "" {
				opt.Value = value
			}
			c.Options[i] = opt
		}
	}
	return
}

type CommandsModel []CommandModel

func (c CommandsModel) Print(botName string, isOneLine bool) (out string) {
	for _, cmd := range c {
		out += fmt.Sprintf("%s\n", cmd.Print(botName, isOneLine))
	}
	return
}

func (c CommandsModel) GetNames() (out []string) {
	for _, cmd := range c {
		out = append(out, cmd.Name)
	}
	return
}

func (c *CommandsModel) Merge(in CommandsModel) {
	for i, cmd := range *c {
		if temp, err := in.GetByID(cmd.ID); err == nil {
			cmd = temp
		}
		(*c)[i] = cmd
	}
	return
}

func (c *CommandsModel) Delete(in CommandsModel) {
	var newCommands CommandsModel
	for _, cmd := range *c {
		if _, err := in.GetByID(cmd.ID); err == nil {
			continue
		}
		newCommands = append(newCommands, cmd)
	}
	*c = newCommands
	return
}

func (c CommandsModel) GetByID(id uuid.UUID) (out CommandModel, err error) {
	for _, cmd := range c {
		if cmd.ID == id {
			out = cmd
			return
		}
	}
	err = fmt.Errorf("command id %s not found", id)
	return
}

func (c CommandsModel) GetByScopeID(scopeID uuid.UUID) (out CommandsModel) {
	for _, cmd := range c {
		if cmd.CommandDetails.ContainsScopeID(scopeID) {
			out = append(out, cmd)
		}
	}
	return
}

func (c *CommandsModel) ReduceCommandDetails(scopes ScopesModel) (deletedCommandDetails CommandDetailsModel, err error) {
	for _, cmd := range *c {
		if deleted, err := cmd.ReduceCommandDetail(scopes); err == nil {
			deletedCommandDetails.Append(deleted...)
		}
	}
	if len(deletedCommandDetails) == 0 {
		err = fmt.Errorf("No commandDetail for commands %s that contains scope in %s to be deleted", strings.Join(c.GetNames(), ", "), strings.Join(scopes.GetNames(), ", "))
	}
	return
}

// GetUnique to filter and distinct command list by commandID
func (c CommandsModel) GetUnique() (out CommandsModel) {
	tempMap := make(map[uuid.UUID]CommandModel)
	for _, cmd := range c {
		if _, ok := tempMap[cmd.ID]; ok {
			continue
		}
		tempMap[cmd.ID] = cmd
		out = append(out, cmd)
	}
	return
}

func (c CommandsModel) GetAllCommandDetails() (out CommandDetailsModel) {
	for _, cmd := range c {
		out = append(out, cmd.CommandDetails...)
	}
	return
}

func (c *CommandsModel) Append(in ...CommandModel) {
	*c = append(*c, in...)
	return
}

func (c CommandsModel) GetOneByName(commandName string) (out CommandModel, err error) {
	for _, cmd := range c {
		if cmd.Name == commandName {
			out = cmd
			return
		}
	}
	err = fmt.Errorf("Command %s not found", commandName)
	return
}

func (c CommandsModel) GetByNames(commandNames ...string) (out CommandsModel, err error) {
	for _, cmd := range c {
		for _, commandName := range commandNames {
			if cmd.Name == commandName {
				out = append(out, cmd)
			}
		}
	}
	if len(out) <= 0 {
		err = fmt.Errorf("commands don't contain for `%s`", strings.Join(commandNames, ", "))
	}
	return
}

// TODO: rename to CommandScope? berderet ke lain jg
type CommandDetailModel struct {
	ID        uuid.UUID  `json:"id" db:"id"`
	ScopeID   uuid.UUID  `json:"scopeID" db:"scopeID"`
	CommandID uuid.UUID  `json:"commandID" db:"commandID"`
	Created   time.Time  `json:"created" db:"created"`
	CreatedBy string     `json:"createdBy" db:"createdBy"`
	Updated   *time.Time `json:"updated" db:"updated"`
	UpdatedBy *string    `json:"updatedBy" db:"updatedBy"`
}

func (c *CommandDetailModel) Create(commandID, scopeID uuid.UUID, createdBy string) {
	c.ID = uuid.NewV4()
	c.CommandID = commandID
	c.ScopeID = scopeID
	c.Created = time.Now()
	c.CreatedBy = createdBy
}

type CommandDetailsModel []CommandDetailModel

func (c *CommandDetailsModel) Create(commandID uuid.UUID, createdBy string, scopeIDs ...uuid.UUID) {
	var newCommandDetails CommandDetailsModel
	for _, s := range scopeIDs {
		var temp CommandDetailModel
		temp.Create(commandID, s, createdBy)
		newCommandDetails = append(newCommandDetails, temp)
	}
	*c = newCommandDetails
}

func (c *CommandDetailsModel) ContainsScopeID(scopeID uuid.UUID) bool {
	for _, cd := range *c {
		if cd.ScopeID == scopeID {
			return true
		}
	}
	return false
}

func (c *CommandDetailsModel) Update(updatedBy string) {
	now := time.Now()
	for i, _ := range *c {
		(*c)[i].UpdatedBy = &updatedBy
		(*c)[i].Updated = &now
	}
}

func (c *CommandDetailsModel) Append(in ...CommandDetailModel) {
	*c = append(*c, in...)
}

func (c *CommandDetailsModel) RemoveByScopeID(scopeID uuid.UUID) (deletedCommandDetails CommandDetailsModel, err error) {
	var newCommandDetails CommandDetailsModel
	for _, cd := range *c {
		if cd.ScopeID == scopeID {
			deletedCommandDetails = append(deletedCommandDetails, cd)
			continue
		}
		newCommandDetails = append(newCommandDetails, cd)
	}
	*c = newCommandDetails
	if len(deletedCommandDetails) == 0 {
		err = fmt.Errorf("No CommandDetails deleted for scopeID `%s`", scopeID)
	}
	return
}

// GetUpdateQuery to get query for updating multiple rows with specific value for each row
// i.e:
// CommandDetail cd0, CommandDetail cd1
// SET
// 	cd0.`scopeID` = '085c55ce-b096-47bb-8d71-7a693d7aa4bb',
// 	cd1.`scopeID` = '085c55ce-b096-47bb-8d71-7a693d7aa4bb'
// WHERE
// 	cd0.id = '085c55ce-b096-47bb-8d73-7a693d7aa4bb'
// AND
// 	cd1.id = '54860f38-1bcc-40b9-b8db-bb6422318060'
func (c CommandDetailsModel) GetUpdateQuery() (query string, args []interface{}) {
	if len(c) == 0 {
		return
	}
	var (
		header        = "UPDATE"
		setQuery      = "SET"
		whereQuery    = "WHERE"
		tableName     = "CommandDetail"
		prefix        = "cd"
		lastIndex     = len(c) - 1
		currentPrefix = ""
	)

	for i, cd := range c {
		header += "\n"
		currentPrefix = prefix + strconv.Itoa(i)
		header += tableName + " " + currentPrefix

		setQuery += "\n"
		setQuery += currentPrefix + ".scopeID = ?,\n"
		setQuery += currentPrefix + ".commandID = ?,\n"
		setQuery += currentPrefix + ".updated = ?,\n"
		setQuery += currentPrefix + ".updatedBy = ?\n"

		whereQuery += "\n"
		whereQuery += currentPrefix + ".id = ?\n"

		args = append(args, cd.ScopeID, cd.CommandID, cd.Updated, cd.UpdatedBy)
		if i != lastIndex {
			header += ","
			setQuery += ","
			whereQuery += "AND\n"
		}
	}

	query = header + "\n"
	query += setQuery + "\n"
	query += whereQuery + "\n"
	return
}

// OptionModel represents option attribute
type OptionModel struct {
	ID              uuid.UUID `json:"id" db:"id"`
	CommandID       uuid.UUID `json:"commandID" db:"commandID"`
	Name            string    `json:"name" db:"name"`
	Value           string    `json:"value" db:"value"`
	DefaultValue    string    `json:"defaultValue" db:"defaultValue"`
	ShortName       string    `json:"shortName" db:"shortName"`
	Description     string    `json:"description" db:"description"`
	IsSingleOption  bool      `json:"isSingleOption" db:"isSingleOption"`
	IsMandatory     bool      `json:"isMandatory" db:"isMandatory"`
	IsMultipleValue bool      `json:"isMultipleValue" db:"isMultipleValue"`
	IsDynamic       bool      `json:"isDynamic" db:"isDynamic"`
	IsEncrypted     bool      `json:"isEncrypted" db:"isEncrypted"`
	IsCustom        bool      `json:"isCustom" db:"isCustom"`
	IsHidden        bool      `json:"isHidden" db:"isHidden"`
	Example         string    `json:"example" db:"example"`
	OptionAlias     *string   `json:"optionAlias" db:"optionAlias"`
	ValueDynamic    *string   `json:"valueDynamic" db:"valueDynamic"`
	Created         time.Time `json:"created" db:"created"`
	CreatedBy       string    `json:"createdBy" db:"createdBy"`
}

func (o *OptionModel) Create(createdBy string, commandID uuid.UUID) {
	o.ID = uuid.NewV4()
	o.CreatedBy = createdBy
	o.CommandID = commandID
}

func (o *OptionModel) SetDefaultValueFromValue() {
	if o.Value != "" {
		o.DefaultValue = o.Value
	}
	o.Value = ""
}

func (o *OptionModel) SetValueFromDefaultValue() {
	if !o.IsCustom && o.Value == "" && o.DefaultValue != "" {
		o.Value = o.DefaultValue
	}
}

func (o *OptionModel) EncryptOptionValue(password string) (err error) {
	if o.IsEncrypted && o.Value != "" {
		var encryptedValue string
		if encryptedValue, err = stringLib.Encrypt(o.Value, password); err != nil {
			return
		}
		o.Value = encryptedValue
	}
	return
}

func (o *OptionModel) DecryptOptionValue(password string) (err error) {
	if o.IsEncrypted && o.Value != "" {
		var decryptedValue string
		if decryptedValue, err = stringLib.Decrypt(o.Value, password); err != nil {
			return
		}
		o.Value = decryptedValue
	}
	return
}

func (o OptionModel) GetMultipleValues() (out []string) {
	if !o.IsMultipleValue || o.Value == "" {
		return
	}
	out = strings.Split(o.Value, MultipleValueSeparator)
	return
}

func (o OptionModel) AppendParamsMap(in map[string]string) map[string]string {
	if in == nil {
		in = make(map[string]string)
	}
	for k, v := range o.GetParamsMap() {
		in[k] = v
	}
	return in
}

func (o OptionModel) GetParamsMap() (out map[string]string) {
	out = make(map[string]string)
	for _, h := range o.GetMultipleValues() {
		if strings.Contains(h, ":") {
			k := strings.Split(h, ":")[0]
			v := strings.Split(h, ":")[1]
			out[k] = v
		}
	}
	return
}

func (o OptionModel) AppendURLValues(in url.Values) url.Values {
	if in == nil {
		in = make(url.Values)
	}
	for k, v := range o.GetURLValuesFormat() {
		in[k] = v
	}
	return in
}

func (o OptionModel) GetURLValuesFormat() (out url.Values) {
	out = make(url.Values)
	for _, h := range o.GetMultipleValues() {
		if strings.Contains(h, ":") {
			k := strings.Split(h, ":")[0]
			v := strings.Split(h, ":")[1]
			out.Add(k, v)
		}
	}
	return
}

func (o *OptionModel) GenerateExample() {
	o.Example = o.Name
	if !o.IsSingleOption {
		o.Example = o.Name + "=value"
	}
	return
}

func (o OptionModel) Print(isOneLine bool) string {
	if o.IsHidden {
		return ""
	}
	typeOptionModel := "[optional]"
	if o.IsMandatory {
		typeOptionModel = "[mandatory]"
	}
	if o.IsSingleOption {
		typeOptionModel += " [single_value] "
	}
	if o.IsMultipleValue {
		typeOptionModel += " [multi_value]"
	}
	if isOneLine {
		return fmt.Sprintf("\t\t%s, %s \t%s\n", o.Name, o.ShortName, typeOptionModel)
	}
	out := fmt.Sprintf("\t\t%s, %s \t%s\n\t\t\t%s\n\t\t\ti.e: %s\n", o.Name, o.ShortName, typeOptionModel, o.Description, o.Example)
	if o.Description == "" {
		out = fmt.Sprintf("\t\t%s, %s \t%s\n\t\t\ti.e: %s\n", o.Name, o.ShortName, typeOptionModel, o.Example)
	}
	if o.Value != "" {
		out = fmt.Sprintf("%s\t\t\tImplicit value: %s\n", out, o.Value)
	}
	return out
}

func (opt OptionModel) setNameWithSeparator(msg, separator string) (out string) {
	if strings.Contains(msg, opt.Name+separator) {
		out = opt.Name + separator
	}
	if strings.Contains(msg, opt.ShortName+separator) {
		out = opt.ShortName + separator
	}

	// validate that the optionName is not the value of another option
	if msgBefore := stringLib.StringBefore(msg, out); msgBefore != "" {
		space := " "
		if lastChar := stringLib.GetLastChar(msgBefore); lastChar != space {
			out = ""
		}
	}
	return
}

func (opt OptionModel) extractName(msg string) (optName, separator string) {
	separator = "="
	if optName = opt.setNameWithSeparator(msg, separator); optName != "" {
		return
	}
	separator = " "
	if opt.IsSingleOption {
		optName = opt.setNameWithSeparator(msg, separator)
	}
	return
}

func (opt *OptionModel) ExtractValue(cmd CommandModel, msg string) (value string) {
	var optName, separator string
	opt.SetValueFromDefaultValue()
	if optName, separator = opt.extractName(msg); optName == "" {
		return
	}
	if separator == "=" {
		value = stringLib.StringAfter(msg, optName)
	}
	tempOptName, ok := cmd.Options.ContainsOption(value)
	for i := 0; i < len(cmd.Options) && ok; i++ {
		if tempOptName, ok = cmd.Options.ContainsOption(value); !ok {
			break
		}
		value = strings.Split(value, " "+tempOptName)[0]
	}
	value = strings.TrimSpace(value)
	if opt.IsSingleOption && value == "" {
		value = "true"
	}
	if strings.Contains(opt.DefaultValue, "{custom}") {
		value = strings.Replace(opt.DefaultValue, "{custom}", value, 1)
	}
	return
}

// ConstructDynamic to parse dynamic input value
// i.e: value:::option&&value:::option:::description=this is a simple description.:::mandatory:::example=this is an example:::encrypted
// value:::option is mandatory, it will throw error if no value or no option
// custom value supported. example:
// - before:
// 	-qpd=jql:::--user
// - after:
// 	-qpd=jql:::--user:::custom=assignee={custom} AND status in ("to do") ORDER BY created DESC
// mark of {custom} will be replaced by --user value when executing the new command
func (opt OptionModel) ConstructDynamic(rawValue string) (out OptionsModel, err error) {
	if rawValue == "" {
		err = fmt.Errorf("value can't be empty to construct dynamic option")
		return
	}
	values := strings.Split(rawValue, "&&")
	if !opt.IsDynamic || len(values) == 0 {
		err = fmt.Errorf("value for `%s` is needed with the right format. i.e: %s", opt.Name, opt.Example)
		return
	}
	optionAlias := opt.GetOptionAlias()
	for _, v := range values {
		optionFields := strings.Split(v, ":::")
		if len(optionFields) < 2 {
			err = fmt.Errorf("value for `%s` is needed with the right format. i.e: %s", opt.Name, opt.Example)
			return
		}
		tempOpt := OptionModel{
			IsCustom:     true,
			ValueDynamic: &optionFields[0],
			Name:         optionFields[1],
			ShortName:    optionFields[1],
		}
		if len(optionFields) > 2 {
			if strings.Contains(optionFields[2], "-") {
				tempOpt.ShortName = optionFields[2]
			}
		}
		if err = tempOpt.ValidateName(); err != nil {
			return
		}

		if strings.Contains(v, ":::"+Description+"=") {
			tempOpt.Description = stringLib.StringAfter(v, ":::"+Description+"=")
			if strings.Contains(tempOpt.Description, ":::") {
				tempOpt.Description = strings.Split(tempOpt.Description, ":::")[0]
			}
		}
		if strings.Contains(v, ":::"+Example+"=") {
			tempOpt.Example = stringLib.StringAfter(v, ":::"+Example+"=")
			if strings.Contains(tempOpt.Example, ":::") {
				tempOpt.Example = strings.Split(tempOpt.Example, ":::")[0]
			}
		}
		if tempOpt.Example == "" {
			tempOpt.GenerateExample()
		}
		if strings.Contains(strings.ToLower(v), ":::"+Mandatory) {
			tempOpt.IsMandatory = true
		}
		if strings.Contains(strings.ToLower(v), ":::"+Multiple) {
			tempOpt.IsMultipleValue = true
		}
		if strings.Contains(v, "custom=") {
			var customValue string
			if temp := stringLib.StringAfter(v, "custom="); temp != "" {
				customValue = temp
			}
			if temp := stringLib.StringBefore(customValue, ":::"); temp != "" {
				customValue = temp
			}
			tempOpt.DefaultValue = strings.TrimSpace(customValue)
		}

		if strings.Contains(v, ":::"+Encrypted) {
			tempOpt.IsEncrypted = true
		}

		tempOpt.OptionAlias = optionAlias
		out = append(out, tempOpt)
	}
	return
}

func (opt OptionModel) GetOptionAlias() *string {
	if !opt.IsDynamic {
		return nil
	}
	alias := strings.Replace(opt.Name, Dynamic, "", 1)
	return &alias
}

type OptionsModel []OptionModel

func (o *OptionsModel) Append(in ...OptionModel) {
	*o = append(*o, in...)
}

func (o *OptionsModel) Create(createdBy string, commandID uuid.UUID) {
	for i, _ := range *o {
		(*o)[i].Create(createdBy, commandID)
	}
}

func (o *OptionsModel) ClearToDefault() {
	for i, _ := range *o {
		(*o)[i].Value = ""
	}
}

func (o *OptionsModel) EncryptOptionsValue(password string) (err error) {
	for i, opt := range *o {
		if opt.IsEncrypted && opt.Value != "" {
			(*o)[i].EncryptOptionValue(password)
		}
	}
	return
}

func (o *OptionsModel) DecryptOptionsValue(password string) (err error) {
	for i, _ := range *o {
		(*o)[i].DecryptOptionValue(password)
	}
	return
}

func (o *OptionsModel) UpdateOption(in OptionModel) {
	for i, opt := range *o {
		if opt.Name == in.Name {
			(*o)[i] = in
			break
		}
	}
}

func (o OptionsModel) ContainsOption(in string) (string, bool) {
	for _, opt := range o {
		if strings.Contains(in, " "+opt.Name) {
			return opt.Name, true
		}
		if strings.Contains(in, " "+opt.ShortName) {
			return opt.ShortName, true
		}
	}
	return "", false
}

func (o OptionsModel) GetOptionByName(name string) (OptionModel, error) {
	for _, opt := range o {
		if opt.Name == name {
			return opt, nil
		}
	}
	return OptionModel{}, fmt.Errorf("Option for %s is not exist!!", name)
}

func (o OptionsModel) GetOptionValue(name string) (value string, err error) {
	var opt OptionModel
	if opt, err = o.GetOptionByName(name); err != nil {
		return
	}
	value = opt.Value
	return
}

func (o OptionsModel) PrintValuedOptions() (out string) {
	for _, opt := range o {
		if opt.Value != "" {
			tempOptValue := opt.Value
			if opt.IsEncrypted {
				tempOptValue = "Encrypted"
			}
			out += fmt.Sprintf("\t%s=%s\n", opt.Name, tempOptValue)
		}
	}
	if out != "" {
		out = fmt.Sprintf("\nOptions:\n%s", out)
	}
	return
}

func (o OptionsModel) Print(isOneLine bool) (out string) {
	for _, opt := range o {
		out += opt.Print(isOneLine)
	}
	if out != "" {
		out = fmt.Sprintf("\n\tOPTIONS\n%s", out)
		return
	}
	out = "\n"
	return
}

func (o OptionsModel) ConvertCustomOptionsToCukCmd() CommandModel {
	cukCommand := GetDefaultCommands()[CommandCuk]
	for _, opt := range o {
		if opt.IsDynamic {
			continue
		}
		optName := opt.Name
		if opt.IsCustom && opt.OptionAlias != nil {
			optName = *opt.OptionAlias
		}
		tempOpt, _ := cukCommand.Options.GetOptionByName(optName)

		switch tempOpt.Name {
		case OptionHeaders, OptionQueryParams, OptionURLParams,
			OptionBodyURLEncode, OptionBodyFormMultipart:
			tempValue := opt.Value
			if opt.IsCustom {
				if opt.IsMultipleValue {
					tempValue = ""
					multiValues := opt.GetMultipleValues()
					for i, value := range multiValues {
						tempValue += *opt.ValueDynamic + ":" + value
						if i != len(multiValues)-1 {
							tempValue += MultipleValueSeparator
						}
					}
				} else {
					tempValue = *opt.ValueDynamic + ":" + opt.Value
				}
			}
			if !strings.Contains(tempOpt.Value, tempValue) && tempOpt.Value != "" {
				tempOpt.Value += MultipleValueSeparator + tempValue
			} else if tempValue != "" {
				tempOpt.Value = tempValue
			}
		default:
			if opt.Value != "" {
				tempOpt.Value = opt.Value
			}
		}
		cukCommand.Options.UpdateOption(tempOpt)
	}

	return cukCommand
}

// TODO: --file behaviour
func GetDefaultCommands() (out map[string]CommandModel) {
	conf := config.Get()
	site := conf.Site
	superUserMode := "disabled"
	if conf.SuperUserModeEnabled {
		superUserMode = "enabled"
	}
	out = map[string]CommandModel{
		CommandHelp: CommandModel{
			Name:        CommandHelp,
			Description: "Show the detail of command. Visit playground " + site.LandingPage + "/play to explore more!",
			Example:     CommandHelp + " <command> @<botname>",
			Options: OptionsModel{
				OptionModel{
					Name:            OptionCommand,
					ShortName:       ShortOptionCommand,
					Description:     "Show the detail of the command",
					IsMultipleValue: true,
					Example:         OptionCommand + "=cuk",
				},
				OptionModel{
					Name:           OptionOneLine,
					ShortName:      ShortOptionOneLine,
					Description:    "print command name only",
					IsSingleOption: true,
					Example:        OptionOneLine,
				},
			},
			IsDefaultCommand: true,
		},
		CommandCuk: CommandModel{
			Name:        CommandCuk,
			Description: "Hit http/https endpoint. Visit playground " + site.LandingPage + "/play to explore more!",
			Example:     CommandCuk + " -m GET -u http://cakcuk.io @<botname>",
			Options: OptionsModel{
				OptionModel{
					Name:            OptionMethod,
					ShortName:       ShortOptionMethod,
					DefaultValue:    "GET",
					Description:     "Http Method [GET,POST,PUT,PATCH,DELETE]",
					IsSingleOption:  false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         OptionMethod + "=GET",
				},
				OptionModel{
					Name:            OptionURL,
					ShortName:       ShortOptionURL,
					Description:     "URL Endpoint",
					IsSingleOption:  false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         OptionURL + "=http://cakcuk.io",
				},
				OptionModel{
					Name:            OptionBasicAuth,
					ShortName:       ShortOptionBasicAuth,
					Description:     "Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsEncrypted:     true,
					Example:         OptionBasicAuth + "=admin:admin123",
				},
				OptionModel{
					Name:            OptionHeaders,
					ShortName:       ShortOptionHeaders,
					Description:     "URL headers. written format: key:value - separated by " + MultipleValueSeparator + " with no space for multiple values",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionHeaders + "=Content-Type:application/json" + MultipleValueSeparator + "x-api-key:api-key-value",
				},
				OptionModel{
					Name:            OptionQueryParams,
					ShortName:       ShortOptionQueryParams,
					Description:     "Query params. written format: key:value - separated by " + MultipleValueSeparator + " with no space for multiple values",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionQueryParams + "=type:employee" + MultipleValueSeparator + "isNew:true",
				},
				OptionModel{
					Name:            OptionURLParams,
					ShortName:       ShortOptionURLParams,
					Description:     "URL params only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: http://cakcuk.io/blog/{{id}}. written format: key:value - separated by " + MultipleValueSeparator + " with no space for multiple values",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionURLParams + "=id:1",
				},
				OptionModel{
					Name:            OptionBodyParams,
					ShortName:       ShortOptionBodyParams,
					Description:     "Body params for raw text",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionBodyParams + "=raw text",
				},
				OptionModel{
					Name:        OptionBodyJSON,
					ShortName:   ShortOptionBodyJSON,
					Description: "Body JSON param",
					Example: OptionBodyJSON + `={
						"project": "project-test-1",
						"message": "this is a sample message"
					}`,
				},
				OptionModel{
					Name:            OptionBodyURLEncode,
					ShortName:       ShortOptionBodyURLEncode,
					Description:     "support for x-www-form-url-encoded query",
					IsMultipleValue: true,
					Example:         OptionBodyURLEncode + "=type:employee" + MultipleValueSeparator + "isNew:true",
				},
				OptionModel{
					Name:            OptionBodyFormMultipart,
					ShortName:       ShortOptionBodyFormMultipart,
					Description:     "support for form-data multipart query",
					IsMultipleValue: true,
					Example:         OptionBodyFormMultipart + "=type:employee" + MultipleValueSeparator + "isNew:true",
				},
				OptionModel{
					Name:            OptionParseResponse,
					ShortName:       ShortOptionParseResponse,
					Description:     "parse json response from http call with given template",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionParseResponse + "={.name}} - {.description}}",
				},
				OptionModel{
					Name:            OptionNoParse,
					ShortName:       ShortOptionNoParse,
					Description:     "disable --parseResponse. get raw of the response",
					IsSingleOption:  true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionNoParse,
				},
			},
			IsDefaultCommand: true,
		},
		CommandCak: CommandModel{
			Name:        CommandCak,
			Description: "Create your custom command. Visit playground " + site.LandingPage + "/play to explore more!",
			Example:     CommandCak + " @<botname>",
			Options: OptionsModel{
				OptionModel{
					Name:            OptionCommand,
					ShortName:       ShortOptionCommand,
					Description:     "your command name.",
					IsSingleOption:  false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--cmd=run-test",
				},
				OptionModel{
					Name:            OptionDescription,
					ShortName:       ShortOptionDescription,
					Description:     "your command description.",
					IsSingleOption:  false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         OptionDescription + "=to execute the tests",
				},
				OptionModel{
					Name:            OptionMethod,
					ShortName:       ShortOptionMethod,
					DefaultValue:    "GET",
					Description:     "Http Method [GET,POST,PUT,PATCH,DELETE]",
					IsSingleOption:  false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         OptionMethod + "=GET",
				},
				OptionModel{
					Name:            OptionURL,
					ShortName:       ShortOptionURL,
					Description:     "URL Endpoint",
					IsSingleOption:  false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         OptionURL + "=http://cakcuk.io",
				},
				OptionModel{
					Name:            OptionBasicAuth,
					ShortName:       ShortOptionBasicAuth,
					Description:     "Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsEncrypted:     true,
					Example:         OptionBasicAuth + "=admin:admin123",
				},
				OptionModel{
					Name:            OptionHeaders,
					ShortName:       ShortOptionHeaders,
					Description:     "URL headers. written format: key:value - separated by " + MultipleValueSeparator + " with no space for multiple values",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionHeaders + "=Content-Type:application/json" + MultipleValueSeparator + "x-api-key:api-key-value",
				},
				OptionModel{
					Name:            OptionHeadersDynamic,
					ShortName:       ShortOptionHeadersDynamic,
					Description:     "Create option for dynamic header params. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionHeadersDynamic + "=x-user-id:::--user",
				},
				OptionModel{
					Name:            OptionQueryParams,
					ShortName:       ShortOptionQueryParams,
					Description:     "Query params. written format: key:value - separated by " + MultipleValueSeparator + " with no space for multiple values",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionQueryParams + "=type:employee" + MultipleValueSeparator + "isNew:true",
				},
				OptionModel{
					Name:            OptionQueryParamsDynamic,
					ShortName:       ShortOptionQueryParamsDynamic,
					Description:     "Create option for dynamic query params. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionQueryParamsDynamic + "=type:::--type",
				},
				OptionModel{
					Name:            OptionURLParams,
					ShortName:       ShortOptionURLParams,
					Description:     "URL params only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: http://cakcuk.io/blog/{{id}}. written format: key:value - separated by " + MultipleValueSeparator + " with no space for multiple values",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionURLParams + "=id:1",
				},
				OptionModel{
					Name:            OptionURLParamsDynamic,
					ShortName:       ShortOptionURLParamsDynamic,
					Description:     "Create option for dynamic url params. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionURLParamsDynamic + "=employeeID:::--employee",
				},
				OptionModel{
					Name:            OptionBodyParams,
					ShortName:       ShortOptionBodyParams,
					Description:     "Body params for raw text",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionBodyParams + "=raw text",
				},
				OptionModel{
					Name:        OptionBodyJSON,
					ShortName:   ShortOptionBodyJSON,
					Description: "Body JSON param",
					Example: OptionBodyJSON + `={
						"project": "project-test-1",
						"message": "this is a sample message"
					}`,
				},
				OptionModel{
					Name:            OptionBodyURLEncode,
					ShortName:       ShortOptionBodyURLEncode,
					Description:     "support for x-www-form-url-encoded query",
					IsMultipleValue: true,
					Example:         OptionBodyURLEncode + "=type:employee" + MultipleValueSeparator + "isNew:true",
				},
				OptionModel{
					Name:            OptionBodyURLEncodeDynamic,
					ShortName:       ShortOptionBodyURLEncodeDynamic,
					Description:     "Create option for dynamic x-www-form-url-encoded query. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted",
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionBodyURLEncodeDynamic + "=type:::--type",
				},
				OptionModel{
					Name:            OptionBodyFormMultipart,
					ShortName:       ShortOptionBodyFormMultipart,
					Description:     "support for form-data multipart query",
					IsMultipleValue: true,
					Example:         OptionBodyFormMultipart + "=type:employee" + MultipleValueSeparator + "isNew:true",
				},
				OptionModel{
					Name:            OptionBodyFormMultipartDynamic,
					ShortName:       ShortOptionBodyFormMultipartDynamic,
					Description:     "Create option for dynamic form-data multipart query. written format: key:::option&&key:::option:::description:::this is description value:::mandatory:::encrypted",
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionBodyFormMultipartDynamic + "=type:::--type",
				},

				OptionModel{
					Name:            OptionScope,
					ShortName:       ShortOptionScope,
					DefaultValue:    ScopePublic,
					Description:     "Set command scope, which only specified scopes that can execute command, default is public",
					IsMultipleValue: true,
					Example:         OptionScope + "=admin&&developer",
				},
				OptionModel{
					Name:            OptionParseResponse,
					ShortName:       ShortOptionParseResponse,
					Description:     "Parse json response from http call with given template",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionParseResponse + "={.name}} - {.description}}",
				},
				OptionModel{
					Name:            OptionUpdate,
					ShortName:       ShortOptionUpdate,
					Description:     "force update existing command",
					IsSingleOption:  true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionUpdate,
				},
				OptionModel{
					Name:            OptionNoParse,
					ShortName:       ShortOptionNoParse,
					Description:     "disable --parseResponse. get raw of the response",
					IsSingleOption:  true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionNoParse,
				},
			},
			IsDefaultCommand: true,
		},
		CommandDel: CommandModel{
			Name:        CommandDel,
			Description: "Delete existing command",
			Example:     CommandDel + " <command> @<botname>",
			Options: OptionsModel{
				OptionModel{
					Name:            OptionCommand,
					ShortName:       ShortOptionCommand,
					Description:     "Delete certain command, could be single or multiple commands. seperated by && no space",
					IsSingleOption:  false,
					IsMandatory:     true,
					IsMultipleValue: true,
					Example:         OptionCommand + "=custom-command-1&&custom-command-2",
				},
			},
			IsDefaultCommand: true,
		},
		CommandScope: CommandModel{
			Name:        CommandScope,
			Description: "Create, edit and delete scopes a.k.a access control list (ACL) for commands",
			Example:     CommandScope + " <command> @<botname>",
			Options: OptionsModel{
				OptionModel{
					Name:            OptionShow,
					ShortName:       ShortOptionShow,
					Description:     "Show details of the scopes. Could be multiple, separated by && no space",
					IsMultipleValue: true,
					Example:         OptionShow + "=developer&&public",
				},
				OptionModel{
					Name:        OptionCreate,
					ShortName:   ShortOptionCreate,
					Description: "Create new scope",
					Example:     OptionCreate + "=developer",
				},
				OptionModel{
					Name:            OptionCommand,
					ShortName:       ShortOptionCommand,
					Description:     "Specify certain commands to be added in scope, could be single or multiple commands. seperated by && no space",
					IsMultipleValue: true,
					Example:         OptionCommand + "=custom-command-1&&custom-command-2",
				},
				OptionModel{
					Name:            OptionUser,
					ShortName:       ShortOptionUser,
					Description:     "Specify users to be in specified scope by mentioning his/her/their names. Could be multiple, separated by &&",
					IsMultipleValue: true,
					Example:         OptionUser + "=@alex&&@dz",
				},
				OptionModel{
					Name:        OptionUpdate,
					ShortName:   ShortOptionUpdate,
					Description: "Update scope by adding users or/and commands into existing scopes",
					Example:     OptionUpdate + "=admin --user=@newUser1&&@newUser2",
				},
				OptionModel{
					Name:        OptionDel,
					ShortName:   ShortOptionDel,
					Description: "Delete scope or delete users or/and channels from existing scopes",
					Example:     OptionDel + "=@alex&&@dz",
				},
				OptionModel{
					Name:           OptionOneLine,
					ShortName:      ShortOptionOneLine,
					Description:    "print scope name only",
					IsSingleOption: true,
					Example:        OptionOneLine,
				},
			},
			IsDefaultCommand: true,
		},
		CommandSuperUser: CommandModel{
			Name:        CommandSuperUser,
			Description: "Access and control to manage super user. Super User mode currently is " + superUserMode + ".",
			Example:     CommandSuperUser + " <command> @<botname>. " + CommandSuperUser + " @<botname> to list users who have super user role",
			Options: OptionsModel{
				OptionModel{
					Name:            OptionShow,
					ShortName:       ShortOptionShow,
					Description:     "Show details of the user scope & commands that can be accessed. Could be multiple, separated by && no space",
					IsMultipleValue: true,
					Example:         OptionShow + "=@adit && @ahmad",
				},
				OptionModel{
					Name:            OptionSet,
					ShortName:       ShortOptionSet,
					Description:     "Set user to be super user by mention his/her/their names. could be multiple, separated by &&",
					IsMultipleValue: true,
					Example:         OptionSet + "=@alex && @ziad",
				},
				OptionModel{
					Name:            OptionDel,
					ShortName:       ShortOptionDel,
					Description:     "Delete user from super user by mention his/her/their names. could be multiple, separated by &&",
					IsMultipleValue: true,
					Example:         OptionUpdate + "=@alex && @ziad",
				},
			},
			IsDefaultCommand: true,
		},
	}

	for k, v := range out {
		v.Options.Append(GlobalDefaultOptions...)
		out[k] = v
	}
	return
}

func GetSortedDefaultCommands() (out CommandsModel) {
	cmds := GetDefaultCommands()
	return CommandsModel{
		cmds[CommandHelp],
		cmds[CommandCuk],
		cmds[CommandCak],
		cmds[CommandDel],
		cmds[CommandScope],
		cmds[CommandSuperUser],
	}
}

func ContainsDefaultCommands(in ...string) bool {
	for _, cmdName := range in {
		if _, ok := GetDefaultCommands()[cmdName]; ok {
			return true
		}
	}
	return false
}

func (opt OptionModel) ValidateName() error {
	if len(opt.Name) < 3 {
		return fmt.Errorf("option name for `%s` need to be longer.", opt.Name)
	}
	if len(opt.ShortName) < 2 {
		return fmt.Errorf("option short name for `%s` need to be longer.", opt.ShortName)
	}
	if opt.Name[0:1] != "-" || opt.Name[1:2] != "-" {
		return fmt.Errorf("the first two chars for option name `%s` need to be dash `-`. i.e: --%s", opt.Name, opt.Name)
	}
	if opt.ShortName[0:1] != "-" {
		return fmt.Errorf("the first char for option short name `%s` need to be dash `-`. i.e: -%s", opt.ShortName, opt.ShortName)
	}

	errMsg := "option name for `%s` already reserved by default options. Try `%s %s=%s`."
	defaultOptions := append(DefaultOptionNames, DefaultShortOptionNames...)
	if stringLib.StringContains(defaultOptions, opt.Name) {
		return fmt.Errorf(errMsg, opt.Name,
			CommandHelp, OptionCommand, CommandCak)
	}
	if stringLib.StringContains(defaultOptions, opt.ShortName) {
		return fmt.Errorf(errMsg, opt.ShortName,
			CommandHelp, OptionCommand, CommandCak)
	}
	return nil
}

type CommandResponseModel struct {
	Message       string
	Command       CommandModel
	Scopes        ScopesModel
	Team          TeamModel
	Source        string
	IsFileOutput  bool
	IsPrintOption bool
	IsNoParse     bool
	IsHelp        bool
	FilterLike    string
}
