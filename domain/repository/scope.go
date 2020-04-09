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
			sd.userReferenceID,
			sd.userReferenceName,
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
			userReferenceID,
			userReferenceName,
			created,
			createdBy
		)
	`
	queryDeleteScopes = `
		DELETE 
			s, sd
		FROM
			Scope s
		JOIN 
			ScopeDetail sd ON sd.scopeID = s.id
		WHERE s.id IN 
	`
	queryDeleteScopeDetails = `
		DELETE 
			sd
		FROM
			ScopeDetail sd
		WHERE sd.id IN 
	`
	queryUpdateScope = `
		UPDATE 
			Scope s
		SET 
			s.name = ?,
			s.teamID = ?,
			s.updated = ?,
			s.updatedBy = ?
		WHERE 
			s.id = ?
	`
)

// TODO: super user mode
type ScopeInterface interface {
	GetScopesByTeamID(ctx context.Context, teamID uuid.UUID) (out model.ScopesModel, err error)
	GetScopesByTeamIDAndUserReferenceID(ctx context.Context, teamID uuid.UUID, userReferenceID string, filter BaseFilter) (out model.ScopesModel, err error)
	GetScopesByNames(ctx context.Context, teamID uuid.UUID, names ...string) (out model.ScopesModel, err error)
	CreateNewScope(ctx context.Context, scope model.ScopeModel) (err error)
	IncreaseScope(ctx context.Context, scope model.ScopeModel, newScopeDetails model.ScopeDetailsModel, newCommandDetails model.CommandDetailsModel) (err error)
	InsertScope(ctx context.Context, tx *sqlx.Tx, scope model.ScopeModel) (err error)
	GetScopeDetailsByScopeID(ctx context.Context, scopeID uuid.UUID) (out model.ScopeDetailsModel, err error)
	GetOneScopeByName(ctx context.Context, teamID uuid.UUID, scopeName string) (out model.ScopeModel, err error)
	DeleteScopes(ctx context.Context, scopes ...model.ScopeModel) (err error)
	ReduceScope(ctx context.Context, scope model.ScopeModel, deletedScopeDetails model.ScopeDetailsModel, deletedCommandDetails model.CommandDetailsModel) (err error)
	UpdateScopeOne(ctx context.Context, tx *sqlx.Tx, scope model.ScopeModel) (err error)
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
	r.getScopeChildren(ctx, &out, teamID)
	return
}

func (r *ScopeRepository) GetScopesByTeamIDAndUserReferenceID(ctx context.Context, teamID uuid.UUID, userReferenceID string, filter BaseFilter) (out model.ScopesModel, err error) {
	q := queryResolveScope + `
		LEFT JOIN 
			ScopeDetail sd ON sd.scopeID = s.id
		WHERE s.teamID = ? AND sd.userReferenceID = ?
	` + filter.GenerateQuery("s.")
	args := []interface{}{
		teamID,
		userReferenceID,
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

	r.getScopeChildren(ctx, &out, teamID)
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
	r.getScopeChildren(ctx, &out, teamID)
	return
}

func (r *ScopeRepository) GetScopeDetailsByScopeID(ctx context.Context, scopeID uuid.UUID) (out model.ScopeDetailsModel, err error) {
	q := queryResolveScopeDetail + `
		WHERE sd.scopeID = ?
	`
	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, scopeID); err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, scopeID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) CreateNewScope(ctx context.Context, scope model.ScopeModel) (err error) {
	storedScope := scope.Clone()
	tx, err := r.DB.Beginx()
	if err != nil {
		return
	}
	if err = r.InsertScope(ctx, tx, scope); err != nil {
		tx.Rollback()
		return
	}

	if len(storedScope.ScopeDetails) > 0 {
		if err = r.InsertScopeDetail(ctx, tx, storedScope.ScopeDetails); err != nil {
			tx.Rollback()
			return
		}
	}

	if len(storedScope.Commands.GetAllCommandDetails()) > 0 {
		if err = r.CommandRepository.InsertNewSQLCommandDetail(ctx, tx, storedScope.Commands.GetAllCommandDetails()); err != nil {
			tx.Rollback()
			return
		}
	}
	err = tx.Commit()
	return
}

func (r *ScopeRepository) IncreaseScope(ctx context.Context, scope model.ScopeModel, newScopeDetails model.ScopeDetailsModel, newCommandDetails model.CommandDetailsModel) (err error) {
	tx, err := r.DB.Beginx()
	if err != nil {
		return
	}
	if err = r.UpdateScopeOne(ctx, tx, scope); err != nil {
		tx.Rollback()
		return
	}
	if len(newScopeDetails) > 0 {
		if err = r.InsertScopeDetail(ctx, tx, newScopeDetails); err != nil {
			tx.Rollback()
			return
		}
	}
	if len(newCommandDetails) > 0 {
		if err = r.CommandRepository.InsertNewSQLCommandDetail(ctx, tx, newCommandDetails); err != nil {
			tx.Rollback()
			return
		}
	}
	err = tx.Commit()
	return
}

func (r *ScopeRepository) InsertScope(ctx context.Context, tx *sqlx.Tx, scope model.ScopeModel) (err error) {
	args := []interface{}{
		scope.ID,
		scope.Name,
		scope.TeamID,
		scope.Created,
		scope.CreatedBy,
	}
	if tx != nil {
		_, err = tx.ExecContext(ctx, queryInsertScope, args...)
	} else {
		_, err = r.DB.ExecContext(ctx, queryInsertScope, args...)
	}
	if err != nil {
		err = errorLib.TranslateSQLError(err)
		if !errorLib.IsSame(err, errorLib.ErrorAlreadyExists) {
			logging.Logger(ctx).Debug(errorLib.FormatQueryError(queryInsertScope, args...))
			logging.Logger(ctx).Error(err)
		}
	}
	return
}

func (r *ScopeRepository) InsertScopeDetail(ctx context.Context, tx *sqlx.Tx, scopeDetails model.ScopeDetailsModel) (err error) {
	var args []interface{}
	var marks string

	for i, sd := range scopeDetails {
		if i > 0 {
			marks += ", \n"
		}
		args = append(args, sd.ID, sd.ScopeID, sd.UserReferenceID, sd.UserReferenceName, sd.Created, sd.CreatedBy)
		marks += "(?, ?, ?, ?, ?, ?)"
	}

	q := fmt.Sprintf("%s VALUES %s", queryInsertScopeDetail, marks)

	if tx != nil {
		_, err = tx.ExecContext(ctx, q, args...)
	} else {
		_, err = r.DB.ExecContext(ctx, q, args...)
	}
	if err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) getScopeDetailsWithGoroutine(ctx context.Context, scopes *model.ScopesModel) {
	scopeDetailsChan := make(chan map[int]model.ScopeDetailsModel)
	var wg sync.WaitGroup
	for i, temp := range *scopes {
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
	for mapScopeDetails := range scopeDetailsChan {
		for k, v := range mapScopeDetails {
			(*scopes)[k].ScopeDetails = v
		}
	}
}

func (r *ScopeRepository) getScopeChildren(ctx context.Context, scopes *model.ScopesModel, teamID uuid.UUID) {
	r.getScopeDetailsWithGoroutine(ctx, &(*scopes))
	if tempCommands, tempErr := r.CommandRepository.GetSQLCommandsByScopeIDs(ctx, teamID, (*scopes).GetIDs()...); tempErr == nil {
		(*scopes).AssignCommands(tempCommands)
	}
}

func (r *ScopeRepository) GetOneScopeByName(ctx context.Context, teamID uuid.UUID, scopeName string) (out model.ScopeModel, err error) {
	var tempScopes model.ScopesModel
	if tempScopes, err = r.GetScopesByNames(ctx, teamID, scopeName); err != nil {
		return
	}
	out, err = tempScopes.GetByName(scopeName)
	return
}

func (r *ScopeRepository) DeleteScopes(ctx context.Context, scopes ...model.ScopeModel) (err error) {
	var marks string
	var args []interface{}

	if len(scopes) == 0 {
		err = fmt.Errorf("No scope to be deleted")
		return
	}
	for i, scope := range scopes {
		marks += "?"
		if i != len(scopes)-1 {
			marks += ","
		}
		args = append(args, scope.ID)
	}
	query := queryDeleteScopes + "(" + marks + ")"

	_, err = r.DB.ExecContext(ctx, query, args...)
	if err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(query, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) DeleteScopeDetails(ctx context.Context, tx *sqlx.Tx, deletedScopeDetails model.ScopeDetailsModel) (err error) {
	var (
		marks string
		args  []interface{}
	)
	for i, sd := range deletedScopeDetails {
		marks += "?"
		if i != len(deletedScopeDetails)-1 {
			marks += ","
		}
		args = append(args, sd.ID)
	}
	query := queryDeleteScopeDetails + "(" + marks + ")"

	if tx != nil {
		_, err = tx.ExecContext(ctx, query, args...)
	} else {
		_, err = r.DB.ExecContext(ctx, query, args...)
	}
	if err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(query, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) ReduceScope(ctx context.Context, scope model.ScopeModel, deletedScopeDetails model.ScopeDetailsModel, deletedCommandDetails model.CommandDetailsModel) (err error) {
	tx, err := r.DB.Beginx()
	if err != nil {
		return
	}
	if err = r.UpdateScopeOne(ctx, tx, scope); err != nil {
		tx.Rollback()
		return
	}
	if len(deletedScopeDetails) > 0 {
		if err = r.DeleteScopeDetails(ctx, tx, deletedScopeDetails); err != nil {
			tx.Rollback()
			return
		}
	}
	if len(deletedCommandDetails) > 0 {
		if err = r.CommandRepository.DeleteSQLCommandDetails(ctx, tx, deletedCommandDetails); err != nil {
			tx.Rollback()
		}
	}
	err = tx.Commit()
	return
}

func (r *ScopeRepository) UpdateScopeOne(ctx context.Context, tx *sqlx.Tx, scope model.ScopeModel) (err error) {
	args := []interface{}{
		scope.Name,
		scope.TeamID,
		scope.Updated,
		scope.UpdatedBy,
		scope.ID,
	}
	if tx != nil {
		_, err = tx.ExecContext(ctx, queryUpdateScope, args...)
	} else {
		_, err = r.DB.ExecContext(ctx, queryUpdateScope, args...)
	}
	if err != nil {
		logging.Logger(ctx).Debug(errorLib.FormatQueryError(queryUpdateScope, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}
