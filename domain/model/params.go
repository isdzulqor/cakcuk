package model

import (
	"io"
	"net/url"
)

type OutputFromCukCommand struct {
	HttpMethod       string
	BaseURL          string
	QueryParam       url.Values
	Headers          map[string]string
	Body             io.Reader
	TemplateResponse string
	WithSSHID        string
}
