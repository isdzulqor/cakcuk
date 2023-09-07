package handler

import (
	"cakcuk/config"
	"cakcuk/domain/model"
	"cakcuk/domain/service"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/response"
	"io/ioutil"
	"strconv"
	"time"

	"fmt"
	"net/http"
)

type ConsoleHandler struct {
	Config         *config.Config          `inject:""`
	ConsoleService *service.ConsoleService `inject:""`
	BasePath       *string                 `inject:"basePath"`
}

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

// SSH will add ssh config
func (h ConsoleHandler) SSH(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	authSign, err := h.verifyAuthSign(r)
	if err != nil {
		response.Failed(r.Context(), w, http.StatusUnauthorized, err)
		return
	}

	port := 22

	// Parse our multipart form, 10 << 20 specifies a maximum
	// upload of 1 MB files.
	err = r.ParseMultipartForm(1 << 20)
	if err != nil {
		response.Failed(ctx, w, http.StatusBadRequest, fmt.Errorf("failed to parse multipart form: %v", err))
		return
	}

	// Parse request parameters
	host := r.FormValue("host")
	username := r.FormValue("username")
	portString := r.FormValue("port")
	password := r.FormValue("password")
	if host == "" || username == "" {
		response.Failed(ctx, w, http.StatusBadRequest, fmt.Errorf("missing host or username parameter"))
		return
	}

	keyString := ""

	if password == "" {
		file, _, err := r.FormFile("keyfile")
		if err != nil {
			response.Failed(ctx, w, http.StatusBadRequest, fmt.Errorf("missing password parameter or keyfile"))
			return
		}
		defer file.Close()

		// read all of the contents of our uploaded file into a
		// byte array
		fileBytes, err := ioutil.ReadAll(file)
		if err != nil {
			response.Failed(ctx, w, http.StatusBadRequest, fmt.Errorf("failed to read keyfile: %v", err))
			return
		}
		keyString = string(fileBytes)
	}

	if portString != "" {
		port, err = strconv.Atoi(portString)
		if err != nil {
			response.Failed(ctx, w, http.StatusBadRequest, fmt.Errorf("invalid port format"))
			return
		}
	}

	out, err := h.ConsoleService.AddSSH(ctx, *authSign, model.SSH{
		Username:  username,
		Host:      host,
		Port:      port,
		Password:  password,
		CreatedBy: authSign.UserID,
		SSHKey:    keyString,
	})
	if err != nil {
		response.Failed(ctx, w, http.StatusBadRequest, err)
		return
	}

	response.Success(ctx, w, http.StatusOK, map[string]interface{}{
		"message": "success",
		"data": map[string]interface{}{
			"id":   out.ID,
			"host": out.Host,
		},
	})
}

// DeleteSSH will delete ssh config
func (h ConsoleHandler) DeleteSSH(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	_, err := h.verifyAuthSign(r)
	if err != nil {
		response.Failed(r.Context(), w, http.StatusUnauthorized, err)
		return
	}

	// Parse request parameters
	sshID := r.FormValue("id")
	if sshID == "" {
		response.Failed(ctx, w, http.StatusBadRequest, fmt.Errorf("missing id parameter"))
		return
	}

	err = h.ConsoleService.DeleteSSHByID(ctx, sshID)
	if err != nil {
		response.Failed(ctx, w, http.StatusInternalServerError, err)
		return
	}

	response.Success(ctx, w, http.StatusOK, map[string]interface{}{
		"message": "success",
	})
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
		return nil, errorLib.ErrorConsoleUnAuthorized.AppendMessage("missing x-auth-sign header")
	}
	if password == "" {
		return nil, errorLib.ErrorConsoleUnAuthorized.AppendMessage("missing x-auth-password header")
	}

	authSign, err := model.DecryptAuthSign(h.Config.Slack.Token, stringAuthSign)
	if err != nil {
		return nil, errorLib.ErrorConsoleUnAuthorized.AppendMessage(err.Error())
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
