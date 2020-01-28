package model

import (
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
	stringLib "cakcuk/utils/string"
	"fmt"
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
)

// CommandModel represents command attribute
type CommandModel struct {
	ID                 uuid.UUID `json:"id" db:"id"`
	TeamID             uuid.UUID `json:"teamID" db:"teamID"`
	Name               string    `json:"name" db:"name"`
	Description        string    `json:"description" db:"description"`
	Example            string    `json:"example" db:"example"`
	CompleteDesciption *string   `json:"completeDescription" db:"completeDescription"`
	IsDefaultCommand   bool      `json:"isDefaultCommand" db:"isDefaultCommand"`
	Created            time.Time `json:"created" db:"created"`
	CreatedBy          string    `json:"createdBy" db:"createdBy"`

	OptionsModel OptionsModel `json:"options"`
}

func (c *CommandModel) Create(createdBy string, teamID uuid.UUID) {
	c.ID = uuid.NewV4()
	c.TeamID = teamID
	c.OptionsModel = append(c.OptionsModel, GetDefaultOptions()...)
	c.OptionsModel.Create(createdBy, c.ID)
}

func (c *CommandModel) AutoGenerateExample(botName string) {
	var optionsExample string
	for _, o := range c.OptionsModel {
		if !o.IsCustom && o.Value != "" {
			continue
		}
		optionsExample += " " + o.Example
	}
	c.Example = c.Name + optionsExample + " @" + botName
	return
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
				err = errorLib.WithMessage(errorcode.MandatoryOptionNeeded, fmt.Sprintf("`%s` option is needed!", opt.Name))
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

func (o OptionModel) GetMultipleValues() (out []string) {
	if !o.IsMultipleValue || o.Value == "" {
		return
	}
	out = strings.Split(o.Value, ",")
	return
}

func (o *OptionModel) AutoGenerateExample() {
	o.Example = o.Name
	if !o.IsSingleOpt {
		o.Example = o.Name + "=value"
	}
	return
}

func (o OptionModel) Print() string {
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
	values := strings.Split(rawValue, "&&")
	if !opt.IsDynamic || len(values) == 0 {
		err = errorLib.WithMessage(errorcode.DynamicValueNeeded, fmt.Sprintf("value for `%s` is needed with the right format. i.e: %s", opt.Name, opt.Example))
		return
	}
	optionAlias := opt.GetOptionAlias()
	for _, v := range values {
		optionFields := strings.Split(v, ":::")
		if len(optionFields) < 2 {
			err = errorLib.WithMessage(errorcode.DynamicValueNeeded, fmt.Sprintf("value for `%s` is needed with the right format. i.e: %s", opt.Name, opt.Example))
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
			tempOpt.AutoGenerateExample()
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
	alias := strings.Replace(opt.Name, "Dynamic", "", 1)
	return &alias
}

type OptionsModel []OptionModel

func (o *OptionsModel) Create(createdBy string, commandID uuid.UUID) {
	for i, _ := range *o {
		(*o)[i].Create(createdBy, commandID)
	}
}

func (o *OptionsModel) EncryptOptionsValue(password string) (err error) {
	for i, opt := range *o {
		if opt.IsEncrypted && opt.Value != "" {
			var encryptedValue string
			if encryptedValue, err = stringLib.Encrypt(opt.Value, password); err != nil {
				return
			}
			(*o)[i].Value = encryptedValue
		}
	}
	return
}

func (o *OptionsModel) DecryptOptionsValue(password string) (err error) {
	for i, opt := range *o {
		if opt.IsEncrypted && opt.Value != "" {
			var decryptedValue string
			if decryptedValue, err = stringLib.Decrypt(opt.Value, password); err != nil {
				return
			}
			(*o)[i].Value = decryptedValue
		}
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
	err := errorLib.WithMessage(errorcode.OptionNotExist, fmt.Sprintf("%s Option is not exist!!", name))
	return OptionModel{}, err
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
	}
	return
}

func (o OptionsModel) ConvertCustomOptionsToCukCmd() CommandModel {
	cukCommand := GetDefaultCommands()["cuk"]
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
		case "--headers", "--queryParams", "--urlParams":
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
		"help": CommandModel{
			Name:        "help",
			Description: "Show the detail of command",
			Example:     "help <command> @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            "--command",
					ShortName:       "-c",
					Description:     "Show the detail of the command",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--cmd=cuk",
				},
				OptionModel{
					Name:            "--oneLine",
					ShortName:       "-ol",
					Description:     "print command name only",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--oneLine",
				},
				OptionModel{
					Name:            "--outputFile",
					ShortName:       "-of",
					Description:     "print output data into file [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--outputFile",
				},
			},
			IsDefaultCommand: true,
		},
		"cuk": CommandModel{
			Name:        "cuk",
			Description: "Hit http/https endpoint",
			Example:     "cuk -m GET -u http://cakcuk.io @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            "--method",
					ShortName:       "-m",
					Value:           "GET",
					Description:     "Http Method [GET,POST,PUT,PATCH,DELETE]",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--method=GET",
				},
				OptionModel{
					Name:            "--url",
					ShortName:       "-u",
					Description:     "URL Endpoint",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--url=http://cakcuk.io",
				},
				OptionModel{
					Name:            "--auth",
					ShortName:       "-a",
					Description:     "Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsEncrypted:     true,
					Example:         "--auth=admin:admin123",
				},
				OptionModel{
					Name:            "--headers",
					ShortName:       "-h",
					Description:     "URL headers. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--headers=Content-Type:application/json,x-api-key:api-key-value",
				},
				OptionModel{
					Name:            "--queryParams",
					ShortName:       "-qp",
					Description:     "Query params. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--queryParams=type:employee,isNew:true",
				},
				OptionModel{
					Name:            "--urlParams",
					ShortName:       "-up",
					Description:     "URL params only works if the URL contains the key inside this sign {{key}}, see example. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "URL: http://cakcuk.io/blog/{{id}}. Command option: --urlParams=id:1",
				},
				OptionModel{
					Name:            "--bodyParams",
					ShortName:       "-bp",
					Description:     "Body params. i.e: json, raw text, xml, etc",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--bodyParams=type:employee,isNew:true",
				},
				OptionModel{
					Name:            "--file",
					ShortName:       "-f",
					Description:     "File upload. Written format: key:file_name",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--file=key:file_name",
				},
				OptionModel{
					Name:            "--pretty",
					ShortName:       "-p",
					Description:     "Pretty print output data - supported type: json format [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--pretty",
				},
				OptionModel{
					Name:            "--outputFile",
					ShortName:       "-of",
					Description:     "print output data into file [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--outputFile",
				},
			},
			IsDefaultCommand: true,
		},
		// TODO:
		"cak": CommandModel{
			Name:        "cak",
			Description: "Create your custom command",
			Example:     "cak @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            "--command",
					ShortName:       "-c",
					Description:     "your command name.",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--cmd=run-test",
				},
				OptionModel{
					Name:            "--description",
					ShortName:       "-d",
					Description:     "your command description.",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--description=to execute the tests",
				},
				OptionModel{
					Name:            "--method",
					ShortName:       "-m",
					Value:           "GET",
					Description:     "Http Method [GET,POST,PUT,PATCH,DELETE]",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--method=GET",
				},
				OptionModel{
					Name:            "--url",
					ShortName:       "-u",
					Description:     "URL Endpoint",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--url=http://cakcuk.io",
				},
				OptionModel{
					Name:            "--auth",
					ShortName:       "-a",
					Description:     "Set Authorization for the request. Supported authorization: basic auth. Auth value will be encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					IsEncrypted:     true,
					Example:         "--auth=admin:admin123",
				},
				OptionModel{
					Name:            "--headers",
					ShortName:       "-h",
					Description:     "URL headers. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--headers=Content-Type:application/json,x-api-key:api-key-value",
				},
				OptionModel{
					Name:            "--headersDynamic",
					ShortName:       "-hDynamic",
					Description:     "Create option for dynamic header params. written format: key:::option&&key:::option::: description:::mandatory:::multiple:::encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         "--headersDynamic=x-user-id:::--user",
				},
				OptionModel{
					Name:            "--queryParams",
					ShortName:       "-qp",
					Description:     "Query params. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--queryParams=type:employee,isNew:true",
				},
				OptionModel{
					Name:            "--queryParamsDynamic",
					ShortName:       "-qpDynamic",
					Description:     "Create option for dynamic query params. written format: key:::option&&key:::option::: description:::mandatory:::multiple:::encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         "--queryParamsDynamic=type:::--type",
				},
				OptionModel{
					Name:            "--urlParams",
					ShortName:       "-up",
					Description:     "URL params only works if the URL contains the key inside this sign {{key}}",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "URL: http://cakcuk.io/blog/{{id}}. Command option: --urlParams=id:1",
				},
				OptionModel{
					Name:            "--urlParamsDynamic",
					ShortName:       "-upDynamic",
					Description:     "Create option for dynamic url params. written format: key:::option&&key:::option::: description:::mandatory:::multiple:::encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         "--urlParamsDynamic=employeeID:::--employee",
				},
				OptionModel{
					Name:            "--pretty",
					ShortName:       "-p",
					Description:     "Pretty print output data - supported type: json format [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--pretty",
				},
				OptionModel{
					Name:            "--outputFile",
					ShortName:       "-of",
					Description:     "print output data into file [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--outputFile",
				},
			},
			IsDefaultCommand: true,
		},
	}
}

func GetDefaultOptions() (out OptionsModel) {
	out = []OptionModel{
		OptionModel{
			Name:            "--pretty",
			ShortName:       "-p",
			Description:     "Pretty print output data - supported type: json format [Single Option]",
			IsSingleOpt:     true,
			IsMandatory:     false,
			IsMultipleValue: false,
			Example:         "--pretty",
		},
		OptionModel{
			Name:            "--outputFile",
			ShortName:       "-of",
			Description:     "print output data into file [Single Option]",
			IsSingleOpt:     true,
			IsMandatory:     false,
			IsMultipleValue: false,
			Example:         "--outputFile",
		},
	}
	return
}
