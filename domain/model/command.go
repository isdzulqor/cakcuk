package model

import (
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
	stringLib "cakcuk/utils/string"
	"fmt"
	"strings"
)

const (
	DESCRIPTION = "description"
	MANDATORY   = "mandatory"
	ENCRYPTED   = "encrypted"
	MULTIPLE    = "multiple"
)

// CommandModel represents command attribute
type CommandModel struct {
	Name               string
	Description        string
	Example            string
	OptionsModel       OptionsModel
	CompleteDesciption *string
}

func (c CommandModel) Print(botName string) string {
	return c.printDetail(botName, false)
}

func (c CommandModel) PrintWithDescription(botName string) string {
	return c.printDetail(botName, true)
}

func (c CommandModel) printDetail(botName string, isCompleteDescription bool) (out string) {
	out = fmt.Sprintf("- %s [options] @%s\n\t%s", c.Name, botName, c.Description)
	out += c.OptionsModel.Print()
	if isCompleteDescription && c.CompleteDesciption != nil {
		out = fmt.Sprintf("%sDescription\n%s", out, c.CompleteDesciption)
	}
	return
}

// Extract to get options from user input
func (c *CommandModel) Extract(msg *string) (err error) {
	*msg = strings.TrimSpace(strings.Replace(*msg, c.Name, "", 1))
	if c.OptionsModel != nil {
		for i, opt := range c.OptionsModel {
			value := opt.ExtractValue(*c, *msg)
			if opt.IsMandatory && value == "" {
				err = errorLib.WithMessage(errorcode.MandatoryOptionNeeded, fmt.Sprintf("`%s` option is needed!", opt.Name))
				return
			}
			opt.Value = value
			c.OptionsModel[i] = opt
		}
	}
	return
}

type CommandsModel []CommandModel

func (c CommandsModel) Print(botName string) (out string) {
	for _, cmd := range c {
		out += fmt.Sprintf("%s\n", cmd.Print(botName))
	}
	return
}

// OptionModel represents option attribute
type OptionModel struct {
	Name            string
	Value           string
	ShortName       string
	Description     string
	IsSingleOpt     bool
	IsMandatory     bool
	IsMultipleValue bool
	IsDynamic       bool
	IsEncrypted     bool
	IsCustom        bool
	Example         string
	OptionAlias     *string
	ValueDynamic    *string
}

func (o OptionModel) GetMultipleValues() (out []string) {
	if !o.IsMultipleValue || o.Value == "" {
		return
	}
	out = strings.Split(o.Value, ",")
	return
}

func (o OptionModel) Print() string {
	typeOptionModel := "[OPTIONAL]"
	if o.IsMandatory {
		typeOptionModel = "[MANDATORY]"
	}
	return fmt.Sprintf("\t\t%s, %s \t%s %s\n\t\t\tExample: %s\n", o.Name, o.ShortName, typeOptionModel, o.Description, o.Example)
}

func (opt OptionModel) ExtractValue(cmd CommandModel, msg string) (value string) {
	var optName string
	if strings.Contains(msg, opt.Name) {
		optName = opt.Name
	}
	if strings.Contains(msg, opt.ShortName) {
		optName = opt.ShortName
	}
	if optName == "" {
		return
	}
	if opt.IsSingleOpt {
		value = "true"
	} else {
		separator := " "
		value = stringLib.StringAfter(msg, optName+separator)
		tempOptName, ok := cmd.OptionsModel.ContainsOption(value)

		for i := 0; i < len(cmd.OptionsModel) && ok; i++ {
			if tempOptName, ok = cmd.OptionsModel.ContainsOption(value); !ok {
				break
			}
			value = strings.Split(value, " "+tempOptName)[0]
		}
	}
	return
}

// ConstructDynamic to parse dynamic input value
// i.e: value:::option&&value:::option:::description=this is a simple description.:::mandatory:::multiple:::encrypted
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
		}
		if strings.Contains(v, ":::"+DESCRIPTION+"=") {
			tempOpt.Description = stringLib.StringAfter(v, ":::"+DESCRIPTION+"=")
			if strings.Contains(tempOpt.Description, ":::") {
				tempOpt.Description = strings.Split(tempOpt.Description, ":::")[0]
			}
		}
		if strings.Contains(v, ":::"+MANDATORY) {
			tempOpt.IsMandatory = true
		}
		if strings.Contains(v, ":::"+MULTIPLE) {
			tempOpt.IsMultipleValue = true
		}
		if strings.Contains(v, ":::"+ENCRYPTED) {
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
	err := errorLib.WithMessage(errorcode.OptionNotExist, "Option not exist!!")
	return OptionModel{}, err
}

func (o OptionsModel) PrintValuedOptions() (out string) {
	for _, opt := range o {
		if opt.Value != "" {
			out += fmt.Sprintf("\t%s \"%s\"\n", opt.Name, opt.Value)
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

func (o OptionsModel) ConvertCustomOptionsToCukCmd(cukCommand CommandModel) CommandModel {
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

		// TODO: need to build value
		switch tempOpt.Name {
		case "--headers", "--queryParams", "--urlParams":
			tempValue := opt.Value
			if opt.IsCustom {
				tempValue = *opt.ValueDynamic + ":" + opt.Value
			}
			if !strings.Contains(tempOpt.Value, tempValue) && tempOpt.Value != "" {
				tempOpt.Value += separatorMultiValue + tempValue
			} else {
				tempOpt.Value = tempValue
			}

		case "--bodyParams":
			tempOpt.Value = opt.Value
		}
		cukCommand.OptionsModel.UpdateOption(tempOpt)
	}

	return cukCommand
}

// TODO: --file behaviour
func InitDefaultCommands() map[string]CommandModel {
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
					Example:         "--cmd",
				},
				OptionModel{
					Name:            "--outputFile",
					ShortName:       "-of",
					Description:     "print output data into file [Single Option]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--outputFile",
				},
			},
		},
		"cuk": CommandModel{
			Name:        "cuk",
			Description: "Hit http/https endpoint",
			Example:     "cuk -m GET -u http://cakcuk.io @<botname>",
			OptionsModel: OptionsModel{
				OptionModel{
					Name:            "--method",
					ShortName:       "-m",
					Description:     "Http Method [GET,POST,PUT,PATCH,DELETE]",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--method GET",
				},
				OptionModel{
					Name:            "--url",
					ShortName:       "-u",
					Description:     "URL Endpoint",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--url http://cakcuk.io",
				},
				OptionModel{
					Name:            "--headers",
					ShortName:       "-h",
					Description:     "URL headers. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--headers Content-Type:application/json,x-api-key:api-key-value",
				},
				OptionModel{
					Name:            "--queryParams",
					ShortName:       "-qp",
					Description:     "Query params. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--queryParams type:employee,isNew:true",
				},
				OptionModel{
					Name:            "--urlParams",
					ShortName:       "-up",
					Description:     "URL params only works if the URL contains the key inside this sign {{key}}, see example. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "URL: http://cakcuk.io/blog/{{id}}. Command option: --urlParams id:1",
				},
				OptionModel{
					Name:            "--bodyParams",
					ShortName:       "-bp",
					Description:     "Body params. i.e: json, raw text, xml, etc",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--bodyParams type:employee,isNew:true",
				},
				OptionModel{
					Name:            "--file",
					ShortName:       "-f",
					Description:     "File upload. Written format: key:file_name",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--file key:file_name",
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
		},
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
					Example:         "--cmd run-test",
				},
				OptionModel{
					Name:            "--method",
					ShortName:       "-m",
					Description:     "Http Method [GET,POST,PUT,PATCH,DELETE]",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--method GET",
				},
				OptionModel{
					Name:            "--url",
					ShortName:       "-u",
					Description:     "URL Endpoint",
					IsSingleOpt:     false,
					IsMandatory:     true,
					IsMultipleValue: false,
					Example:         "--url http://cakcuk.io",
				},
				OptionModel{
					Name:            "--queryParams",
					ShortName:       "-qp",
					Description:     "Query params. written format: key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--queryParams type:employee,isNew:true",
				},
				OptionModel{
					Name:            "--queryParamsDynamic",
					ShortName:       "-qpDynamic",
					Description:     "Create option for dynamic query params. written format: key:::option&&key:::option::: description:::mandatory:::multiple:::encrypted",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					IsDynamic:       true,
					Example:         "--queryParamsDynamic type:::--type",
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
		},
	}
}
