package model

import (
	"cakcuk/external"
	stringLib "cakcuk/utils/string"
	"fmt"
	"strings"
	"time"

	"github.com/guregu/null"
	"github.com/slack-go/slack"

	uuid "github.com/satori/go.uuid"
)

const (
	ScopePublic = "public"
)

type ScopeModel struct {
	ID        uuid.UUID   `json:"id" db:"id"`
	Name      string      `json:"name" db:"name"`
	TeamID    uuid.UUID   `json:"teamID" db:"teamID"`
	Created   time.Time   `json:"created" db:"created"`
	CreatedBy string      `json:"createdBy" db:"createdBy"`
	Updated   null.Time   `json:"updated" db:"updated"`
	UpdatedBy null.String `json:"updatedBy" db:"updatedBy"`

	ScopeDetails  ScopeDetailsModel `json:"scopeDetails"`
	Commands      CommandsModel     `json:"commands"`
	ScopeChannels ScopeChannels     `json:"scopeChannels"`
}

func (s ScopeModel) Clone() ScopeModel {
	s.ScopeChannels = append(ScopeChannels{}, s.ScopeChannels...)
	s.ScopeDetails = append(ScopeDetailsModel{}, s.ScopeDetails...)
	s.Commands = append(CommandsModel{}, s.Commands...)
	return s
}

func (s *ScopeModel) DeleteByCommands(deletedCommands CommandsModel) {
	s.Commands.Delete(deletedCommands)
	return
}

func (s ScopeModel) Print(isOneLine bool) (out string) {
	out = "- " + s.Name
	if isOneLine {
		return
	}
	command := printList("\t", "No command registered")
	if len(s.Commands) > 0 {
		command = printList("\t", s.Commands.GetNames()...)
	}
	out += "\n  Registered Commands:\n" + command
	user := printList("\t", "No registered user")
	if s.Name == ScopePublic {
		user = printList("\t", "All Users")
	}
	if len(s.ScopeDetails) > 0 {
		user = printList("\t", s.ScopeDetails.GetUserReferenceNames()...)
	}
	out += "\n  Who can access:\n" + user

	channel := printList("\t", "All Channels")
	if len(s.ScopeChannels) > 0 {
		channel = printList("\t", s.ScopeChannels.GetChannelNames()...)
	}

	out += "\n  Can access from:\n" + channel
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

func (s ScopesModel) GetAllScopeDetails() (out ScopeDetailsModel) {
	for _, scope := range s {
		out = append(out, scope.ScopeDetails...)
	}
	return
}

func (s ScopesModel) GetUserNameByUserReferenceID(userReferenceID string) string {
	sd := s.GetAllScopeDetails().GetUserNameByUserReferenceID(userReferenceID)
	if len(sd) > 0 {
		return sd[0].UserReferenceName
	}
	return ""
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
	if out != "" {
		out = "Scope List\n\n" + out
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
	for i := range *s {
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
	if strings.Contains(name, " ") {
		return fmt.Errorf("`%s` Scope name couldn't contain space", name)
	}
	if teamID == uuid.Nil {
		return fmt.Errorf("teamID couldn't be empty")
	}
	return nil
}

func (s *ScopeModel) Create(name, createdBy string, teamID uuid.UUID,
	users UsersModel,
	commands CommandsModel,
	channels ScopeChannels) error {
	if err := s.validate(name, teamID); err != nil {
		return err
	}
	s.create(name, createdBy, teamID)
	for _, u := range users {
		var temp ScopeDetailModel
		temp.Create(u.ReferenceID, u.Name, createdBy, s.ID)
		s.ScopeDetails = append(s.ScopeDetails, temp)
	}
	for _, channel := range channels {
		s.ScopeChannels = append(s.ScopeChannels, ScopeChannel{
			ScopeID:    s.ID,
			ChannelRef: channel.ChannelRef,
			Created:    time.Now(),
			CreatedBy:  createdBy,
		})
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
	s.Updated = null.TimeFrom(now)
	s.UpdatedBy = null.StringFrom(updatedBy)
	return
}

func (s *ScopeModel) AddScopeDetail(updatedBy string, users UsersModel, commands CommandsModel, channels ScopeChannels) (newScopeDetails ScopeDetailsModel, newCommandDetails CommandDetailsModel, newChannels ScopeChannels, err error) {
	s.Update(updatedBy)
	if err = s.validate(s.Name, s.TeamID); err != nil {
		return
	}
	for _, u := range users {
		var temp ScopeDetailModel
		temp.Create(u.ReferenceID, u.Name, updatedBy, s.ID)
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
	for _, channel := range channels {
		newChannel := ScopeChannel{
			ScopeID:    s.ID,
			ChannelRef: channel.ChannelRef,
			Created:    time.Now(),
			CreatedBy:  updatedBy,
		}

		s.ScopeChannels = append(s.ScopeChannels, newChannel)
		newChannels = append(newChannels, newChannel)
	}

	return
}

func (s *ScopeModel) ReduceScopeDetail(updatedBy string, slackUsers ...slack.User) (deletedScopeDetails ScopeDetailsModel, err error) {
	s.Update(updatedBy)
	var userNames []string
	for _, u := range slackUsers {
		userNames = append(userNames, u.RealName)
		if deleted, err := s.ScopeDetails.RemoveByReferenceUser(u.ID); err == nil {
			deletedScopeDetails = append(deletedScopeDetails, deleted)
		}
	}
	if len(deletedScopeDetails) == 0 {
		err = fmt.Errorf("No scope detail for %s that contains user for %s to be deleted", s.Name, strings.Join(userNames, ","))
	}
	return
}

func (s *ScopeModel) ReduceScopeDetailCustom(updatedBy string, slackUsers ...external.SlackUserCustom) (deletedScopeDetails ScopeDetailsModel, err error) {
	s.Update(updatedBy)
	var userNames []string
	for _, u := range slackUsers {
		userNames = append(userNames, stringLib.ReadSafe(u.Name))
		if deleted, err := s.ScopeDetails.RemoveByReferenceUser(stringLib.ReadSafe(u.ID)); err == nil {
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
	ID                uuid.UUID   `json:"id" db:"id"`
	ScopeID           uuid.UUID   `json:"scopeID" db:"scopeID"`
	UserReferenceID   string      `json:"userReferenceID" db:"userReferenceID"`
	UserReferenceName string      `json:"userReferenceName" db:"userReferenceName"`
	Created           time.Time   `json:"created" db:"created"`
	CreatedBy         string      `json:"createdBy" db:"createdBy"`
	Updated           null.Time   `json:"updated" db:"updated"`
	UpdatedBy         null.String `json:"updatedBy" db:"updatedBy"`
}

func (s *ScopeDetailModel) Create(userReferenceID, realName string, createdBy string, scopeID uuid.UUID) {
	s.ID = uuid.NewV4()
	s.ScopeID = scopeID
	s.UserReferenceID = userReferenceID
	s.UserReferenceName = realName
	s.CreatedBy = createdBy
	s.Created = time.Now()
}

type ScopeDetailsModel []ScopeDetailModel

func (s *ScopeDetailsModel) RemoveByReferenceUser(userReferenceID string) (deletedScopeDetail ScopeDetailModel, err error) {
	var newScopeDetail ScopeDetailsModel
	for i, d := range *s {
		if d.UserReferenceID == userReferenceID {
			deletedScopeDetail = d
			newScopeDetail = append(newScopeDetail, (*s)[i+1:]...)
			break
		}
		newScopeDetail = append(newScopeDetail, d)
	}
	*s = newScopeDetail
	if deletedScopeDetail.ID == uuid.Nil {
		err = fmt.Errorf("userReferenceID for %s is not found to be removed", userReferenceID)
	}
	return
}

func (s ScopeDetailsModel) GetUserReferenceNames() (out []string) {
	for _, sd := range s {
		out = append(out, sd.UserReferenceName)
	}
	return
}

func (s ScopeDetailsModel) GetUserNameByUserReferenceID(referenceID string) (out ScopeDetailsModel) {
	for _, sd := range s {
		if sd.UserReferenceID == referenceID {
			out = append(out, sd)
		}
	}
	return
}

func GeneratePublicScope() (out ScopeModel) {
	out.create(ScopePublic, "default", uuid.Nil)
	return
}

type ScopeChannel struct {
	ScopeID    uuid.UUID `json:"scopeID" db:"scopeID"`
	ChannelRef string    `json:"channelRef" db:"channelRef"`
	Created    time.Time `json:"created" db:"created"`
	CreatedBy  string    `json:"createdBy" db:"createdBy"`

	Updated   null.Time   `json:"updated" db:"updated"`
	UpdatedBy null.String `json:"updatedBy" db:"updatedBy"`
}

type ScopeChannels []ScopeChannel

func (s ScopeChannels) GetChannelNames() (out []string) {
	// i.e: <#C05RABFDRJB> -> C05RABFDRJB -> #random
	// ^ that is example how to make slack channel ID is human readable
	for _, sd := range s {
		out = append(out, fmt.Sprintf("<#%s>", sd.ChannelRef))
	}
	return
}
