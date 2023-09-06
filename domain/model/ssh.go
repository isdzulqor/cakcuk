package model

import uuid "github.com/satori/go.uuid"

// SSH represents the SSH table structure
type SSH struct {
	ID        uuid.UUID `db:"id" json:"id"`
	TeamID    uuid.UUID `db:"teamID" json:"teamID"`
	Username  string    `db:"username" json:"username"`
	Host      string    `db:"host" json:"host"`
	Port      int       `db:"port" json:"port"`
	Password  string    `db:"password" json:"password"`
	SSHKey    string    `db:"sshKey" json:"ssh_key"`
	Salt      string    `db:"salt" json:"salt"`
	Created   string    `db:"created" json:"created"`
	CreatedBy string    `db:"createdBy" json:"createdBy"`
}

// CommandSSH represents the CommandSSH table structure
type CommandSSH struct {
	CommandID uuid.UUID `db:"commandID"`
	SSHID     uuid.UUID `db:"sshID"`
}
