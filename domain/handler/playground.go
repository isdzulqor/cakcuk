package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	"cakcuk/utils/response"
	"strings"

	"fmt"
	"net/http"
)

type PlaygroundHandler struct {
	Config            *config.Config             `inject:""`
	PlaygroundService *service.PlaygroundService `inject:""`
}

func (h PlaygroundHandler) Play(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var out model.PlaygroundModel
	var err error
	message := r.FormValue("message")
	playID := r.FormValue("id")
	if message == "" || playID == "" {
		err = fmt.Errorf("message and id could not be empty")
		response.Failed(ctx, w, http.StatusBadRequest, err)
		return
	}

	if isBotMentioned(&message) {
		sanitizeWords(&message)
		if out, err = h.PlaygroundService.Play(ctx, message, playID); err != nil {
			response.Failed(ctx, w, http.StatusNotFound, err)
			return
		}
		response.Success(ctx, w, http.StatusOK, out)
		return
	}
	err = fmt.Errorf("Just mention @cakcuk to execute command!")
	response.Failed(ctx, w, http.StatusBadRequest, err)
}

func (h PlaygroundHandler) PlayUI(w http.ResponseWriter, r *http.Request) {
	path := "../playground-ui/public/" + strings.Replace(r.URL.Path, "/ui/playground", "", 1)
	http.ServeFile(w, r, path)
}
