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

// TODO: remove SlackClient, make it more generic
type UserService struct {
	Config         *config.Config           `inject:""`
	UserRepository repository.UserInterface `inject:""`
	SlackClient    *external.SlackClient    `inject:""`
}

// TODO: validation super_user mode is enabled
func (s *UserService) Set(ctx context.Context, createdBy string, teamID uuid.UUID, userReferenceIDs []string) (out model.UsersModel, err error) {
	var isFirstSet bool
	if isFirstSet, err = s.validate(ctx, createdBy, teamID); err != nil {
		return
	}

	// first time to set super user
	if isFirstSet {
		if !stringLib.StringContains(userReferenceIDs, createdBy) {
			userReferenceIDs = append(userReferenceIDs, createdBy)
		}
	}

	var slackUsers *[]slack.User = new([]slack.User)
	if len(userReferenceIDs) > 0 {
		if slackUsers, err = s.SlackClient.API.GetUsersInfoContext(ctx, userReferenceIDs...); err != nil {
			return
		}
	}
	if err = out.Create(*slackUsers, createdBy, teamID); err != nil {
		return
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

// validate set super user
func (s *UserService) validate(ctx context.Context, userReferenceID string, teamID uuid.UUID) (isFirstSet bool, err error) {
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
