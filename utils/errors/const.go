package errors

const (
	ExtractCommandInvalid = "ExtractCommandInvalid"
	HelpCommandInvalid    = "HelpCommandInvalid"
	CakCommandInvalid     = "CakCommandInvalid"
	CukCommandInvalid     = "CukCommandInvalid"
	CustomCommandInvalid  = "CustomCommandInvalid"
)

var (
	ErrorExtractCommand = WithMessage(ExtractCommandInvalid, "Failed to extract command!")
	ErrorHelp           = WithMessage(HelpCommandInvalid, "Failed to process Help!")
	ErrorCak            = WithMessage(CakCommandInvalid, "Failed to process Cak!")
	ErrorCuk            = WithMessage(CukCommandInvalid, "Failed to process Cuk!")
	ErrorCustomCommand  = WithMessage(CustomCommandInvalid, "Failed to process command!")
)
