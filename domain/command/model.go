package command

import (
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
	stringLib "cakcuk/utils/string"
	"fmt"
	"strings"
)

// Command represents command attribute
type Command struct {
	Name               string
	Description        string
	Example            string
	Options            Options
	CompleteDesciption *string
}

func (c Command) Print(botName string) string {
	return c.printDetail(botName, false)
}

func (c Command) PrintWithDescription(botName string) string {
	return c.printDetail(botName, true)
}

func (c Command) printDetail(botName string, isCompleteDescription bool) (out string) {
	out = fmt.Sprintf("- %s [options] @%s\n\t%s", c.Name, botName, c.Description)
	out += c.Options.Print()
	if isCompleteDescription && c.CompleteDesciption != nil {
		out = fmt.Sprintf("%sDescription\n%s", out, c.CompleteDesciption)
	}
	return
}

// Extract to get options from user input
func (c *Command) Extract(msg *string) (err error) {
	*msg = strings.TrimSpace(strings.Replace(*msg, c.Name, "", -1))

	if c.Options != nil {
		for i, opt := range c.Options {
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
			c.Options[i] = opt
		}
	}
	return
}

type Commands []Command

func (c Commands) Print(botName string) (out string) {
	for _, cmd := range c {
		out += fmt.Sprintf("%s\n", cmd.Print(botName))
	}
	return
}

// Option represents option attribute
type Option struct {
	Name            string
	Value           string
	ShortName       string
	Description     string
	IsSingleOpt     bool
	IsMandatory     bool
	IsMultipleValue bool
	Example         string
}

func (o Option) GetMultipleValues() (out []string) {
	if !o.IsMultipleValue || o.Value == "" {
		return
	}
	out = strings.Split(o.Value, ",")
	return
}

func (o Option) Print() string {
	typeOption := "[MANDATORY]"
	if o.IsSingleOpt {
		typeOption = "[OPTIONAL]"
	}
	return fmt.Sprintf("\t\t%s, %s \t%s %s\n\t\t\tExample: %s\n", o.Name, o.ShortName, typeOption, o.Description, o.Example)
}

type Options []Option

func (o Options) GetOptionByName(name string) (Option, error) {
	for _, opt := range o {
		if opt.Name == name {
			return opt, nil
		}
	}
	err := errorLib.WithMessage(errorcode.OptionNotExist, "Option not exist!!")
	return Option{}, err
}

func (o Options) PrintValuedOptions() (out string) {
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

func (o Options) Print() (out string) {
	for _, opt := range o {
		out += opt.Print()
	}
	if out != "" {
		out = fmt.Sprintf("\n\tOPTIONS\n%s", out)
	}
	return
}

// TODO: add help functionality
// TODO: add option for printing to file instead of chat
// TODO: that option will be sticked on each command by default
// slackCommands contain list of commands those are registered
var slackCommands map[string]Command = map[string]Command{
	"help": Command{
		Name:        "help",
		Description: "Show the detail of command",
		Example:     "help <command> @<botname>",
		Options: Options{
			Option{
				Name:            "--command",
				ShortName:       "-c",
				Description:     "Show the detail of the command",
				IsSingleOpt:     false,
				IsMandatory:     false,
				IsMultipleValue: true,
				Example:         "--cmd",
			},
			Option{
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
	"cuk": Command{
		Name:        "cuk",
		Description: "Hit http/https endpoint",
		Example:     "cuk -m GET -u http://cakcuk.io @<botname>",
		Options: Options{
			Option{
				Name:            "--method",
				ShortName:       "-m",
				Description:     "Method [GET,POST,PUT]",
				IsSingleOpt:     false,
				IsMandatory:     true,
				IsMultipleValue: false,
				Example:         "--method GET",
			},
			Option{
				Name:            "--url",
				ShortName:       "-u",
				Description:     "URL Endpoint",
				IsSingleOpt:     false,
				IsMandatory:     true,
				IsMultipleValue: false,
				Example:         "--url http://cakcuk.io",
			},
			Option{
				Name:            "--headers",
				ShortName:       "-h",
				Description:     "URL headers - key:value - separated by comma with no space for multiple values",
				IsSingleOpt:     false,
				IsMandatory:     false,
				IsMultipleValue: true,
				Example:         "--headers Content-Type:application/json,x-api-key:api-key-value",
			},
			Option{
				Name:            "--queryParams",
				ShortName:       "-qp",
				Description:     "URL Query params - key:value - separated by comma with no space for multiple values",
				IsSingleOpt:     false,
				IsMandatory:     false,
				IsMultipleValue: true,
				Example:         "--queryParams type:employee,isNew:true",
			},
			Option{
				Name:            "--pretty",
				ShortName:       "-p",
				Description:     "Pretty print output data - supported type: json format [Single Option]",
				IsSingleOpt:     true,
				IsMandatory:     false,
				IsMultipleValue: false,
				Example:         "--pretty",
			},
			Option{
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
