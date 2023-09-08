package model

import uuid "github.com/satori/go.uuid"

type CommandGroup struct {
	GroupName string    `db:"groupName" json:"groupName"`
	CommandID uuid.UUID `db:"commandID" json:"commandID"`
	TeamID    uuid.UUID `db:"teamID" json:"teamID"`
	GivenID   string    `db:"givenID" json:"givenID"`
}
