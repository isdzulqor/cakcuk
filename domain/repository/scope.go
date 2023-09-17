package repository

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"
	"fmt"
	"strings"
	"sync"

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
			s, sd, cs
		FROM
			Scope s
		LEFT JOIN 
			ScopeDetail sd ON sd.scopeID = s.id
		LEFT JOIN 
			ChannelScope cs ON cs.scopeID = s.id 
		WHERE s.id IN 
	`

	queryDeleteScopesSQLite = `
		DELETE FROM Scope WHERE id IN ;
		DELETE FROM ScopeDetail WHERE scopeID IN ;
		DELETE FROM ChannelScope WHERE scopeID IN ;
	`

	queryDeleteScopeDetails = `
		DELETE 
		FROM
			ScopeDetail
		WHERE id IN 
	`
	queryUpdateScope = `
		UPDATE 
			Scope
		SET 
			name = ?,
			teamID = ?,
			updated = ?,
			updatedBy = ?
		WHERE 
			id = ?
	`
)

// TODO: Superuser mode
type ScopeInterface interface {
	GetScopesByTeamID(ctx context.Context, teamID uuid.UUID) (out model.ScopesModel, err error)
	GetScopesByTeamIDAndUserReferenceID(ctx context.Context, teamID uuid.UUID, userReferenceID string, filter BaseFilter) (out model.ScopesModel, err error)
	GetScopesByNames(ctx context.Context, teamID uuid.UUID, names ...string) (out model.ScopesModel, err error)
	CreateNewScope(ctx context.Context, scope model.ScopeModel) (err error)
	IncreaseScope(ctx context.Context, scope model.ScopeModel, newScopeDetails model.ScopeDetailsModel, newCommandDetails model.CommandDetailsModel, newChannelScopes model.ScopeChannels) (err error)
	InsertScope(ctx context.Context, tx *sqlx.Tx, scope model.ScopeModel) (err error)
	GetScopeDetailsByScopeID(ctx context.Context, scopeID uuid.UUID) (out model.ScopeDetailsModel, err error)
	GetOneScopeByName(ctx context.Context, teamID uuid.UUID, scopeName string) (out model.ScopeModel, err error)
	DeleteScopes(ctx context.Context, scopes ...model.ScopeModel) (err error)
	ReduceScope(ctx context.Context, scope model.ScopeModel, deletedScopeDetails model.ScopeDetailsModel, deletedCommandDetails model.CommandDetailsModel, deletedScopeChannels model.ScopeChannels) (err error)
	UpdateScopeOne(ctx context.Context, tx *sqlx.Tx, scope model.ScopeModel) (err error)
	CheckUserCanAccess(ctx context.Context, teamID uuid.UUID, userRefID string, cmdName, channelRef string) (eligible bool, err error)
}

type ScopeRepository struct {
	DB                *sqlx.DB         `inject:""`
	CommandRepository CommandInterface `inject:""`
	UserRepository    UserInterface    `inject:""`
}

func (r *ScopeRepository) GetScopesByTeamID(ctx context.Context, teamID uuid.UUID) (out model.ScopesModel, err error) {
	q := queryResolveScope + `
		WHERE s.teamID = ?
	`
	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, teamID); err != nil {
		logging.Logger(ctx).Info(errorLib.FormatQueryError(q, teamID))
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
		if err != errorLib.ErrorNotExist {
			logging.Logger(ctx).Info(errorLib.FormatQueryError(q, args...))
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
		logging.Logger(ctx).Info(errorLib.FormatQueryError(q, args...))
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
		logging.Logger(ctx).Info(errorLib.FormatQueryError(q, scopeID))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) getChannelScopesByScopeID(ctx context.Context, scopeID uuid.UUID) (out model.ScopeChannels, err error) {
	queryResolveChannelScope := `
		SELECT
			cs.*
		FROM
			ChannelScope cs
	`
	q := queryResolveChannelScope + `
		WHERE cs.scopeID = ?
	`
	if err = r.DB.Unsafe().SelectContext(ctx, &out, q, scopeID); err != nil {
		logging.Logger(ctx).Info(errorLib.FormatQueryError(q, scopeID))
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

	defer func() {
		if err != nil {
			tx.Rollback()
			return
		}
		err = tx.Commit()
		if err != nil {
			err = fmt.Errorf("unable to commit transaction due: %w", err)
			return
		}
	}()

	if err = r.InsertScope(ctx, tx, scope); err != nil {
		return
	}

	if len(storedScope.ScopeDetails) > 0 {
		if err = r.InsertScopeDetail(ctx, tx, storedScope.ScopeDetails); err != nil {
			return
		}
	}

	if len(storedScope.ScopeChannels) > 0 {
		if err = r.InsertChannelScope(ctx, tx, storedScope.ScopeChannels); err != nil {
			return
		}
	}

	if len(storedScope.Commands.GetAllCommandDetails()) > 0 {
		if err = r.CommandRepository.InsertNewSQLCommandDetail(ctx, tx, storedScope.Commands.GetAllCommandDetails()); err != nil {
			return
		}
	}
	return
}

func (r *ScopeRepository) IncreaseScope(ctx context.Context, scope model.ScopeModel, newScopeDetails model.ScopeDetailsModel,
	newCommandDetails model.CommandDetailsModel, newChannelScopes model.ScopeChannels) (err error) {
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
	if len(newChannelScopes) > 0 {
		if err = r.InsertChannelScope(ctx, tx, newChannelScopes); err != nil {
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
		if err != errorLib.ErrorAlreadyExists {
			logging.Logger(ctx).Info(errorLib.FormatQueryError(queryInsertScope, args...))
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
		logging.Logger(ctx).Info(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) InsertChannelScope(ctx context.Context, tx *sqlx.Tx, scopeChannels model.ScopeChannels) (err error) {
	var args []interface{}
	var marks string

	queryInsertScopeChannel := `
		INSERT INTO ChannelScope(
			scopeID,
			channelRef,
			created,
			createdBy
		)
	`

	for i, sc := range scopeChannels {
		if i > 0 {
			marks += ", \n"
		}
		args = append(args, sc.ScopeID, sc.ChannelRef, sc.Created, sc.CreatedBy)
		marks += "(?, ?, ?, ?)"
	}

	q := fmt.Sprintf("%s VALUES %s", queryInsertScopeChannel, marks)

	if tx != nil {
		_, err = tx.ExecContext(ctx, q, args...)
	} else {
		_, err = r.DB.ExecContext(ctx, q, args...)
	}
	if err != nil {
		logging.Logger(ctx).Info(errorLib.FormatQueryError(q, args...))
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

func (r *ScopeRepository) getChannelScopesWithGoroutine(ctx context.Context, scopes *model.ScopesModel) {
	scopeChannelsChan := make(chan map[int]model.ScopeChannels)
	var wg sync.WaitGroup
	for i, temp := range *scopes {
		tempID := temp.ID
		commandIndex := i
		wg.Add(1)
		go func() {
			scopeChannels, _ := r.getChannelScopesByScopeID(ctx, tempID)
			scopeChannelsChan <- map[int]model.ScopeChannels{
				commandIndex: scopeChannels,
			}
			wg.Done()
		}()
	}

	go func() {
		wg.Wait()
		close(scopeChannelsChan)
	}()
	for mapScopeChannels := range scopeChannelsChan {
		for k, v := range mapScopeChannels {
			(*scopes)[k].ScopeChannels = v
		}
	}
}

func (r *ScopeRepository) getScopeChildren(ctx context.Context, scopes *model.ScopesModel, teamID uuid.UUID) {
	r.getScopeDetailsWithGoroutine(ctx, &(*scopes))
	r.getChannelScopesWithGoroutine(ctx, &(*scopes))
	if tempCommands, tempErr := r.CommandRepository.GetSQLCommandsByScopeIDs(ctx, teamID, (*scopes).GetIDs()...); tempErr == nil {
		(*scopes).AssignCommands(tempCommands.MergeCommandGroup())
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

	if config.Get().SQLITE.Enabled {
		queries := strings.Split(queryDeleteScopesSQLite, ";")
		query = ""
		newArgs := []interface{}{}
		for _, q := range queries {
			if strings.TrimSpace(q) != "" {
				query += q + "(" + marks + ");\n"
				newArgs = append(newArgs, args...)
			}
		}
		args = newArgs
	}

	_, err = r.DB.ExecContext(ctx, query, args...)
	if err != nil {
		logging.Logger(ctx).Info(errorLib.FormatQueryError(query, args...))
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
		logging.Logger(ctx).Info(errorLib.FormatQueryError(query, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) DeleteScopeChannels(ctx context.Context, tx *sqlx.Tx, deletedScopeChannels model.ScopeChannels) (err error) {
	var (
		marks string
		args  []interface{}
	)
	for i, sd := range deletedScopeChannels {
		marks += "?"
		if i != len(deletedScopeChannels)-1 {
			marks += ","
		}
		if i == 0 {
			args = append(args, sd.ScopeID)
		}
		args = append(args, sd.ChannelRef)
	}
	queryDeleteScopeChannels := `
		DELETE 
			cs
		FROM
			ChannelScope cs
		WHERE cs.scopeID = ? AND cs.channelRef IN
	`
	query := queryDeleteScopeChannels + "(" + marks + ")"

	if tx != nil {
		_, err = tx.ExecContext(ctx, query, args...)
	} else {
		_, err = r.DB.ExecContext(ctx, query, args...)
	}
	if err != nil {
		logging.Logger(ctx).Info(errorLib.FormatQueryError(query, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}

func (r *ScopeRepository) isPublicScope(ctx context.Context, cmdName string, teamID uuid.UUID) (isPublic bool, err error) {
	q := `
	SELECT COUNT(*) FROM Command c 
		JOIN CommandDetail cd ON cd.commandID = c.id
		JOIN Scope s ON s.id = cd.scopeID
	WHERE c.teamID = ? AND (c.name = ? OR c.groupName = ?) AND s.name = 'public'`

	var count int
	args := []interface{}{
		teamID,
		cmdName,
		cmdName,
	}
	if err = r.DB.GetContext(ctx, &count, q, args...); err != nil {
		logging.Logger(ctx).Info(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
		return
	}

	isPublic = count > 0
	return
}

func (r *ScopeRepository) CheckUserCanAccess(ctx context.Context, teamID uuid.UUID, userRefID string, cmdName string, channelRef string) (eligible bool, err error) {
	// if command is public, then eligible
	eligible, err = r.isPublicScope(ctx, cmdName, teamID)
	if eligible {
		return
	}

	q := `
		SELECT COUNT(*) AS is_has_access_for_not_super_user,
			(SELECT COUNT(*) FROM Command c WHERE (c.name = ? OR c.groupName = ?) AND c.teamID = ?) AS is_command_exist,
			(SELECT COUNT(*) FROM User u WHERE u.referenceID = ? ) AS is_super_user,
			(
				SELECT COUNT(*) FROM ChannelScope cs 
					JOIN CommandDetail cd ON cd.scopeID = cs.scopeID
					JOIN Command c ON c.id = cd.commandID AND c.teamID = ?
						AND (c.name = ? OR c.groupName = ?)
					WHERE cs.channelRef = ? 
			) AS is_channel_eligible,
			(
				SELECT 
					CASE 
						WHEN COUNT(*) = 0 THEN 'true'
						ELSE 'false'
					END AS result
				FROM ChannelScope cs 
					JOIN CommandDetail cd ON cd.scopeID = cs.scopeID
					JOIN Command c ON c.id = cd.commandID AND c.teamID = ?
						AND (c.name = ? OR c.groupName = ?)
			) AS is_all_channel_can_access
		FROM CommandDetail cd
				   INNER JOIN Command c ON cd.commandID = c.id AND c.teamID = ?
				   INNER JOIN ScopeDetail sd ON cd.scopeID = sd.scopeID 
		   WHERE sd.userReferenceID = ? AND (c.name = ? OR c.groupName = ?)
	`

	var result struct {
		IsHasAccessForNotSuperUser int  `db:"is_has_access_for_not_super_user"`
		IsCommandExist             int  `db:"is_command_exist"`
		IsSuperUser                int  `db:"is_super_user"`
		IsChannelEligible          int  `db:"is_channel_eligible"`
		IsAllChannelCanAccess      bool `db:"is_all_channel_can_access"`
	}
	args := []interface{}{
		// is_command_exist
		cmdName,
		cmdName,
		teamID,

		// is_super_user
		userRefID,

		// is_channel_eligible
		teamID,
		cmdName,
		cmdName,
		channelRef,

		// is_all_channel_can_access
		teamID,
		cmdName,
		cmdName,

		// is_has_access_for_not_super_user
		teamID,
		userRefID,
		cmdName,
		cmdName,
	}

	if err = r.DB.GetContext(ctx, &result, q, args...); err != nil {
		logging.Logger(ctx).Info(errorLib.FormatQueryError(q, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
		return
	}

	if result.IsCommandExist == 0 {
		err = fmt.Errorf("Command `%s` does not exist. You can check for more information by executing `help -ol @cakcuk`", cmdName)
		return
	}

	if result.IsChannelEligible == 0 && !result.IsAllChannelCanAccess {
		err = fmt.Errorf("Command `%s` cannot be accessed from channel `<#%s>`", cmdName, channelRef)
		return
	}

	if result.IsSuperUser > 0 || result.IsHasAccessForNotSuperUser > 0 {
		eligible = true
		return
	}

	if result.IsHasAccessForNotSuperUser == 0 {
		err = fmt.Errorf("You have no access to command `%s`", cmdName)
		return
	}
	return
}

func (r *ScopeRepository) ReduceScope(ctx context.Context, scope model.ScopeModel, deletedScopeDetails model.ScopeDetailsModel,
	deletedCommandDetails model.CommandDetailsModel, deletedScopeChannels model.ScopeChannels) (err error) {
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
	if len(deletedScopeChannels) > 0 {
		if err = r.DeleteScopeChannels(ctx, tx, deletedScopeChannels); err != nil {
			tx.Rollback()
			return
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
		logging.Logger(ctx).Info(errorLib.FormatQueryError(queryUpdateScope, args...))
		logging.Logger(ctx).Error(err)
		err = errorLib.TranslateSQLError(err)
	}
	return
}
