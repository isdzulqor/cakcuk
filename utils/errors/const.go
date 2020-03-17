package errors

const (
	ExtractCommandInvalid = "ExtractCommandInvalid"
	CakCommandInvalid     = "CakCommandInvalid"
	CukCommandInvalid     = "CukCommandInvalid"
	CustomCommandInvalid  = "CustomCommandInvalid"
)

var (
	ErrorExtractCommand = WithMessage(ExtractCommandInvalid, "Failed to extract command!")
	ErrorCak            = WithMessage(CakCommandInvalid, "Failed to process Cak command!")
	ErrorCuk            = WithMessage(CukCommandInvalid, "Failed to process Cuk command!")
	ErrorCustomCommand  = WithMessage(CustomCommandInvalid, "Failed to process command!")
)
