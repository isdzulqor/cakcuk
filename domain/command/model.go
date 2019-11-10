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
			out += fmt.Sprintf(" %s \"%s\"", opt.Name, opt.Value)
		}
	}
	if out != "" {
		out = fmt.Sprintf("\nOptions:%s", out)
	}
	return
}

// SlackCommands contain list of commands those are registered
var SlackCommands map[string]Command = map[string]Command{
	"help": Command{
		Name:        "help",
		Description: "Show the detail of command",
		Example:     "help <command> @<botname>",
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
				Description:     "URL headers - key:value",
				IsSingleOpt:     false,
				IsMandatory:     false,
				IsMultipleValue: true,
				Example:         "--headers Content-Type:application/json,x-api-key:api-key-value",
			},
		},
	},
}
