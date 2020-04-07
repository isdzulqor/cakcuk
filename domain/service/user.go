package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
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

func (s *UserService) Set(ctx context.Context, createdBy string, teamID uuid.UUID, userReferenceIDs []string) (out model.UsersModel, err error) {
	var (
		slackUsers *[]slack.User = new([]slack.User)
	)
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
