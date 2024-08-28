package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/utils/commandutil"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"encoding/base64"
	"fmt"

	uuid "github.com/satori/go.uuid"
	"golang.org/x/net/context"
	"gopkg.in/yaml.v3"
)

const (
	userYaml = "yaml"
)

type YamlService struct {
	Config         *config.Config  `inject:""`
	CommandService *CommandService `inject:""`
	TeamService    *TeamService    `inject:""`
	ConsoleService *ConsoleService `inject:""`
}

func (s *YamlService) Load(ctx context.Context, yamlData []byte, teamInfo model.TeamModel) error {
	var config configuration
	err := yaml.Unmarshal(yamlData, &config)
	if err != nil {
		return fmt.Errorf("failed to unmarshal yaml: %w", err)
	}
	for _, sshConfig := range config.SSHs {
		if sshConfig.SSHKey != "" {
			rawDecodedText, err := base64.StdEncoding.DecodeString(sshConfig.SSHKey)
			if err != nil {
				return fmt.Errorf("failed to decode ssh key: %w", err)
			}
			sshConfig.SSHKey = string(rawDecodedText)
		}

		ssh := model.SSH{
			ID:        sshConfig.ID,
			TeamID:    teamInfo.ID,
			Username:  sshConfig.Username,
			Host:      sshConfig.Host,
			Port:      sshConfig.Port,
			SSHKey:    sshConfig.SSHKey,
			Salt:      uuid.NewV4().String(),
			CreatedBy: teamInfo.CreatedBy,
		}
		_, err = s.ConsoleService.AddSSH(ctx, model.AuthSign{
			TeamID: teamInfo.ReferenceID,
		}, ssh)
		if err != nil {
			// ignore if already exists
			if err == errorLib.ErrorAlreadyExists {
				continue
			}
			return fmt.Errorf("failed to add ssh: %w", err)
		}
	}

	for _, command := range config.Commands {
		if commandutil.IsBotMentioned(&command) {
			commandutil.SanitizeWords(&command)
		}
		cmdResponse, err := s.CommandService.Prepare(ctx, command, userYaml, teamInfo.ReferenceID,
			botName, model.SourceYaml, model.SourceYaml, nil)
		if err != nil {
			return fmt.Errorf("failed to prepare command: %w", err)
		}

		if cmdResponse, err = s.CommandService.Exec(ctx, cmdResponse, botName, userYaml, model.SourceYaml); err != nil {
			return fmt.Errorf("failed to exec command: %w", err)
		}

		logging.Logger(ctx).Info("Command executed successfully: ", cmdResponse.Message)
	}

	return nil
}

type sshConfig struct {
	ID       string `yaml:"ID"`
	Host     string `yaml:"Host"`
	Port     int    `yaml:"Port"`
	Username string `yaml:"Username"`
	SSHKey   string `yaml:"SSHKey"`
}

type configuration struct {
	SSHs     []sshConfig `yaml:"SSHs"`
	Commands []string    `yaml:"Commands"`
}
