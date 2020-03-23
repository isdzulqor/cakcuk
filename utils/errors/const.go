package errors

import "fmt"

const (
	ExtractCommandInvalid = "ExtractCommandInvalid"
	HelpCommandInvalid    = "HelpCommandInvalid"
	CakCommandInvalid     = "CakCommandInvalid"
	CukCommandInvalid     = "CukCommandInvalid"
	DelCommandInvalid     = "DelCommandInvalid"
	CustomCommandInvalid  = "CustomCommandInvalid"
)

var (
	ErrorExtractCommand = WithMessage(ExtractCommandInvalid, "Failed to extract command.")
	ErrorHelp           = WithMessage(HelpCommandInvalid, "Failed to display command details.")
	ErrorCak            = WithMessage(CakCommandInvalid, "Failed to create new command.")
	ErrorCuk            = WithMessage(CukCommandInvalid, "Failed to hit endpoint.")
	ErrorDel            = WithMessage(DelCommandInvalid, "Failed to delete command.")
	ErrorCustomCommand  = WithMessage(CustomCommandInvalid, "Failed to process command.")
	ErrorAlreadyExists  = fmt.Errorf("already exists")
)
