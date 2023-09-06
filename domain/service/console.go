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
		inputSSH.SSHKey, err = s.encryptSSH(inputSSH.SSHKey, inputSSH.Salt)
		if err != nil {
			return nil, fmt.Errorf("unable to encrypt SSH key: %v", err)
		}
	}
	if inputSSH.Password != "" {
		inputSSH.Password, err = s.encryptSSH(inputSSH.Password, inputSSH.Salt)
		if err != nil {
			return nil, fmt.Errorf("unable to encrypt SSH password: %v", err)
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

func (s *ConsoleService) GetSSHByID(ctx context.Context, sshID string) (*model.SSH, error) {
	ssh, err := s.SSHRepository.GetSSHbyID(ctx, uuid.FromStringOrNil(sshID))
	if err != nil {
		return nil, fmt.Errorf("unable to get SSH by ID: %v", err)
	}
	if ssh.Password != "" {
		ssh.Password, err = s.decryptSSHKey(ssh.Password, ssh.Salt)
		if err != nil {
			return nil, fmt.Errorf("unable to decrypt SSH password: %v", err)
		}
	}

	if ssh.SSHKey != "" {
		ssh.SSHKey, err = s.decryptSSHKey(ssh.SSHKey, ssh.Salt)
		if err != nil {
			return nil, fmt.Errorf("unable to decrypt SSH key: %v", err)
		}
	}

	return ssh, nil
}

func (s *ConsoleService) encryptSSH(value, salt string) (string, error) {
	tobeEncrypted := salt + value + salt
	encryptSSHKey, err := stringLib.Encrypt(tobeEncrypted, s.Config.EncryptionPassword)
	if err != nil {
		return "", fmt.Errorf("unable to encrypt SSH key: %v", err)
	}
	return encryptSSHKey, nil
}

func (s *ConsoleService) decryptSSHKey(encryptValue, salt string) (string, error) {
	decryptSSHKey, err := stringLib.Decrypt(encryptValue, s.Config.EncryptionPassword)
	if err != nil {
		return "", fmt.Errorf("unable to decrypt SSH key: %v", err)
	}
	sshKey := strings.Replace(decryptSSHKey, salt, "", -1)

	return sshKey, nil
}
