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

func (s ScopeModel) Clone() ScopeModel {
	s.ScopeDetails = append(ScopeDetailsModel{}, s.ScopeDetails...)
	s.Commands = append(CommandsModel{}, s.Commands...)
	return s
}

func (s *ScopeModel) DeleteByCommands(deletedCommands CommandsModel) {
	s.Commands.Delete(deletedCommands)
	return
}

func (s ScopeModel) Print(isOneLine bool) (out string) {
	out = " - " + s.Name
	if isOneLine {
		return
	}
	command := printList("\t\t", "No command registered")
	if len(s.Commands) > 0 {
		command = printList("\t\t", s.Commands.GetNames()...)
	}
	out += "\n\t- Registered Commands:\n" + command
	user := printList("\t\t", "No registered user")
	if s.Name == ScopePublic {
		user = printList("\t\t", "All Users")
	}
	if len(s.ScopeDetails) > 0 {
		user = printList("\t\t", s.ScopeDetails.GetUserSlackNames()...)
	}
	out += "\n\t- Who can access:\n" + user
	out += "\n"
	return
}

type ScopesModel []ScopeModel

func (s ScopesModel) GetIDs() (out []uuid.UUID) {
	for _, scope := range s {
		out = append(out, scope.ID)
	}
	return
}

func (s ScopesModel) GetByID(id uuid.UUID) (ScopeModel, error) {
	for _, scope := range s {
		if scope.ID == id {
			return scope, nil
		}
	}
	return ScopeModel{}, fmt.Errorf("scope for id `%s` is not found!", id)
}

func (s ScopesModel) GetNames() (out []string) {
	for _, scope := range s {
		out = append(out, scope.Name)
	}
	return
}

func (s ScopesModel) GetUnique() (out ScopesModel) {
	mapScopes := make(map[uuid.UUID]ScopeModel)
	for _, scope := range s {
		if _, ok := mapScopes[scope.ID]; ok {
			continue
		}
		out = append(out, scope)
		mapScopes[scope.ID] = scope
	}
	return
}

func (s ScopesModel) Print(isOneLine bool) (out string) {
	for _, scope := range s {
		out += scope.Print(isOneLine)
		out += "\n"
	}
	return
}

func (s ScopesModel) GetAllCommands() (out CommandsModel) {
	for _, scope := range s {
		out = append(out, scope.Commands...)
	}
	return
}

func (s *ScopesModel) AssignCommands(commands CommandsModel) {
	for i, scope := range *s {
		(*s)[i].Commands = commands.GetByScopeID(scope.ID)
	}
	return
}

func (s *ScopesModel) DeleteByCommands(deletedCommands CommandsModel) {
	for i, _ := range *s {
		(*s)[i].DeleteByCommands(deletedCommands)
	}
	return
}

func (s ScopesModel) GetByName(name string) (ScopeModel, error) {
	for _, scope := range s {
		if scope.Name == name {
			return scope, nil
		}
	}
	return ScopeModel{}, fmt.Errorf("Scope for `%s` is not found!", name)
}

func (s ScopesModel) GetByNames(names []string) (out ScopesModel, err error) {
	var temp ScopeModel
	for _, name := range names {
		if temp, err = s.GetByName(name); err != nil {
			return
		}
		out = append(out, temp)
	}
	if len(out) == 0 {
		err = fmt.Errorf("Not containing scope`%s`", strings.Join(names, ", "))
	}
	return
}

func (s ScopesModel) GetByCommandName(commandName string) (out ScopesModel, err error) {
	for _, scope := range s {
		if _, err := scope.Commands.GetByNames(commandName); err == nil {
			out = append(out, scope)
		}
	}
	if len(out) <= 0 {
		err = fmt.Errorf("scopes don't contain command for `%s`", commandName)
	}
	return
}

func (s ScopesModel) GetByCommandNames(commandNames ...string) (out ScopesModel, err error) {
	var temp ScopesModel
	for _, commandName := range commandNames {
		if temp, err = s.GetByCommandName(commandName); err == nil {
			out = append(out, temp...)
		}
	}
	if len(out) <= 0 {
		err = fmt.Errorf("commands for `%s` are not found", strings.Join(commandNames, ", "))
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

// TODO: no-need parameter, get name and teamID from itself
func (s *ScopeModel) validate(name string, teamID uuid.UUID) error {
	if name == "" {
		return fmt.Errorf("Scope name couldn't be empty")
	}
	if teamID == uuid.Nil {
		return fmt.Errorf("teamID couldn't be empty")
	}
	return nil
}

// TODO: remove all dependency to external model. i.e: slack.User
func (s *ScopeModel) Create(name, createdBy string, teamID uuid.UUID, slackUsers []slack.User, commands CommandsModel) error {
	if err := s.validate(name, teamID); err != nil {
		return err
	}
	s.create(name, createdBy, teamID)
	for _, u := range slackUsers {
		var temp ScopeDetailModel
		temp.Create(u, createdBy, s.ID)
		s.ScopeDetails = append(s.ScopeDetails, temp)
	}
	for i, cmd := range commands {
		var tempCommandDetail CommandDetailModel
		tempCommandDetail.Create(cmd.ID, s.ID, createdBy)
		cmd.CommandDetails = CommandDetailsModel{tempCommandDetail}
		commands[i] = cmd
	}
	s.Commands = commands
	return nil
}

func (s *ScopeModel) Update(updatedBy string) {
	now := time.Now()
	s.Updated = &now
	s.UpdatedBy = &updatedBy
	return
}

func (s *ScopeModel) AddScopeDetail(updatedBy string, slackUsers []slack.User, commands CommandsModel) (newScopeDetails ScopeDetailsModel, newCommandDetails CommandDetailsModel, err error) {
	s.Update(updatedBy)
	if err = s.validate(s.Name, s.TeamID); err != nil {
		return
	}
	for _, u := range slackUsers {
		var temp ScopeDetailModel
		temp.Create(u, updatedBy, s.ID)
		s.ScopeDetails = append(s.ScopeDetails, temp)
		newScopeDetails = append(newScopeDetails, temp)
	}
	for _, cmd := range commands {
		var tempCommandDetail CommandDetailModel
		tempCommandDetail.Create(cmd.ID, s.ID, updatedBy)
		cmd.CommandDetails.Append(tempCommandDetail)
		s.Commands.Append(cmd)
		newCommandDetails = append(newCommandDetails, tempCommandDetail)
	}
	return
}

func (s *ScopeModel) ReduceScopeDetail(updatedBy string, slackUsers ...slack.User) (deletedScopeDetails ScopeDetailsModel, err error) {
	s.Update(updatedBy)
	var userNames []string
	for _, u := range slackUsers {
		userNames = append(userNames, u.RealName)
		if deleted, err := s.ScopeDetails.RemoveBySlackUser(u.ID); err == nil {
			deletedScopeDetails = append(deletedScopeDetails, deleted)
		}
	}
	if len(deletedScopeDetails) == 0 {
		err = fmt.Errorf("No scope detail for %s that contains user for %s to be deleted", s.Name, strings.Join(userNames, ","))
	}
	return
}

// TODO: rename to ScopeUser? berderet ke lain jg
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

func (s *ScopeDetailModel) Create(slackUser slack.User, createdBy string, scopeID uuid.UUID) {
	s.ID = uuid.NewV4()
	s.ScopeID = scopeID
	s.UserSlackID = slackUser.ID
	s.UserSlackName = slackUser.RealName
	s.CreatedBy = createdBy
	s.Created = time.Now()
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

func (s ScopeDetailsModel) GetUserSlackNames() (out []string) {
	for _, sd := range s {
		out = append(out, sd.UserSlackName)
	}
	return
}

func GeneratePublicScope() (out ScopeModel) {
	out.create(ScopePublic, "default", uuid.Nil)
	return
}
