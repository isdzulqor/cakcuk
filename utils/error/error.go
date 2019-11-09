package customerror

import (
	jsonLib "cakcuk/utils/json"
)

type Error struct {
	Code    string      `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func (e *Error) Error() (out string) {
	out, _ = jsonLib.ToStringJson(e)
	return
}

func New(code string) error {
	return &Error{
		Code:    code,
		Message: "An error has occured" + code,
	}
}

func WithMessage(code, message string) error {
	return &Error{
		Code:    code,
		Message: message,
	}
}

func WithData(code, message string, data interface{}) error {
	return &Error{
		Code:    code,
		Message: message,
		Data:    data,
	}
}
