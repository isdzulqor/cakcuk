package model

import (
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
	stringLib "cakcuk/utils/string"
	"fmt"
	"strings"
)

// CommandModel represents command attribute
type CommandModel struct {
	Name               string
	Description        string
	Example            string
	OptionModels       OptionModels
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
	out += c.OptionModels.Print()
	if isCompleteDescription && c.CompleteDesciption != nil {
		out = fmt.Sprintf("%sDescription\n%s", out, c.CompleteDesciption)
	}
	return
}

// Extract to get options from user input
func (c *CommandModel) Extract(msg *string) (err error) {
	*msg = strings.TrimSpace(strings.Replace(*msg, c.Name, "", -1))

	if c.OptionModels != nil {
		for i, opt := range c.OptionModels {
			var value string
			if strings.Contains(*msg, opt.Name) {
				if opt.IsSingleOpt {
					value = "\"true\""
				} else {
					value = stringLib.StringAfter(*msg, opt.Name+" ")
					if strings.Contains(value, " ") {
						value = strings.Split(value, " ")[0]
					}
				}
			} else if strings.Contains(*msg, opt.ShortName) {
				if opt.IsSingleOpt {
					value = "\"true\""
				} else {
					value = stringLib.StringAfter(*msg, opt.ShortName+" ")
					if strings.Contains(value, " ") {
						value = strings.Split(value, " ")[0]
					}
				}
			}
			if opt.IsMandatory && value == "" {
				err = errorLib.WithMessage(errorcode.MandatoryOptionNeeded, fmt.Sprintf("`%s` option is needed!", opt.Name))
				return
			}
			value = strings.Replace(value, "\"", "", -1)
			opt.Value = value
			c.OptionModels[i] = opt
		}
	}
	return
}

type CommandModels []CommandModel

func (c CommandModels) Print(botName string) (out string) {
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
	Example         string
}

func (o OptionModel) GetMultipleValues() (out []string) {
	if !o.IsMultipleValue || o.Value == "" {
		return
	}
	out = strings.Split(o.Value, ",")
	return
}

func (o OptionModel) Print() string {
	typeOptionModel := "[MANDATORY]"
	if o.IsSingleOpt {
		typeOptionModel = "[OPTIONAL]"
	}
	return fmt.Sprintf("\t\t%s, %s \t%s %s\n\t\t\tExample: %s\n", o.Name, o.ShortName, typeOptionModel, o.Description, o.Example)
}

type OptionModels []OptionModel

func (o OptionModels) GetOptionByName(name string) (OptionModel, error) {
	for _, opt := range o {
		if opt.Name == name {
			return opt, nil
		}
	}
	err := errorLib.WithMessage(errorcode.OptionNotExist, "Option not exist!!")
	return OptionModel{}, err
}

func (o OptionModels) PrintValuedOptions() (out string) {
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

func (o OptionModels) Print() (out string) {
	for _, opt := range o {
		out += opt.Print()
	}
	if out != "" {
		out = fmt.Sprintf("\n\tOPTIONS\n%s", out)
	}
	return
}

func InitDefaultCommands() map[string]CommandModel {
	var slackCommands map[string]CommandModel = map[string]CommandModel{
		"help": CommandModel{
			Name:        "help",
			Description: "Show the detail of command",
			Example:     "help <command> @<botname>",
			OptionModels: OptionModels{
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
					Description:     "print output data into file [Single OptionModel]",
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
			OptionModels: OptionModels{
				OptionModel{
					Name:            "--method",
					ShortName:       "-m",
					Description:     "Method [GET,POST,PUT]",
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
					Description:     "URL headers - key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--headers Content-Type:application/json,x-api-key:api-key-value",
				},
				OptionModel{
					Name:            "--queryParams",
					ShortName:       "-qp",
					Description:     "URL Query params - key:value - separated by comma with no space for multiple values",
					IsSingleOpt:     false,
					IsMandatory:     false,
					IsMultipleValue: true,
					Example:         "--queryParams type:employee,isNew:true",
				},
				OptionModel{
					Name:            "--pretty",
					ShortName:       "-p",
					Description:     "Pretty print output data - supported type: json format [Single OptionModel]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--pretty",
				},
				OptionModel{
					Name:            "--outputFile",
					ShortName:       "-of",
					Description:     "print output data into file [Single OptionModel]",
					IsSingleOpt:     true,
					IsMandatory:     false,
					IsMultipleValue: false,
					Example:         "--outputFile",
				},
			},
		},
	}
	return slackCommands
}
