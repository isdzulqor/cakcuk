package model

import (
	"fmt"
	"time"

	uuid "github.com/satori/go.uuid"
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

func (u *UsersModel) Append(users ...UserModel) {
	*u = append(*u, users...)
	return
}
