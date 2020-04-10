package model

import (
	"fmt"
	"time"

	uuid "github.com/satori/go.uuid"
	"github.com/slack-go/slack"
)

type (
	UserModel struct {
		ID          uuid.UUID  `json:"id" db:"id"`
		Name        string     `json:"name" db:"name"`
		ReferenceID string     `json:"referenceID" db:"referenceID"`
		TeamID      uuid.UUID  `json:"teamID" db:"teamID"`
		Created     time.Time  `json:"created" db:"created"`
		CreatedBy   string     `json:"createdBy" db:"createdBy"`
		Updated     *time.Time `json:"updated" db:"updated"`
		UpdatedBy   *string    `json:"updatedBy" db:"updatedBy"`
	}
	UsersModel []UserModel
)

func (u UserModel) validate() error {
	if u.ID == uuid.Nil {
		return fmt.Errorf("userID is mandatory")
	}
	if u.ReferenceID == "" {
		return fmt.Errorf("referenceID is mandatory")
	}
	if u.TeamID == uuid.Nil {
		return fmt.Errorf("teamID is mandatory")
	}
	if u.Name == "" {
		return fmt.Errorf("user name is mandatory")
	}
	return nil
}

func (u *UserModel) Create(name, referenceID, createdBy string, teamID uuid.UUID) (err error) {
	u.ID = uuid.NewV4()
	u.Name = name
	u.ReferenceID = referenceID
	u.TeamID = teamID
	u.Created = time.Now()
	u.CreatedBy = createdBy
	err = u.validate()
	return
}

func (u *UserModel) Update(newUser UserModel, updatedBy string) (err error) {
	u.Name = newUser.Name
	u.ReferenceID = newUser.ReferenceID
	u.TeamID = newUser.TeamID
	u.UpdatedBy = &updatedBy
	now := time.Now()
	u.Updated = &now
	err = u.validate()
	return
}

func (u UsersModel) GetIDs() (out []uuid.UUID) {
	for _, user := range u {
		out = append(out, user.ID)
	}
	return
}

func (u UsersModel) GetNames() (out []string) {
	for _, user := range u {
		out = append(out, user.Name)
	}
	return
}

func (u UsersModel) GetByUserReferenceID(userReferenceID string) (out UserModel, err error) {
	for _, user := range u {
		if user.ReferenceID == userReferenceID {
			out = user
			return
		}
	}
	err = fmt.Errorf("No user found for %s", userReferenceID)
	return
}

func (u UsersModel) Print() (out string) {
	out = printList("", u.GetNames()...)
	return
}

func (u *UsersModel) Create(slackUsers []slack.User, createdBy string, teamID uuid.UUID) (err error) {
	if len(slackUsers) == 0 {
		err = fmt.Errorf("No users to be created")
		return
	}
	var user UserModel
	for _, slackUser := range slackUsers {
		if err = user.Create(slackUser.RealName, slackUser.ID, createdBy, teamID); err != nil {
			return
		}
		(*u).Append(user)
	}
	return
}

func (u *UsersModel) Append(users ...UserModel) {
	*u = append(*u, users...)
	return
}
