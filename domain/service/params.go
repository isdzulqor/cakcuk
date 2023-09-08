package service

import (
	"cakcuk/domain/model"

	uuid "github.com/satori/go.uuid"
)

type InputCakGroup struct {
	cmd        model.CommandModel
	teamID     uuid.UUID
	botName    string
	executedBy string
	scopes     model.ScopesModel
}
