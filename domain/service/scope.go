package service

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/repository"
	errorLib "cakcuk/utils/errors"
	"context"
)

type ScopeService struct {
	Config          *config.Config            `inject:""`
	ScopeRepository repository.ScopeInterface `inject:""`
}

func (s *ScopeService) StartUp(ctx context.Context, team model.TeamModel) (out model.ScopeModel, err error) {
	publicScope := model.GeneratePublicScope()
	publicScope.TeamID = team.ID
	out, err = s.MustCreate(ctx, publicScope)
	return
}

func (s *ScopeService) MustCreate(ctx context.Context, scope model.ScopeModel) (out model.ScopeModel, err error) {
	if tempScopes, tempErr := s.ScopeRepository.GetScopesByNames(ctx, scope.TeamID, scope.Name); tempErr == nil {
		if out, err = tempScopes.GetByName(scope.Name); err == nil {
			out = scope
			return
		}
	}
	scope.Create(scope.Name, scope.CreatedBy, scope.TeamID)
	if err = s.ScopeRepository.InsertScopeInfo(ctx, scope); err != nil {
		if !errorLib.IsSame(err, errorLib.ErrorAlreadyExists) {
			return
		}
		err = nil
	}
	out = scope
	return
}
