package errors

import "fmt"

const (
	ExtractCommandInvalid = "ExtractCommandInvalid"
	HelpCommandInvalid    = "HelpCommandInvalid"
	CakCommandInvalid     = "CakCommandInvalid"
	CukCommandInvalid     = "CukCommandInvalid"
	DelCommandInvalid     = "DelCommandInvalid"
	CustomCommandInvalid  = "CustomCommandInvalid"
	PersistenceFailed     = "PersistenceFailed"
)

var (
	ErrorExtractCommand   = WithMessage(ExtractCommandInvalid, "Failed to extract command.")
	ErrorHelp             = WithMessage(HelpCommandInvalid, "Failed to display command details.")
	ErrorCak              = WithMessage(CakCommandInvalid, "Failed to create new command.")
	ErrorCuk              = WithMessage(CukCommandInvalid, "Failed to hit endpoint.")
	ErrorDel              = WithMessage(DelCommandInvalid, "Failed to delete command.")
	ErrorCustomCommand    = WithMessage(CustomCommandInvalid, "Failed to process command.")
	ErrorPersistenceCheck = WithMessage(PersistenceFailed, "Failed to ping persinstences.")

	ErrorAlreadyExists = fmt.Errorf("already exists")
	ErrorSuttingDown   = fmt.Errorf("Service is shutting down...")
)
