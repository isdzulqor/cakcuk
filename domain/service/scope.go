package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/errors"
	"context"
	"time"

	uuid "github.com/satori/go.uuid"
	"github.com/slack-go/slack"
)

const (
	// ScopeDeleteComplete completely delete scope and scope details
	// Also updating command detials which has the related scope to be public scope
	ScopeDeleteComplete = "DELETE_COMPLETE"
	// ScopeDeleteUpdate, if behaviour is for reducing scope details or command details
	ScopeDeleteUpdate = "DELETE_UPDATE"
)

type ScopeService struct {
	Config          *config.Config            `inject:""`
	ScopeRepository repository.ScopeInterface `inject:""`
	SlackClient     *external.SlackClient     `inject:""`
}

func (s *ScopeService) StartUp(ctx context.Context, team model.TeamModel) (out model.ScopeModel, err error) {
	publicScope := model.GeneratePublicScope()
	publicScope.TeamID = team.ID
	out, err = s.MustCreate(ctx, publicScope)
	return
}

func (s *ScopeService) MustCreate(ctx context.Context, scope model.ScopeModel) (out model.ScopeModel, err error) {
	if tempScope, tempErr := s.ScopeRepository.GetOneScopeByName(ctx, scope.TeamID, scope.Name); tempErr == nil {
		scope = tempScope
	}
	scope.Create(scope.Name, scope.CreatedBy, scope.TeamID, nil, nil)
	if err = s.ScopeRepository.InsertScope(ctx, nil, scope); err != nil {
		if err != errorLib.ErrorAlreadyExists {
			return
		}
		err = nil
	}
	out = scope
	return
}

func (s *ScopeService) Create(ctx context.Context, scopeName, createdBy, source string, teamID uuid.UUID, users []string, commands model.CommandsModel) (out model.ScopeModel, err error) {
	var selectedUsers model.UsersModel

	switch source {
	case model.SourceSlack:
		var slackUsers *[]slack.User = new([]slack.User)
		if len(users) > 0 {
			if slackUsers, err = s.SlackClient.API.GetUsersInfoContext(ctx, users...); err != nil {
				return
			}
		}
		// convert slackUsers to selectedUsers
		selectedUsers.CreateFromSlack(*slackUsers, createdBy, teamID)
	case model.SourcePlayground:
		selectedUsers.CreateFromPlayground(users, createdBy, teamID)
	}

	if err = out.Create(scopeName, createdBy, teamID, selectedUsers, commands); err != nil {
		return
	}
	err = s.ScopeRepository.CreateNewScope(ctx, out)
	return
}

func (s *ScopeService) Update(ctx context.Context, updatedBy, source string, scope model.ScopeModel, teamID uuid.UUID, users []string, newCommands model.CommandsModel) (out model.ScopeModel, err error) {
	var (
		newScopeDetails   model.ScopeDetailsModel
		newCommandDetails model.CommandDetailsModel
		selectedUsers     model.UsersModel
	)

	switch source {
	case model.SourceSlack:
		var slackUsers *[]slack.User = new([]slack.User)
		if len(users) > 0 {
			if slackUsers, err = s.SlackClient.API.GetUsersInfoContext(ctx, users...); err != nil {
				return
			}
		}
		// convert slackUsers to selectedUsers
		selectedUsers.CreateFromSlack(*slackUsers, updatedBy, teamID)
	case model.SourcePlayground:
		selectedUsers.CreateFromPlayground(users, updatedBy, teamID)
	}

	if newScopeDetails, newCommandDetails, err = scope.AddScopeDetail(updatedBy, selectedUsers, newCommands); err != nil {
		return
	}

	if err = s.ScopeRepository.IncreaseScope(ctx, scope, newScopeDetails, newCommandDetails); err != nil {
		return
	}
	out = scope
	return
}

func (s *ScopeService) Delete(ctx context.Context, updatedBy, source string, scope model.ScopeModel, teamID uuid.UUID, deletedUsers []string, reducedCommands model.CommandsModel) (out model.ScopeModel, deleteType string, err error) {
	var (
		slackUsers            *[]slack.User = new([]slack.User)
		deletedScopeDetails   model.ScopeDetailsModel
		deletedCommandDetails model.CommandDetailsModel
	)

	if len(deletedUsers) == 0 && len(reducedCommands) == 0 {
		// Delete Scope Completely
		deleteType = ScopeDeleteComplete
		if err = s.ScopeRepository.DeleteScopes(ctx, scope); err != nil {
			return
		}
		out = scope
		return
	}

	// Update Scope to reduce scope
	deleteType = ScopeDeleteUpdate
	scope.Update(updatedBy)
	if len(deletedUsers) > 0 {
		if slackUsers, err = s.SlackClient.API.GetUsersInfoContext(ctx, deletedUsers...); err != nil {
			return
		}
		if deletedScopeDetails, err = scope.ReduceScopeDetail(updatedBy, *slackUsers...); err != nil {
			return
		}
	}
	if len(reducedCommands) > 0 {
		if deletedCommandDetails, err = reducedCommands.ReduceCommandDetails(model.ScopesModel{scope}); err != nil {
			return
		}
		scope.Commands.Delete(reducedCommands)
	}

	if err = s.ScopeRepository.ReduceScope(ctx, scope, deletedScopeDetails, deletedCommandDetails); err != nil {
		return
	}
	out = scope
	return
}

func (s *ScopeService) DeleteWithTimeout(ctx context.Context, timeout *time.Duration, scopes ...model.ScopeModel) (err error) {
	if timeout != nil {
		time.Sleep(*timeout)
	}

	return s.ScopeRepository.DeleteScopes(ctx, scopes...)
}
