package handler

type RootHandler struct {
	Health     *HealthHandler     `inject:""`
	Slackbot   *SlackbotHandler   `inject:""`
	Playground *PlaygroundHandler `inject:""`
	Console    *ConsoleHandler    `inject:""`
}
