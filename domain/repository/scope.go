package repository

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"
	"fmt"
	"sync"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	uuid "github.com/satori/go.uuid"
)

const (
	queryResolveScope = `
		SELECT
			s.id,
			s.name,
			s.teamID,
			s.created,
			s.createdBy,
			s.updated,
			s.updatedBy
		FROM
			Scope s
	`
	queryInsertScope = `
		INSERT INTO Scope (
			id,
			name,
			teamID,
			created,
			createdBy
		) VALUES (?, ?, ?, ?, ?)
	`
	queryResolveScopeDetail = `
		SELECT
			sd.id,
			sd.scopeID,
			sd.userSlackID,
			sd.userSlackName,
			sd.created,
			sd.createdBy,
			sd.updated,
			sd.updatedBy
		FROM
			ScopeDetail sd
	`
	queryInsertScopeDetail = `
		INSERT INTO ScopeDetail(
			id,
			scopeID,
			userSlackID,
			userSlackName,
			created,
			createdBy
		) VALUES
	`
)

type ScopeInterface interface {
	GetScopesByTeamID(ctx context.Context, teamID uuid.UUID) (out model.ScopesModel, err error)
	GetScopesByTeamIDUserSlackID(ctx context.Context, teamID uuid.UUID, UserSlackID string) (out model.ScopesModel, err error)
	GetScopesByNames(ctx context.Context, teamID uuid.UUID, names ...string) (out model.ScopesModel, err error)
	InsertScopeInfo(ctx context.Context, scope model.ScopeModel) (err error)
	GetScopeDetailsByScopeID(ctx context.Context, scopeID uuid.UUID) (out model.ScopeDetailsModel, err error)
}

type ScopeRepository struct {
	DB                *sqlx.DB         `inject:""`
	CommandRepository CommandInterface `inject:""`
}

func (r *ScopeRepository) GetScopesByTeamID(ctx context.Context, teamID uuid.UUID) (out model.ScopesModel, err error) {
	q := queryResolveScope + `
		WHERE s.teamID = ?
	`
	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, teamID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, teamID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) GetScopesByTeamIDUserSlackID(ctx context.Context, teamID uuid.UUID, userSlackID string) (out model.ScopesModel, err error) {
	q := queryResolveScope + `
		LEFT JOIN 
			ScopeDetail sd ON sd.scopeID = s.id
		WHERE s.teamID = ? AND sd.userSlackID = ?
	`
	args := []interface{}{
		teamID,
		userSlackID,
	}
	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, args...); err != nil {
		err = errorLib.TranslateSQLError(err)
		if !errorLib.IsSame(err, errorLib.ErrorNotExist) {
			logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
			logging.Logger(ctx).Error(err)
			return
		}
		err = nil
	}
	if tempScopes, errTemp := r.GetScopesByNames(ctx, teamID, model.ScopePublic); errTemp == nil {
		if publicScope, errTemp := tempScopes.GetByName(model.ScopePublic); errTemp == nil {
			out = append(out, publicScope)
		}
	}
	return
}

func (r *ScopeRepository) GetScopesByNames(ctx context.Context, teamID uuid.UUID, names ...string) (out model.ScopesModel, err error) {
	var qName string
	args := []interface{}{
		teamID,
	}

	for i, name := range names {
		qName += "?"
		args = append(args, name)
		if i == len(names)-1 {
			break
		}
		qName += ","
	}

	q := fmt.Sprintf(queryResolveScope+`
		WHERE s.teamID = ? 
		AND s.name IN (%s)
	`, qName)

	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, args...); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	r.getScopeDetailsWithGoroutine(ctx, &out)
	if tempCommands, tempErr := r.CommandRepository.GetSQLCommandsByScopeIDs(ctx, teamID, out.GetIDs()...); tempErr == nil {
		out.AssignCommands(tempCommands)
	}
	return
}

func (r *ScopeRepository) GetScopeDetailsByScopeID(ctx context.Context, scopeID uuid.UUID) (out model.ScopeDetailsModel, err error) {
	q := queryResolveScopeDetail + `
		WHERE sd.scopeID = ?
	`
	if err = r.DB.Unsafe().GetContext(ctx, &out, q, scopeID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, scopeID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) InsertScopeInfo(ctx context.Context, scope model.ScopeModel) (err error) {
	args := []interface{}{
		scope.ID,
		scope.Name,
		scope.TeamID,
		scope.Created,
		scope.CreatedBy,
	}
	if _, err = r.DB.ExecContext(ctx, queryInsertScope, args...); err != nil {
		err = errorLib.TranslateSQLError(err)
		if !errorLib.IsSame(err, errorLib.ErrorAlreadyExists) {
			logging.Logger(ctx).Debug(errorLib.FormatQueryError(queryInsertScope, args...))
			logging.Logger(ctx).Error(err)
		}
	}
	return
}

func (r *ScopeRepository) getScopeDetailsWithGoroutine(ctx context.Context, scopes *model.ScopesModel) {
	scopeDetailsChan := make(chan map[int]model.ScopeDetailsModel)
	var wg sync.WaitGroup
	for i, temp := range *scopes {
		// exclude public scope
		if temp.Name == model.ScopePublic {
			continue
		}
		tempID := temp.ID
		commandIndex := i
		wg.Add(1)
		go func() {
			scopeDetails, _ := r.GetScopeDetailsByScopeID(ctx, tempID)
			scopeDetailsChan <- map[int]model.ScopeDetailsModel{
				commandIndex: scopeDetails,
			}
			wg.Done()
		}()
	}

	go func() {
		wg.Wait()
		close(scopeDetailsChan)
	}()
	for mapOptions := range scopeDetailsChan {
		for k, v := range mapOptions {
			(*scopes)[k].ScopeDetails = v
		}
	}
}
