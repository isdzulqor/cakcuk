package errors

import "fmt"

const (
	ExtractCommandInvalid   = "ExtractCommandInvalid"
	HelpCommandInvalid      = "HelpCommandInvalid"
	CakCommandInvalid       = "CakCommandInvalid"
	CukCommandInvalid       = "CukCommandInvalid"
	DelCommandInvalid       = "DelCommandInvalid"
	ScopeCommandInvalid     = "ScopeCommandInvalid"
	SuperUserCommandInvalid = "SuperUserCommandInvalid"
	CustomCommandInvalid    = "CustomCommandInvalid"
	PersistenceFailed       = "PersistenceFailed"
)

var (
	ErrorExtractCommand   = WithMessage(ExtractCommandInvalid, "Failed to extract command.")
	ErrorHelp             = WithMessage(HelpCommandInvalid, "Failed to display command details.")
	ErrorCak              = WithMessage(CakCommandInvalid, "Failed to create new command.")
	ErrorCuk              = WithMessage(CukCommandInvalid, "Failed to hit endpoint.")
	ErrorDel              = WithMessage(DelCommandInvalid, "Failed to delete command.")
	ErrorScope            = WithMessage(ScopeCommandInvalid, "Failed to execute scope.")
	ErrorSuperUser        = WithMessage(SuperUserCommandInvalid, "Failed to execute super user.")
	ErrorCustomCommand    = WithMessage(CustomCommandInvalid, "Failed to process command.")
	ErrorPersistenceCheck = WithMessage(PersistenceFailed, "Failed to ping persinstences.")

	ErrorAlreadyExists = fmt.Errorf("already exists")
	ErrorNotExist      = fmt.Errorf("doesn't exists")
	ErrorSuttingDown   = fmt.Errorf("Service is shutting down...")
	ErrorFalseSyntax   = fmt.Errorf("false syntax")
)
