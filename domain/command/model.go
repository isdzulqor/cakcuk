package command

import (
	"cakcuk/errorcode"
	errorLib "cakcuk/utils/error"
	"fmt"
)

// Command represents command attribute
type Command struct {
	Cmd                string
	Description        string
	Example            string
	Options            Options
	CompleteDesciption *string
}

func (c Command) Validate() (err error) {
	cmd, ok := SlackCommands[c.Cmd]
	if !ok {
		err = errorLib.New(errorcode.CommandNotRegistered)
		return
	}
	fmt.Println(cmd.Cmd)
	return err
}

// Option represents option attribute
type Option struct {
	Option      string
	ShortOption string
	Description string
	IsSingleOpt bool
	Example     string
}

type Options []Option

// SlackCommands contain list of commands those are registered
var SlackCommands map[string]Command = map[string]Command{
	"help": Command{
		Cmd:         "help",
		Description: "Show the detail of command",
		Example:     "help <command> @<botname>",
	},
	"cuk": Command{
		Cmd:         "cuk",
		Description: "Hit http/https endpoint",
		Example:     "cuk -m GET -u http://cakcuk.io @<botname>",
		Options: Options{
			Option{
				Option:      "--method",
				ShortOption: "-m",
				Description: "Method [GET,POST,PUT]",
				Example:     "--method GET",
			},
			Option{
				Option:      "--url",
				ShortOption: "-u",
				Description: "URL Endpoint",
				Example:     "--url http://cakcuk.io",
			},
		},
	},
}
