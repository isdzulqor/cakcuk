package errors

import (
	"strings"
)

type Error struct {
	Code    string      `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func (e Error) Error() (out string) {
	return e.Code + ": " + e.Message
}

func WithMessage(code, message string) Error {
	return Error{
		Code:    code,
		Message: message,
	}
}

func (e Error) AppendMessage(in ...string) Error {
	for _, s := range in {
		e.Message = strings.TrimSpace(e.Message + " " + s)
	}
	return e
}
