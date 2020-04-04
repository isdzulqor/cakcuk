package model

import (
	"fmt"
	"strings"
	"time"

	"github.com/slack-go/slack"

	uuid "github.com/satori/go.uuid"
)

const (
	ScopePublic = "public"
)

type ScopeModel struct {
	ID        uuid.UUID  `json:"id" db:"id"`
	Name      string     `json:"name" db:"name"`
	TeamID    uuid.UUID  `json:"teamID" db:"teamID"`
	Created   time.Time  `json:"created" db:"created"`
	CreatedBy string     `json:"createdBy" db:"createdBy"`
	Updated   *time.Time `json:"updated" db:"updated"`
	UpdatedBy *string    `json:"updatedBy" db:"updatedBy"`

	ScopeDetails ScopeDetailsModel `json:"scopeDetails"`
	Commands     CommandsModel     `json:"commands"`
}

type ScopesModel []ScopeModel

func (s ScopesModel) GetIDs() (out []uuid.UUID) {
	for _, scope := range s {
		out = append(out, scope.ID)
	}
	return
}

func (s *ScopesModel) AssignCommands(commands CommandsModel) {
	for i, scope := range *s {
		(*s)[i].Commands = commands.GetByScopeID(scope.ID)
	}
	return
}

func (s ScopesModel) GetByName(name string) (ScopeModel, error) {
	for _, scope := range s {
		if scope.Name == name {
			return scope, nil
		}
	}
	return ScopeModel{}, fmt.Errorf("Scopes doesn't contain for `%s`", name)
}

func (s ScopesModel) GetByCommandName(commandName string) (out ScopesModel, err error) {
	for _, scope := range s {
		if _, err := scope.Commands.GetByName(commandName); err == nil {
			out = append(out, scope)
		}
	}
	if len(out) <= 0 {
		err = fmt.Errorf("scopes is not containing command name for `%s`", commandName)
	}
	return
}

func (s *ScopeModel) create(name, createdBy string, teamID uuid.UUID) {
	s.ID = uuid.NewV4()
	s.Name = name
	s.TeamID = teamID
	s.Created = time.Now()
	s.CreatedBy = createdBy
}

func (s *ScopeModel) Create(name, createdBy string, teamID uuid.UUID, slackUsers ...slack.User) error {
	if len(slackUsers) <= 0 {
		return fmt.Errorf("Scope couldn't have nil users")
	}

	s.create(name, createdBy, teamID)
	for _, u := range slackUsers {
		var temp ScopeDetailModel
		temp.Create(u, createdBy, s.ID)
		s.ScopeDetails = append(s.ScopeDetails, temp)
	}
	return nil
}

func (s *ScopeModel) Update(updatedBy string) {
	now := time.Now()
	s.Updated = &now
	s.UpdatedBy = &updatedBy
	return
}

func (s *ScopeModel) AddScopeDetail(updatedBy string, slackUsers ...slack.User) (newScopeDetails ScopeDetailsModel) {
	s.Update(updatedBy)
	for _, u := range slackUsers {
		var temp ScopeDetailModel
		temp.Create(u, updatedBy, s.ID)
		s.ScopeDetails = append(s.ScopeDetails, temp)
		newScopeDetails = append(newScopeDetails, temp)
	}
	return
}

func (s *ScopeModel) ReduceScopeDetail(updatedBy string, slackUsers ...slack.User) (deletedScopeDetails ScopeDetailsModel, err error) {
	s.Update(updatedBy)
	var tempUsers []string
	for _, u := range slackUsers {
		tempUsers = append(tempUsers, u.RealName)
		if deleted, err := s.ScopeDetails.RemoveBySlackUser(u.ID); err == nil {
			deletedScopeDetails = append(deletedScopeDetails, deleted)
		}
	}
	if len(deletedScopeDetails) == 0 {
		err = fmt.Errorf("No scope detail for %s that contains user for %s to be deleted", s.Name, strings.Join(tempUsers, ","))
	}
	return
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

type ScopeDetailsModel []ScopeDetailModel

func (s *ScopeDetailsModel) RemoveBySlackUser(userSlackID string) (deletedScopeDetail ScopeDetailModel, err error) {
	var newScopeDetail ScopeDetailsModel
	for i, d := range *s {
		if d.UserSlackID == userSlackID {
			deletedScopeDetail = d
			newScopeDetail = append(newScopeDetail, (*s)[i+1:]...)
			break
		}
		newScopeDetail = append(newScopeDetail, d)
	}
	*s = newScopeDetail
	if deletedScopeDetail.ID == uuid.Nil {
		err = fmt.Errorf("userSlackID for %s is not found to be removed", userSlackID)
	}
	return
}

func GeneratePublicScope() (out ScopeModel) {
	out.create(ScopePublic, "default", uuid.Nil)
	return
}
