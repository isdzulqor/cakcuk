package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	stringLib "cakcuk/utils/string"
	"context"
	"fmt"
	"strings"

	uuid "github.com/satori/go.uuid"
)

const (
	botNameConsole = "cakcuk"
)

type ConsoleService struct {
	Config         *config.Config          `inject:""`
	CommandService *CommandService         `inject:""`
	TeamService    *TeamService            `inject:""`
	ScopeService   *ScopeService           `inject:""`
	SSHRepository  repository.SSHInterface `inject:""`
}

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

func (s *ConsoleService) AddSSH(ctx context.Context, authSign model.AuthSign, inputSSH model.SSH) (*model.SSH, error) {
	teamInfo, err := s.TeamService.GetTeamInfo(ctx, authSign.TeamID)
	if err != nil {
		return nil, fmt.Errorf("unable to get team info: %v", err)
	}
	inputSSH.Salt = uuid.NewV4().String()
	inputSSH.TeamID = teamInfo.ID

	if inputSSH.SSHKey != "" {
		inputSSH.SSHKey, err = s.encryptSSHKey(inputSSH.SSHKey, inputSSH.Salt)
		if err != nil {
			return nil, fmt.Errorf("unable to encrypt SSH key: %v", err)
		}
	}

	id, err := s.SSHRepository.InsertSSH(ctx, inputSSH)
	if err != nil {
		return nil, fmt.Errorf("unable to insert SSH: %v", err)
	}
	return &model.SSH{
		ID:        id,
		TeamID:    inputSSH.TeamID,
		Host:      inputSSH.Host,
		Port:      inputSSH.Port,
		Password:  inputSSH.Password,
		SSHKey:    inputSSH.SSHKey,
		Salt:      inputSSH.Salt,
		Created:   inputSSH.Created,
		CreatedBy: inputSSH.CreatedBy,
	}, nil
}

func (s *ConsoleService) encryptSSHKey(sshKey, salt string) (string, error) {
	tobeEncrypted := salt + sshKey + salt
	encryptSSHKey, err := stringLib.Encrypt(tobeEncrypted, s.Config.EncryptionPassword)
	if err != nil {
		return "", fmt.Errorf("unable to encrypt SSH key: %v", err)
	}
	return encryptSSHKey, nil
}

func (s *ConsoleService) decryptSSHKey(encryptSSHKey, salt string) (string, error) {
	decryptSSHKey, err := stringLib.Decrypt(encryptSSHKey, s.Config.EncryptionPassword)
	if err != nil {
		return "", fmt.Errorf("unable to decrypt SSH key: %v", err)
	}
	sshKey := strings.Replace(decryptSSHKey, salt, "", -1)

	return sshKey, nil
}
