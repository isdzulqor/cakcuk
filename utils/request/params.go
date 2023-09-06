package request

import (
	"io"
	"net/url"
)

type InputRequest struct {
	Method      string
	Url         string
	QueryParams url.Values
	Headers     map[string]string
	Body        io.Reader
	IsDump      bool
}

type InputWithSSH struct {
	Username string
	Host     string
	Port     int
	Password string
	SSHKey   string
}

type InputRequestWithSSH struct {
	InputRequest
	InputWithSSH
}
