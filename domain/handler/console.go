package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/response"
	"time"

	"fmt"
	"net/http"
)

type ConsoleHandler struct {
	Config         *config.Config          `inject:""`
	ConsoleService *service.ConsoleService `inject:""`
	BasePath       *string                 `inject:"basePath"`
}

// TODO: implement this
func (h ConsoleHandler) Exec(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	authSign, err := h.verifyAuthSign(r)
	if err != nil {
		response.Failed(r.Context(), w, http.StatusUnauthorized, err)
		return
	}

	var out model.PlaygroundModel
	message := r.FormValue("message")
	if isBotMentioned(&message) {
		sanitizeWords(&message)
		if out, err = h.ConsoleService.Exec(ctx, message, *authSign); err != nil {
			response.Failed(ctx, w, http.StatusNotFound, err)
			return
		}
		response.Success(ctx, w, http.StatusOK, out)
		return
	}
	err = fmt.Errorf("Just mention @cakcuk to execute command!")
	response.Failed(ctx, w, http.StatusBadRequest, err)
}

func (h ConsoleHandler) Verify(w http.ResponseWriter, r *http.Request) {
	_, err := h.verifyAuthSign(r)
	if err != nil {
		response.Failed(r.Context(), w, http.StatusUnauthorized, err)
		return
	}

	response.Success(r.Context(), w, http.StatusOK, map[string]interface{}{
		"message": "success",
	})
}

func (h ConsoleHandler) verifyAuthSign(r *http.Request) (*model.AuthSign, error) {
	stringAuthSign := r.Header.Get("x-auth-sign")
	password := r.Header.Get("x-auth-password")
	if stringAuthSign == "" {
		return nil, errorLib.ErrorConsoleUnAuthorized
	}
	if password == "" {
		return nil, errorLib.ErrorConsoleUnAuthorized
	}

	authSign, err := model.DecryptAuthSign(h.Config.Slack.Token, stringAuthSign)
	if err != nil {
		return nil, errorLib.ErrorConsoleUnAuthorized
	}
	nowTs := time.Now().Unix()
	if nowTs > authSign.ExpiredAt {
		return nil, errorLib.ErrorConsoleUnAuthorized.AppendMessage("auth sign expired")
	}

	if authSign.Password != password {
		return nil, errorLib.ErrorConsoleUnAuthorized.AppendMessage("invalid password")
	}
	return authSign, nil
}
