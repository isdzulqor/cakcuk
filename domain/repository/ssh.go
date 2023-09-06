package repository

import (
	"cakcuk/domain/model"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

	uuid "github.com/satori/go.uuid"
)

// SSHInterface defines the interface for SSH-related database operations
type SSHInterface interface {
	InsertSSH(ctx context.Context, ssh model.SSH) (uuid.UUID, error)
	GetSSHbyCreatedByAndTeamID(ctx context.Context, createdBy uuid.UUID, teamID uuid.UUID) ([]model.SSH, error)
	GetSSHbyID(ctx context.Context, sshID uuid.UUID) (*model.SSH, error)
	InsertCommandSSH(ctx context.Context, commandSSH model.CommandSSH) error
}

// SSHRepository is responsible for handling SSH and CommandSSH related database operations
type SSHRepository struct {
	DB *sqlx.DB `inject:""`
}

// InsertSSH inserts an SSH record into the database
func (r *SSHRepository) InsertSSH(ctx context.Context, ssh model.SSH) (uuid.UUID, error) {
	sshID := uuid.NewV4()
	q := `INSERT INTO SSH (id, teamID, host, port, password, sshKey, salt, created, createdBy)
	VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`
	args := []interface{}{sshID, ssh.TeamID, ssh.Host, ssh.Port, ssh.Password, ssh.SSHKey, ssh.Salt, ssh.CreatedBy}
	_, err := r.DB.ExecContext(ctx, q, args...)
	if err != nil {
		err = errorLib.TranslateSQLError(err)
		if err != errorLib.ErrorNotExist {
			logging.Logger(ctx).Info(errorLib.FormatQueryError(q, args...))
			logging.Logger(ctx).Error(err)
			return uuid.Nil, err
		}
	}
	return sshID, nil
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
		return nil, fmt.Errorf("unable to get SSH: %v", err)
	}
	return &ssh, nil
}

// InsertCommandSSH inserts a CommandSSH record into the database
func (r *SSHRepository) InsertCommandSSH(ctx context.Context, commandSSH model.CommandSSH) error {
	_, err := r.DB.ExecContext(ctx, `
	    INSERT INTO CommandSSH (commandID, sshID)
	    VALUES (?, ?)
	`, commandSSH.CommandID, commandSSH.SSHID)
	if err != nil {
		return fmt.Errorf("unable to insert CommandSSH: %v", err)
	}
	return nil
}
