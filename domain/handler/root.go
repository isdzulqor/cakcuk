package handler

type RootHandler struct {
	Health   *HealthHandler   `inject:""`
	Slackbot *SlackbotHandler `inject:""`
}
