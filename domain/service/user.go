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
	"time"

	uuid "github.com/satori/go.uuid"
)

type UserService struct {
	Config         *config.Config           `inject:""`
	UserRepository repository.UserInterface `inject:""`
	SlackClient    *external.SlackClient    `inject:""`
}

func (s *UserService) Set(ctx context.Context, createdBy, source string, teamInfo model.TeamModel, userReferenceIDs []string, isFirstSet bool) (out model.UsersModel, err error) {
	// first time to set Superuser
	if isFirstSet {
		if !stringLib.StringContains(userReferenceIDs, createdBy) {
			userReferenceIDs = append(userReferenceIDs, createdBy)
		}
	}

	if out, err = s.CreateFromSourceNoInsert(ctx, createdBy, source, teamInfo, userReferenceIDs); err != nil {
		return
	}
	err = s.UserRepository.InsertUsers(ctx, out...)
	return
}

func (s *UserService) CreateFromSourceNoInsert(ctx context.Context, createdBy, source string, teamInfo model.TeamModel, userReferenceIDs []string) (out model.UsersModel, err error) {
	if len(userReferenceIDs) == 0 {
		err = fmt.Errorf("No user reference IDs to be created")
		return
	}

	switch source {
	case model.SourceSlack:
		var slackUsers []external.SlackUserCustom
		if slackUsers, err = s.SlackClient.CustomAPI.GetUsersInfo(ctx, &teamInfo.ReferenceToken, userReferenceIDs); err != nil {
			return
		}
		if err = out.CreateFromSlackCustom(slackUsers, createdBy, teamInfo.ID); err != nil {
			return
		}
	case model.SourcePlayground:
		if err = out.CreateFromPlayground(userReferenceIDs, createdBy, teamInfo.ID); err != nil {
			return
		}
	case model.SourceYaml:
		var slackUsers []external.SlackUserCustom
		if slackUsers, err = s.SlackClient.CustomAPI.GetUsersInfo(ctx, &teamInfo.ReferenceToken, userReferenceIDs); err != nil {
			return
		}
		if err = out.CreateFromSlackCustom(slackUsers, createdBy, teamInfo.ID); err != nil {
			return
		}
	}
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

// Validate Superuser mode is enabled and has Superuser access except for first setup
func (s *UserService) Validate(ctx context.Context, action, userReferenceID string, teamID uuid.UUID) (isFirstSet bool, err error) {
	if !s.Config.SuperUserModeEnabled {
		err = fmt.Errorf("Superuser mode is disabled. It's only can be enabled via environment variable.")
		return
	}

	if userReferenceID == model.SourceYaml {
		return
	}

	if action != model.SuperUserActionList {
		var users model.UsersModel
		if users, err = s.UserRepository.GetUsersByTeamID(ctx, teamID, repository.DefaultFilter()); err == nil {
			if _, err = users.GetByUserReferenceID(userReferenceID); err != nil {
				err = fmt.Errorf("User for %s is not allowed!", model.MentionSlack(userReferenceID))
			}
			return
		}
	}
	if err == errorLib.ErrorNotExist {
		isFirstSet = true
		err = nil
	}
	return
}

func (s *UserService) DeleteWithTimeout(ctx context.Context, timeout *time.Duration, users ...model.UserModel) (err error) {
	if timeout != nil {
		time.Sleep(*timeout)
	}

	return s.UserRepository.DeleteUsers(ctx, users...)
}
