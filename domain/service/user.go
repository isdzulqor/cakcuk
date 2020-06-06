package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/errors"
	stringLib "cakcuk/utils/string"
	"context"
	"fmt"

	uuid "github.com/satori/go.uuid"
	"github.com/slack-go/slack"
)

type UserService struct {
	Config         *config.Config           `inject:""`
	UserRepository repository.UserInterface `inject:""`
	SlackClient    *external.SlackClient    `inject:""`
}

func (s *UserService) Set(ctx context.Context, createdBy, source string, teamID uuid.UUID, userReferenceIDs []string, isFirstSet bool) (out model.UsersModel, err error) {
	// first time to set super user
	if isFirstSet {
		if !stringLib.StringContains(userReferenceIDs, createdBy) {
			userReferenceIDs = append(userReferenceIDs, createdBy)
		}
	}

	switch source {
	case model.SourceSlack:
		var slackUsers *[]slack.User = new([]slack.User)
		if len(userReferenceIDs) > 0 {
			if slackUsers, err = s.SlackClient.API.GetUsersInfoContext(ctx, userReferenceIDs...); err != nil {
				return
			}
		}
		if err = out.CreateFromSlack(*slackUsers, createdBy, teamID); err != nil {
			return
		}
	case model.SourcePlayground:
		if err = out.CreateFromPlayground(userReferenceIDs, createdBy, teamID); err != nil {
			return
		}
	}

	err = s.UserRepository.InsertUsers(ctx, out...)
	return
}

func (s *UserService) Delete(ctx context.Context, teamID uuid.UUID, deletedUserReferenceIDs []string) (out model.UsersModel, err error) {
	if len(deletedUserReferenceIDs) == 0 {
		err = fmt.Errorf("No users to be deleted!")
		return
	}

	var users model.UsersModel
	if users, err = s.UserRepository.GetUsersByReferenceIDs(ctx, teamID, deletedUserReferenceIDs); err != nil {
		return
	}

	if err = s.UserRepository.DeleteUsers(ctx, users...); err != nil {
		return
	}
	out = users
	return
}

// Validate super user mode is enabled and has super user access except for first setup
func (s *UserService) Validate(ctx context.Context, userReferenceID string, teamID uuid.UUID) (isFirstSet bool, err error) {
	if !s.Config.SuperUserModeEnabled {
		err = fmt.Errorf("Super user mode is disabled. It's only can be enabled via environment variable.")
		return
	}

	var users model.UsersModel
	if users, err = s.UserRepository.GetUsersByTeamID(ctx, teamID, repository.DefaultFilter()); err == nil {
		if _, err = users.GetByUserReferenceID(userReferenceID); err != nil {
			err = fmt.Errorf("User for %s is not allowed!", model.MentionSlack(userReferenceID))
		}
		return
	}
	if err == errorLib.ErrorNotExist {
		isFirstSet = true
		err = nil
	}
	return
}
