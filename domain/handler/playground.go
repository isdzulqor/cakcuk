package handler

import (
	"cakcuk/config"
	"cakcuk/domain/service"
	"cakcuk/utils/response"

	"fmt"
	"net/http"

	uuid "github.com/satori/go.uuid"
)

type PlaygroundHandler struct {
	Config            *config.Config             `inject:""`
	PlaygroundService *service.PlaygroundService `inject:""`
}

func (h PlaygroundHandler) Play(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var out string
	var err error
	incomingMessage := r.FormValue("message")
	id := r.FormValue("id")
	teamID := uuid.FromStringOrNil(id)

	if isBotMentioned(&incomingMessage) {
		clearUnusedWords(&incomingMessage)
		if out, err = h.PlaygroundService.Play(ctx, incomingMessage, teamID); err != nil {
			response.Failed(w, http.StatusNotFound, err)
			return
		}
		response.Success(w, http.StatusOK, out)
		return
	}
	err = fmt.Errorf("No trigger command for your message %s", incomingMessage)
	response.Failed(w, http.StatusBadRequest, err)
}
