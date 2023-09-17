package external

type InputPostMessage struct {
	Token    *string
	ThreadTs *string
	Username string
	Channel  string
	Text     string
}

type InputLeaveChannel struct {
	Token   *string
	Channel string
}
