package errors

const (
	ExtractCommandInvalid = "ExtractCommandInvalid"
	HelpCommandInvalid    = "HelpCommandInvalid"
	CakCommandInvalid     = "CakCommandInvalid"
	CukCommandInvalid     = "CukCommandInvalid"
	CustomCommandInvalid  = "CustomCommandInvalid"
)

var (
	ErrorExtractCommand = WithMessage(ExtractCommandInvalid, "Failed to extract command.")
	ErrorHelp           = WithMessage(HelpCommandInvalid, "Failed to display command details.")
	ErrorCak            = WithMessage(CakCommandInvalid, "Failed to create new command.")
	ErrorCuk            = WithMessage(CukCommandInvalid, "Failed to hit endpoint.")
	ErrorCustomCommand  = WithMessage(CustomCommandInvalid, "Failed to process command.")
)
