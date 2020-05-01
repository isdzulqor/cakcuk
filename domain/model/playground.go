package model

type PlaygroundModel struct {
	Input           string `json:"input"`
	ExecutedCommand string `json:"executedCommand"`
	RawRequest      string `json:"rawRequest"`
	Result          string `json:"result"`
	RawResponse     string `json:"rawResponse"`
}
