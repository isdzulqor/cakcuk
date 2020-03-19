package model

import (
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

	ShortOptionHeadersDynamic     = ShortOptionHeaders + Dynamic
	ShortOptionQueryParamsDynamic = ShortOptionQueryParams + Dynamic
	ShortOptionURLParamsDynamic   = ShortOptionURLParams + Dynamic
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

func (c *CommandModel) Create(in CommandModel, botName, createdBy string, teamID uuid.UUID) (err error) {
	if err = c.fromCakCommand(in, botName); err != nil {
		return
	}
	c.ID = uuid.NewV4()
	c.TeamID = teamID
	c.CreatedBy = createdBy
	c.OptionsModel.Create(createdBy, c.ID)
	return
}

func (c *CommandModel) fromCakCommand(in CommandModel, botName string) (err error) {
	for _, tempOpt := range in.OptionsModel {
		switch tempOpt.Name {
		case OptionCommand:
			c.Name = tempOpt.Value
			continue
		case OptionDescription:
			c.Description = tempOpt.Value
			continue
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
		c.OptionsModel.Append(tempOpt)
	}
	c.GenerateExample(botName)
	return
}

func (c *CommandModel) FromCukCommand() (httpMethod, url string, queryParams, headers map[string]string,
	bodyParam io.Reader) {
	for _, tempOpt := range c.OptionsModel {
		switch tempOpt.Name {
		case OptionMethod:
			httpMethod = tempOpt.Value
		case OptionURL:
			url = tempOpt.Value
		case OptionHeaders:
			headers = getParamsMap(tempOpt.GetMultipleValues())
		case OptionQueryParams:
			queryParams = getParamsMap(tempOpt.GetMultipleValues())
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
				err = fmt.Errorf("Option %s is mandatory!", opt.Name)
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

// OptionModel represents option attribute
type OptionModel struct {
	ID              uuid.UUID `json:"id" db:"id"`
	CommandID       uuid.UUID `json:"commandID" db:"commandID"`
	Name            string    `json:"name" db:"name"`
	Value           string    `json:"value" db:"value"`
	ShortName       string    `json:"shortName" db:"shortName"`
	Description     string    `json:"description" db:"description"`
	IsSingleOpt     bool      `json:"isSingleOption" db:"isSingleOption"`
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
	out = strings.Split(o.Value, ",")
	return
}

func (o *OptionModel) GenerateExample() {
	o.Example = o.Name
	if !o.IsSingleOpt {
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

func (opt OptionModel) ExtractValue(cmd CommandModel, msg string) (value string) {
	var optName string
	separator := "="
	if opt.IsSingleOpt {
		separator = " "
	}
	if strings.Contains(msg, opt.Name+separator) {
		optName = opt.Name + separator
	}
	if strings.Contains(msg, opt.ShortName+separator) {
		optName = opt.ShortName + separator
	}

	if optName == "" {
		return
	}
	if opt.IsSingleOpt {
		value = "true"
	} else {
		value = stringLib.StringAfter(msg, optName)
		tempOptName, ok := cmd.OptionsModel.ContainsOption(value)

		for i := 0; i < len(cmd.OptionsModel) && ok; i++ {
			if tempOptName, ok = cmd.OptionsModel.ContainsOption(value); !ok {
				break
			}
			value = strings.Split(value, " "+tempOptName)[0]
		}
	}
	value = strings.TrimSpace(value)
	return
}

// ConstructDynamic to parse dynamic input value
// i.e: value:::option&&value:::option:::description=this is a simple description.:::mandatory:::example=this is an example:::multiple:::encrypted
// value:::option is mandatory, it will throw error if no value or no option
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
		if strings.Contains(v, ":::"+Multiple) {
			tempOpt.IsMultipleValue = true
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

func (o *OptionsModel) ClearCustomValue() {
	for i, opt := range *o {
		if opt.IsCustom {
			(*o)[i].Value = ""
		}
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
			out += fmt.Sprintf("\t%s=\"%s\"\n", opt.Name, tempOptValue)
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
	separatorMultiValue := ","
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
				tempOpt.Value += separatorMultiValue + tempValue
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
func GetDefaultCommands() map[string]CommandModel {
	return map[string]CommandModel{
		CommandHelp: CommandModel{
			Name:        CommandHelp,
			Description: "Show the detail of command",
			Example:     CommandHelp + " <command> @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            OptionCommand,
					ShortName:       ShortOptionCommand,
					Description:     "Show the detail of the command",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionCommand + "=cuk",
				},
				OptionModel{
					Name:            OptionOneLine,
					ShortName:       ShortOptionOneLine,
					Description:     "print command name only",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionOneLine,
				},
				OptionModel{
					Name:            OptionOutputFile,
					ShortName:       ShortOptionOutputFile,
					Description:     "print output data into file [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionOutputFile,
				},
				OptionModel{
					Name:            OptionPrintOptions,
					ShortName:       ShortOptionPrintOptions,
					Description:     "print detail options when executing command",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionPrintOptions,
				},
			},
			IsDefaultCommand: true,
		},
		CommandCuk: CommandModel{
			Name:        CommandCuk,
			Description: "Hit http/https endpoint",
			Example:     CommandCuk + " -m GET -u http://cakcuk.io @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            OptionMethod,
					ShortName:       ShortOptionMethod,
					Value:           "GET",
					Description:     "Http Method [GET,POST,PUT,PATCH,DELETE]",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         OptionMethod + "=GET",
				},
				OptionModel{
					Name:            OptionURL,
					ShortName:       ShortOptionURL,
					Description:     "URL Endpoint",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         OptionURL + "=http://cakcuk.io",
				},
				OptionModel{
					Name:            OptionAuth,
					ShortName:       ShortOptionAuth,
					Description:     "Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsEncrypted:     true,
					Example:         OptionAuth + "=admin:admin123",
				},
				OptionModel{
					Name:            OptionHeaders,
					ShortName:       ShortOptionHeaders,
					Description:     "URL headers. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionHeaders + "=Content-Type:application/json,x-api-key:api-key-value",
				},
				OptionModel{
					Name:            OptionQueryParams,
					ShortName:       ShortOptionQueryParams,
					Description:     "Query params. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionQueryParams + "=type:employee,isNew:true",
				},
				OptionModel{
					Name:            OptionURLParams,
					ShortName:       ShortOptionURLParams,
					Description:     "URL params only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: http://cakcuk.io/blog/{{id}}. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         OptionURLParams + "=id:1",
				},
				OptionModel{
					Name:            OptionBodyParams,
					ShortName:       ShortOptionBodyParams,
					Description:     "Body params. i.e: json, raw text, xml, etc",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionBodyParams + "=type:employee,isNew:true",
				},
				OptionModel{
					Name:            OptionParseResponse,
					ShortName:       ShortOptionParseResponse,
					Description:     "parse json response from http call with given template",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionParseResponse + "={.name}} - {.description}}",
				},
				OptionModel{
					Name:            OptionOutputFile,
					ShortName:       ShortOptionOutputFile,
					Description:     "print output data into file [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionOutputFile,
				},
				OptionModel{
					Name:            OptionPrintOptions,
					ShortName:       ShortOptionPrintOptions,
					Description:     "print detail options when executing command",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         OptionPrintOptions,
				},
			},
			IsDefaultCommand: true,
		},
		CommandCak: CommandModel{
			Name:        CommandCak,
			Description: "Create your custom command",
			Example:     CommandCak + " @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            OptionCommand,
					ShortName:       ShortOptionCommand,
					Description:     "your command name.",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--cmd=run-test",
				},
				OptionModel{
					Name:            OptionDescription,
					ShortName:       ShortOptionDescription,
					Description:     "your command description.",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         OptionDescription + "=to execute the tests",
				},
				OptionModel{
					Name:            OptionMethod,
					ShortName:       ShortOptionMethod,
					Value:           "GET",
					Description:     "Http Method [GET,POST,PUT,PATCH,DELETE]",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					IsHidden:        true,
					Example:         OptionMethod + "=GET",
				},
				OptionModel{
					Name:            OptionURL,
					ShortName:       ShortOptionURL,
					Description:     "URL Endpoint",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					IsHidden:        true,
					Example:         OptionURL + "=http://cakcuk.io",
				},
				OptionModel{
					Name:            OptionAuth,
					ShortName:       ShortOptionAuth,
					Description:     "Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsEncrypted:     true,
					IsHidden:        true,
					Example:         OptionAuth + "=admin:admin123",
				},
				OptionModel{
					Name:            OptionHeaders,
					ShortName:       ShortOptionHeaders,
					Description:     "URL headers. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsHidden:        true,
					Example:         OptionHeaders + "=Content-Type:application/json,x-api-key:api-key-value",
				},
				OptionModel{
					Name:            OptionHeadersDynamic,
					ShortName:       ShortOptionHeadersDynamic,
					Description:     "Create option for dynamic header params. written format: key:::option&&key:::option:::description:::mandatory:::multiple:::encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionHeadersDynamic + "=x-user-id:::--user",
				},
				OptionModel{
					Name:            OptionQueryParams,
					ShortName:       ShortOptionQueryParams,
					Description:     "Query params. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsHidden:        true,
					Example:         OptionQueryParams + "=type:employee,isNew:true",
				},
				OptionModel{
					Name:            OptionQueryParamsDynamic,
					ShortName:       ShortOptionQueryParamsDynamic,
					Description:     "Create option for dynamic query params. written format: key:::option&&key:::option:::description:::mandatory:::multiple:::encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionQueryParamsDynamic + "=type:::--type",
				},
				OptionModel{
					Name:            OptionURLParams,
					ShortName:       ShortOptionURLParams,
					Description:     "URL params only works if the URL contains the key inside double curly brackets {{key}}, see example for URL: http://cakcuk.io/blog/{{id}}. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsHidden:        true,
					Example:         OptionURLParams + "=id:1",
				},
				OptionModel{
					Name:            OptionURLParamsDynamic,
					ShortName:       ShortOptionURLParamsDynamic,
					Description:     "Create option for dynamic url params. written format: key:::option&&key:::option:::description:::mandatory:::multiple:::encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         OptionURLParamsDynamic + "=employeeID:::--employee",
				},
				OptionModel{
					Name:            OptionParseResponse,
					ShortName:       ShortOptionParseResponse,
					Description:     "parse json response from http call with given template",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsHidden:        true,
					Example:         OptionParseResponse + "={.name}} - {.description}}",
				},
				OptionModel{
					Name:            OptionOutputFile,
					ShortName:       ShortOptionOutputFile,
					Description:     "print output data into file [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsHidden:        true,
					Example:         OptionOutputFile,
				},
				OptionModel{
					Name:            OptionPrintOptions,
					ShortName:       ShortOptionPrintOptions,
					Description:     "print detail options when executing command",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsHidden:        true,
					Example:         OptionPrintOptions,
				},
			},
			IsDefaultCommand: true,
		},
	}
}
