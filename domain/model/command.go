package model

import (
	"cakcuk/config"
	jsonLib "cakcuk/utils/json"
	requestLib "cakcuk/utils/request"
	stringLib "cakcuk/utils/string"
	"fmt"
	"io"
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

	CommandHelp = "help"
	CommandCak  = "cak"
	CommandCuk  = "cuk"
	CommandDel  = "del"

	Dynamic = "Dynamic"

	OptionCommand       = "--command"
	OptionOneLine       = "--oneLine"
	OptionOutputFile    = "--outputFile"
	OptionPrintOptions  = "--printOptions"
	OptionMethod        = "--method"
	OptionURL           = "--url"
	OptionAuth          = "--auth"
	OptionHeaders       = "--headers"
	OptionQueryParams   = "--queryParams"
	OptionURLParams     = "--urlParams"
	OptionBodyParams    = "--bodyParams"
	OptionParseResponse = "--parseResponse"
	OptionDescription   = "--description"
	OptionUpdate        = "--update"

	OptionHeadersDynamic     = OptionHeaders + Dynamic
	OptionQueryParamsDynamic = OptionQueryParams + Dynamic
	OptionURLParamsDynamic   = OptionURLParams + Dynamic

	ShortOptionCommand       = "-c"
	ShortOptionOneLine       = "-ol"
	ShortOptionOutputFile    = "-of"
	ShortOptionPrintOptions  = "-po"
	ShortOptionMethod        = "-m"
	ShortOptionURL           = "-u"
	ShortOptionAuth          = "-a"
	ShortOptionHeaders       = "-h"
	ShortOptionQueryParams   = "-qp"
	ShortOptionURLParams     = "-up"
	ShortOptionBodyParams    = "-bp"
	ShortOptionParseResponse = "-pr"
	ShortOptionDescription   = "-d"
	ShortOptionUpdate        = "-up"

	ShortOptionHeadersDynamic     = ShortOptionHeaders + Dynamic
	ShortOptionQueryParamsDynamic = ShortOptionQueryParams + Dynamic
	ShortOptionURLParamsDynamic   = ShortOptionURLParams + Dynamic

	MultipleValueSeparator = "&&"
)

var (
	DefaultOptionNames = []string{
		OptionCommand,
		OptionOneLine,
		OptionOutputFile,
		OptionPrintOptions,
		OptionMethod,
		OptionURL,
		OptionAuth,
		OptionHeaders,
		OptionQueryParams,
		OptionURLParams,
		OptionBodyParams,
		OptionParseResponse,
		OptionDescription,
		OptionHeadersDynamic,
		OptionQueryParamsDynamic,
		OptionURLParamsDynamic,
	}

	DefaultShortOptionNames = []string{
		ShortOptionCommand,
		ShortOptionOneLine,
		ShortOptionOutputFile,
		ShortOptionPrintOptions,
		ShortOptionMethod,
		ShortOptionURL,
		ShortOptionAuth,
		ShortOptionHeaders,
		ShortOptionQueryParams,
		ShortOptionURLParams,
		ShortOptionBodyParams,
		ShortOptionParseResponse,
		ShortOptionDescription,
		ShortOptionHeadersDynamic,
		ShortOptionQueryParamsDynamic,
		ShortOptionURLParamsDynamic,
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

	OptionsModel OptionsModel `json:"options"`
}

func (c *CommandModel) Create(in CommandModel, botName, createdBy string, teamID uuid.UUID) {
	c.ID = uuid.NewV4()
	c.TeamID = teamID
	c.CreatedBy = createdBy
	c.OptionsModel.Create(createdBy, c.ID)
}

func (c *CommandModel) FromCakCommand(in CommandModel, botName string) (isUpdate bool, err error) {
	for _, tempOpt := range in.OptionsModel {
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
		case OptionOutputFile, OptionPrintOptions, OptionURL, OptionQueryParams,
			OptionURLParams, OptionMethod, OptionAuth,
			OptionHeaders, OptionParseResponse:
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
				c.OptionsModel.Append(tempOpts...)
			}
			continue
		}
		tempOpt.SetDefaultValueFromValue()
		c.OptionsModel.Append(tempOpt)
	}
	c.GenerateExample(botName)
	return
}

func (c *CommandModel) FromDelCommand() (commandNames []string, err error) {
	for _, tempOpt := range c.OptionsModel {
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

func (c *CommandModel) FromCukCommand() (httpMethod, url string, queryParams, headers map[string]string,
	bodyParam io.Reader) {
	urlParams := make(map[string]string)
	queryParams = make(map[string]string)
	headers = make(map[string]string)

	for _, tempOpt := range c.OptionsModel {
		switch tempOpt.Name {
		case OptionMethod:
			httpMethod = tempOpt.Value
		case OptionURL:
			url = tempOpt.Value
		case OptionHeaders:
			headers = tempOpt.AppendParamsMap(headers)
		case OptionQueryParams:
			queryParams = tempOpt.AppendParamsMap(queryParams)
		case OptionURLParams:
			urlParams = tempOpt.AppendParamsMap(urlParams)
		case OptionBodyParams:
			if tempOpt.Value != "" {
				bodyParam = stringLib.ToIoReader(tempOpt.Value)
				if _, ok := headers["Content-Type"]; !ok {
					if jsonLib.IsJson(tempOpt.Value) {
						headers["Content-Type"] = "application/json"
					}
				}
			}
		case OptionAuth:
			authValue := tempOpt.Value
			tempAuthValues := strings.Split(authValue, ":")
			if authValue != "" && len(tempAuthValues) > 1 {
				authValue = requestLib.GetBasicAuth(tempAuthValues[0], tempAuthValues[1])
				headers["Authorization"] = authValue
			}
		}
	}
	url = requestLib.AssignUrlParams(url, urlParams)
	return
}

func (c *CommandModel) GenerateExample(botName string) {
	var optionsExample string
	for _, o := range c.OptionsModel {
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
	var tempOtions OptionsModel
	tempOtions = append(tempOtions, c.OptionsModel...)
	c.OptionsModel = tempOtions
	return c
}

func (c CommandModel) Print(botName string, isOneLine bool) string {
	if isOneLine {
		return fmt.Sprintf("- %s [options] @%s", c.Name, botName)
	}
	return c.printDetail(botName, false)
}

func (c CommandModel) PrintWithDescription(botName string) string {
	return c.printDetail(botName, true)
}

func (c CommandModel) printDetail(botName string, isCompleteDescription bool) (out string) {
	out = fmt.Sprintf("- %s [options] @%s\n\t%s\n\ti.e: %s", c.Name, botName, c.Description, c.Example)
	out += c.OptionsModel.Print()
	if isCompleteDescription && c.CompleteDesciption != nil {
		out = fmt.Sprintf("%sDescription\n%s", out, c.CompleteDesciption)
	}
	return
}

// Extract to get options from user input
func (c *CommandModel) Extract(msg *string) (err error) {
	*msg = strings.TrimSpace(strings.Replace(*msg, c.Name, "", 1))
	*msg += " "
	if c.OptionsModel != nil {
		for i, opt := range c.OptionsModel {
			value := opt.ExtractValue(*c, *msg)
			if opt.IsMandatory && opt.Value == "" && value == "" {
				err = fmt.Errorf("Option for `%s` is mandatory! Try `%s %s=%s` for details.", opt.Name,
					CommandHelp, OptionCommand, c.Name)
				return
			}
			if value != "" {
				opt.Value = value
			}
			c.OptionsModel[i] = opt
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

func (o *OptionModel) GenerateExample() {
	o.Example = o.Name
	if !o.IsSingleOption {
		o.Example = o.Name + "=value"
	}
	return
}

func (o OptionModel) Print() string {
	if o.IsHidden {
		return ""
	}
	typeOptionModel := "[OPTIONAL]"
	if o.IsMandatory {
		typeOptionModel = "[MANDATORY]"
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

func (opt OptionModel) setNameWithSeparator(msg, separator string) (value string) {
	if strings.Contains(msg, opt.Name+separator) {
		value = opt.Name + separator
	}
	if strings.Contains(msg, opt.ShortName+separator) {
		value = opt.ShortName + separator
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
	tempOptName, ok := cmd.OptionsModel.ContainsOption(value)
	for i := 0; i < len(cmd.OptionsModel) && ok; i++ {
		if tempOptName, ok = cmd.OptionsModel.ContainsOption(value); !ok {
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
// 	-qpDynamic=jql:::--user
// - after:
// 	-qpDynamic=jql:::--user:::custom=assignee={custom} AND status in ("to do") ORDER BY created DESC
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
		if strings.Contains(v, ":::"+Mandatory) {
			tempOpt.IsMandatory = true
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

func (o OptionsModel) Print() (out string) {
	for _, opt := range o {
		out += opt.Print()
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
		tempOpt, _ := cukCommand.OptionsModel.GetOptionByName(optName)

		switch tempOpt.Name {
		case OptionHeaders, OptionQueryParams, OptionURLParams:
			tempValue := opt.Value
			if opt.IsCustom {
				tempValue = *opt.ValueDynamic + ":" + opt.Value
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
		cukCommand.OptionsModel.UpdateOption(tempOpt)
	}

	return cukCommand
}

// TODO: --file behaviour
func GetDefaultCommands() (out map[string]CommandModel) {
	site := config.Get().Site
	out = map[string]CommandModel{
		CommandHelp: CommandModel{
			Name:        CommandHelp,
			Description: "Show the detail of command. Visit playground " + site.LandingPage + "/play to explore more!",
			Example:     CommandHelp + " <command> @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            OptionCommand,
					ShortName:       ShortOptionCommand,
					Description:     "Show the detail of the command",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionCommand + "=cuk",
				},
				OptionModel{
					Name:            OptionOneLine,
					ShortName:       ShortOptionOneLine,
					Description:     "print command name only",
					IsSingleOption:  true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionOneLine,
				},
				OptionModel{
					Name:            OptionOutputFile,
					ShortName:       ShortOptionOutputFile,
					Description:     "print output data into file [Single Option]",
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
			},
			IsDefaultCommand: true,
		},
		CommandCuk: CommandModel{
			Name:        CommandCuk,
			Description: "Hit http/https endpoint. Visit playground " + site.LandingPage + "/play to explore more!",
			Example:     CommandCuk + " -m GET -u http://cakcuk.io @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            OptionMethod,
					ShortName:       ShortOptionMethod,
					Value:           "GET",
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
					Name:            OptionAuth,
					ShortName:       ShortOptionAuth,
					Description:     "Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsEncrypted:     true,
					Example:         OptionAuth + "=admin:admin123",
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
					Description:     "Body params. i.e: json, raw text, xml, etc",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionBodyParams + "=type:employee,isNew:true",
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
					Name:            OptionOutputFile,
					ShortName:       ShortOptionOutputFile,
					Description:     "print output data into file [Single Option]",
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
			},
			IsDefaultCommand: true,
		},
		CommandCak: CommandModel{
			Name:        CommandCak,
			Description: "Create your custom command. Visit playground " + site.LandingPage + "/play to explore more!",
			Example:     CommandCak + " @<botname>",
			OptionsModel: OptionsModel{
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
					Value:           "GET",
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
					Name:            OptionAuth,
					ShortName:       ShortOptionAuth,
					Description:     "Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsEncrypted:     true,
					Example:         OptionAuth + "=admin:admin123",
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
					Description:     "Create option for dynamic header params. written format: key:::option&&key:::option:::description:::mandatory:::encrypted",
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
					Description:     "Create option for dynamic query params. written format: key:::option&&key:::option:::description:::mandatory:::encrypted",
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
					Description:     "Create option for dynamic url params. written format: key:::option&&key:::option:::description:::mandatory:::encrypted",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionURLParamsDynamic + "=employeeID:::--employee",
				},
				OptionModel{
					Name:            OptionBodyParams,
					ShortName:       ShortOptionBodyParams,
					Description:     "Body params. i.e: json, raw text, xml, etc",
					IsSingleOption:  false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionBodyParams + "=jsonData",
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
					Name:            OptionOutputFile,
					ShortName:       ShortOptionOutputFile,
					Description:     "print output data into file [Single Option]",
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
					Name:            OptionUpdate,
					ShortName:       ShortOptionUpdate,
					Description:     "force update existing command",
					IsSingleOption:  true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionUpdate,
				},
			},
			IsDefaultCommand: true,
		},
		CommandDel: CommandModel{
			Name:        CommandDel,
			Description: "Delete existing command",
			Example:     CommandDel + " <command> @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            OptionCommand,
					ShortName:       ShortOptionCommand,
					Description:     "Delete certain command, could be single or multiple commands. comma-seperated",
					IsSingleOption:  false,
					IsMandatory:     true,
					IsMultipleValue: true,
					Example:         OptionCommand + "=custom-command-1,custom-command-2",
				},
				OptionModel{
					Name:            OptionOutputFile,
					ShortName:       ShortOptionOutputFile,
					Description:     "print output data into file [Single Option]",
					IsSingleOption:  true,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsHidden:        false,
					Example:         OptionOutputFile,
				},
				OptionModel{
					Name:            OptionPrintOptions,
					ShortName:       ShortOptionPrintOptions,
					Description:     "print detail options when executing command",
					IsSingleOption:  true,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsHidden:        false,
					Example:         OptionPrintOptions,
				},
			},
			IsDefaultCommand: true,
		},
	}
	return
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
