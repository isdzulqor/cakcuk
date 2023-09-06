package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"context"
)

const (
	botNameConsole = "cakcuk"
)

type ConsoleService struct {
	Config         *config.Config  `inject:""`
	CommandService *CommandService `inject:""`
	TeamService    *TeamService    `inject:""`
	ScopeService   *ScopeService   `inject:""`
}

// TODO: implement this
func (s *ConsoleService) Exec(ctx context.Context, msg string, authSign model.AuthSign) (out model.PlaygroundModel, err error) {
	var cmdResponse model.CommandResponseModel
	out.Input = msg
	cmdResponse.Team, err = s.TeamService.GetTeamInfo(ctx, authSign.TeamID)
	if err != nil {
		err = out.FromError(err)
		return
	}

	if cmdResponse, err = s.CommandService.Prepare(ctx, msg, authSign.UserID, cmdResponse.Team.ReferenceID,
		botNameConsole, model.SourcePlayground, nil); err != nil {
		err = out.FromError(err)
		return
	}
	out.ExecutedCommand = cmdResponse.Command.GetExecutedCommand(true)
	if cmdResponse.IsHelp {
		out.Result = cmdResponse.Message
		return
	}
	if cmdResponse, err = s.CommandService.Exec(ctx, cmdResponse, botNameConsole, authSign.UserID); err != nil {
		err = out.FromError(err)
		return
	}

	out.RawRequest = cmdResponse.DumpRequest
	out.RawResponse = cmdResponse.RawResponse
	out.Result = cmdResponse.Message
	return
}
