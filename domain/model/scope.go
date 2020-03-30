package model

import (
	"fmt"
	"time"

	"github.com/slack-go/slack"

	uuid "github.com/satori/go.uuid"
)

type ScopeModel struct {
	ID        uuid.UUID  `json:"id" db:"id"`
	Name      string     `json:"name" db:"name"`
	TeamID    uuid.UUID  `json:"teamID" db:"teamID"`
	Created   time.Time  `json:"created" db:"created"`
	CreatedBy string     `json:"createdBy" db:"createdBy"`
	Updated   *time.Time `json:"updated" db:"updated"`
	UpdatedBy *string    `json:"updatedBy" db:"updatedBy"`

	ScopeDetails ScopeDetailModels `json:"scopeDetails"`
	Commands     CommandsModel     `json:"commands"`
}

func (s *ScopeModel) Create(name, createdBy string, slackUsers ...slack.User) error {
	if len(slackUsers) <= 0 {
		return fmt.Errorf("Scope couldn't have nil users")
	}

	s.ID = uuid.NewV4()
	s.Name = name
	s.Created = time.Now()
	s.CreatedBy = createdBy

	for _, u := range slackUsers {
		var temp ScopeDetailModel
		temp.Create(u, createdBy, s.ID)
		s.ScopeDetails = append(s.ScopeDetails, temp)
	}
	return nil
}

func (s *ScopeModel) Update(updatedBy string) error {
	now := time.Now()
	s.Updated = &now
	s.UpdatedBy = &updatedBy
	return nil
}

func (s *ScopeModel) Delete() error {
	return nil
}

type ScopeDetailModel struct {
	ID            uuid.UUID  `json:"id" db:"id"`
	ScopeID       uuid.UUID  `json:"scopeID" db:"scopeID"`
	UserSlackID   string     `json:"userSlackID" db:"userSlackID"`
	UserSlackName string     `json:"userSlackName" db:"userSlackName"`
	Created       time.Time  `json:"created" db:"created"`
	CreatedBy     string     `json:"createdBy" db:"createdBy"`
	Updated       *time.Time `json:"updated" db:"updated"`
	UpdatedBy     *string    `json:"updatedBy" db:"updatedBy"`
}

func (s ScopeDetailModel) Create(slackUser slack.User, createdBy string, scopeID uuid.UUID) {
	s.ID = uuid.NewV4()
	s.ScopeID = scopeID
	s.UserSlackID = slackUser.ID
	s.UserSlackName = slackUser.RealName
	s.CreatedBy = createdBy
}

type ScopeDetailModels []ScopeDetailModel
