package model

import (
	errorLib "cakcuk/utils/errors"
)

var (
	PlaygroundBlacklistedCommands = func() []string {
		return []string{CommandSuperUser}
	}
)

type PlaygroundModel struct {
	Input           string `json:"input"`
	ExecutedCommand string `json:"executedCommand"`
	RawRequest      string `json:"rawRequest"`
	Result          string `json:"result"`
	RawResponse     string `json:"rawResponse"`
	IsError         bool   `json:"isError"`
}

func (p *PlaygroundModel) FromError(in error) error {
	p.IsError = true
	p.Result = "[FAILED] " + errorLib.GetMessageOnly(in).Error()
	return nil
}
