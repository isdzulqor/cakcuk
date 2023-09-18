package repository

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"

	uuid "github.com/satori/go.uuid"
)

// SSHInterface defines the interface for SSH-related database operations
type SSHInterface interface {
	InsertSSH(ctx context.Context, ssh model.SSH) (uuid.UUID, error)
	GetSSHbyCreatedByAndTeamID(ctx context.Context, createdBy uuid.UUID, teamID uuid.UUID) ([]model.SSH, error)
	GetSSHbyID(ctx context.Context, sshID uuid.UUID) (*model.SSH, error)
	DeleteSSHbyID(ctx context.Context, sshID uuid.UUID) error
}

// SSHRepository is responsible for handling SSH and CommandSSH related database operations
type SSHRepository struct {
	DB *sqlx.DB `inject:""`
}

// InsertSSH inserts an SSH record into the database
func (r *SSHRepository) InsertSSH(ctx context.Context, ssh model.SSH) (uuid.UUID, error) {
	if ssh.ID == uuid.Nil || ssh.ID.String() == "" {
		ssh.ID = uuid.NewV4()
	}
	q := `INSERT INTO SSH (id, teamID, username, host, port, password, sshKey, salt, created, createdBy)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`
	args := []interface{}{ssh.ID, ssh.TeamID, ssh.Username, ssh.Host, ssh.Port, ssh.Password, ssh.SSHKey, ssh.Salt, ssh.CreatedBy}
	_, err := r.DB.ExecContext(ctx, q, args...)
	if err != nil {
		err = errorLib.TranslateSQLError(err)
		if err != errorLib.ErrorNotExist {
			logging.Logger(ctx).Debug(errorLib.FormatQueryError(q, args...))
			logging.Logger(ctx).Error(err)
			return uuid.Nil, err
		}
	}
	return ssh.ID, nil
}

// GetSSHbyCreatedByAndTeamID retrieves SSH records by createdBy and teamID
func (r *SSHRepository) GetSSHbyCreatedByAndTeamID(ctx context.Context, createdBy uuid.UUID, teamID uuid.UUID) ([]model.SSH, error) {
	var sshList []model.SSH
	err := r.DB.Unsafe().SelectContext(ctx, &sshList, `
	    SELECT * FROM SSH WHERE createdBy = ? AND teamID = ?
	`, createdBy, teamID)
	if err != nil {
		return nil, err
	}
	return sshList, nil
}

func (r *SSHRepository) GetSSHbyID(ctx context.Context, sshID uuid.UUID) (*model.SSH, error) {
	var ssh model.SSH
	err := r.DB.Unsafe().GetContext(ctx, &ssh, `
	    SELECT * FROM SSH WHERE id = ?
	`, sshID)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errorLib.ErrorNotExist
		}
		return nil, fmt.Errorf("unable to get SSH: %v", err)
	}
	return &ssh, nil
}

func (r *SSHRepository) DeleteSSHbyID(ctx context.Context, sshID uuid.UUID) error {
	_, err := r.DB.Unsafe().ExecContext(ctx, `
	    DELETE FROM SSH WHERE id = ?
	`, sshID)
	if err != nil {
		return fmt.Errorf("unable to delete SSH: %v", err)
	}
	return nil
}
