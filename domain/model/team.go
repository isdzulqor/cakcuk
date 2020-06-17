package model

import (
	"cakcuk/external"
	jsonLib "cakcuk/utils/json"
	"fmt"
	"time"

	"github.com/slack-go/slack"

	uuid "github.com/satori/go.uuid"
)

type TeamModel struct {
	ID             uuid.UUID `json:"id" db:"id"`
	ReferenceID    string    `json:"referenceID" db:"referenceID"`
	ReferenceToken string    `json:"referenceToken" db:"referenceToken"`
	Name           string    `json:"name" db:"name"`
	Domain         string    `json:"domain" db:"domain"`
	EmailDomain    string    `json:"emailDomain" db:"emailDomain"`
	Created        time.Time `json:"created" db:"created"`
	CreatedBy      string    `json:"createdBy" db:"createdBy"`
}

func (t *TeamModel) Create(createdBy, referenceID, referenceToken string) {
	t.ID = uuid.NewV4()
	t.CreatedBy = createdBy
	t.ReferenceID = referenceID
	t.ReferenceToken = referenceToken
}

func (t *TeamModel) FromSlackTeam(slackTeam slack.TeamInfo) {
	t.Name = slackTeam.Name
	t.Domain = slackTeam.Domain
	t.EmailDomain = slackTeam.EmailDomain
	t.ReferenceID = slackTeam.ID
}

func (t *TeamModel) FromOauth2Response(oauth2Response external.SlackOauth2Response) (err error) {
	if team := oauth2Response.Team; team != nil {
		if team.Name != nil {
			t.Name = *team.Name
		}
		if team.ID != nil {
			t.ReferenceID = *team.ID
			return
		}
	}
	err = fmt.Errorf("No required field for oauth2 response value. data: %s", jsonLib.ToPrettyNoError(oauth2Response))
	return
}
