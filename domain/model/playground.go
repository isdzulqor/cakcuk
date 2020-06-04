package model

var (
	PlaygroundBlacklistedCommands = func() []string {
		return []string{CommandSuperUser}
	}
)

type PlaygroundModel struct {
	Input           string `json:"input"`
	ExecutedCommand string `json:"executedCommand"`
	RawRequest      string `json:"rawRequest"`
	Result          string `json:"result"`
	RawResponse     string `json:"rawResponse"`
}
