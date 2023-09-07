package errors

import (
	"fmt"
	"net/http"
)

const (
	ExtractCommandInvalid   = "ExtractCommandInvalid"
	HelpCommandInvalid      = "HelpCommandInvalid"
	CakCommandInvalid       = "CakCommandInvalid"
	CakGroupCommandInvalid  = "CakGroupCommandInvalid"
	CukCommandInvalid       = "CukCommandInvalid"
	DelCommandInvalid       = "DelCommandInvalid"
	ScopeCommandInvalid     = "ScopeCommandInvalid"
	SuperUserCommandInvalid = "SuperUserCommandInvalid"
	CustomCommandInvalid    = "CustomCommandInvalid"
	PersistenceFailed       = "PersistenceFailed"
	CommandNotAllowed       = "CommandNotAllowed"
	TableAlreadyExist       = "TableAlreadyExist"
	SQLQueryEmpty           = "SQLQueryEmpty"
	SlackOauthInvalid       = "SlackOauthInvalid"
	SlackClientInvalid      = "SlackClientInvalid"

	ClientRequestInvalid = "ClientRequestInvalid"
	ConsoleUnauthorized  = "ConsoleUnauthorized"
)

var (
	ErrorExtractCommand    = WithMessage(ExtractCommandInvalid, "Failed to extract command.")
	ErrorHelp              = WithMessage(HelpCommandInvalid, "Failed to display command details.")
	ErrorCak               = WithMessage(CakCommandInvalid, "Failed to create new command.")
	ErrorCuk               = WithMessage(CukCommandInvalid, "Failed to hit endpoint.")
	ErrorDel               = WithMessage(DelCommandInvalid, "Failed to delete command.")
	ErrorScope             = WithMessage(ScopeCommandInvalid, "Failed to execute scope.")
	ErrorSuperUser         = WithMessage(SuperUserCommandInvalid, "Failed to execute superuser.")
	ErrorCustomCommand     = WithMessage(CustomCommandInvalid, "Failed to process command.")
	ErrorCakGroup          = WithMessage(CakGroupCommandInvalid, "Failed to process command.")
	ErrorPersistenceCheck  = WithMessage(PersistenceFailed, "Failed to ping persinstences.")
	ErrorCommandNotAllowed = WithMessage(CommandNotAllowed, "Command is not allowed.")
	ErrorTableAlreadyExist = Error{Code: TableAlreadyExist}
	ErrorSQLQueryEmpty     = Error{Code: SQLQueryEmpty}

	// Slack error
	ErrorSlackOauthInvalid  = Error{Code: SlackOauthInvalid}
	ErrorSlackClientInvalid = Error{Code: SlackClientInvalid}

	ErrorAlreadyExists  = fmt.Errorf("already exists")
	ErrorNotExist       = fmt.Errorf("doesn't exists")
	ErrorSuttingDown    = fmt.Errorf("Service is shutting down...")
	ErrorFalseSyntax    = fmt.Errorf("false syntax")
	ErrorInternalServer = fmt.Errorf(http.StatusText(500))
	ErrorTooManyRequest = fmt.Errorf(http.StatusText(429))
	ErrorUnauthorized   = fmt.Errorf(http.StatusText(401))

	ErrorClientRequestInvalid = Error{Code: ClientRequestInvalid}

	ErrorConsoleUnAuthorized = Error{Code: ConsoleUnauthorized}
)
