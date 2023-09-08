package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	"cakcuk/external"
	errorLib "cakcuk/utils/errors"
	"context"
	"fmt"
	"time"

	uuid "github.com/satori/go.uuid"
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
	UserService     *UserService              `inject:""`
	SlackClient     *external.SlackClient     `inject:""`
	PublicScopeID   uuid.UUID
}

func (s *ScopeService) StartUp(ctx context.Context, team model.TeamModel) (out model.ScopeModel, err error) {
	publicScope := model.GeneratePublicScope()
	publicScope.TeamID = team.ID
	out, err = s.MustCreate(ctx, publicScope)
	s.PublicScopeID = out.ID
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

func (s *ScopeService) Create(ctx context.Context, scopeName, createdBy, source string, teamInfo model.TeamModel, userReferenceIDs []string, commands model.CommandsModel) (out model.ScopeModel, err error) {
	var selectedUsers model.UsersModel
	if len(userReferenceIDs) > 0 {
		if selectedUsers, err = s.UserService.CreateFromSourceNoInsert(ctx, createdBy, source, teamInfo, userReferenceIDs); err != nil {
			return
		}
	}
	if err = out.Create(scopeName, createdBy, teamInfo.ID, selectedUsers, commands); err != nil {
		return
	}
	err = s.ScopeRepository.CreateNewScope(ctx, out)
	return
}

func (s *ScopeService) Update(ctx context.Context, updatedBy, source string, scope model.ScopeModel, teamInfo model.TeamModel, userReferenceIDs []string, newCommands model.CommandsModel) (out model.ScopeModel, err error) {
	var (
		newScopeDetails   model.ScopeDetailsModel
		newCommandDetails model.CommandDetailsModel
		selectedUsers     model.UsersModel
	)

	lengthUserReferenceIDs := len(userReferenceIDs)
	lengthNewCommands := len(newCommands)

	if lengthUserReferenceIDs == 0 && lengthNewCommands == 0 {
		err = fmt.Errorf("Could not update scope with empty commands and users")
		return
	}

	if lengthUserReferenceIDs > 0 {
		if selectedUsers, err = s.UserService.CreateFromSourceNoInsert(ctx, updatedBy, source, teamInfo, userReferenceIDs); err != nil {
			return
		}
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

func (s *ScopeService) Delete(ctx context.Context, updatedBy, source string, scope model.ScopeModel, teamInfo model.TeamModel, deletedUsers []string, reducedCommands model.CommandsModel) (out model.ScopeModel, deleteType string, err error) {
	var (
		slackUsers            []external.SlackUserCustom
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
		if slackUsers, err = s.SlackClient.CustomAPI.GetUsersInfo(ctx, &teamInfo.ReferenceToken, deletedUsers); err != nil {
			return
		}
		if deletedScopeDetails, err = scope.ReduceScopeDetailCustom(updatedBy, slackUsers...); err != nil {
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
