package errors

import (
	"fmt"
	"strings"

	"github.com/go-sql-driver/mysql"
	uuid "github.com/satori/go.uuid"
)

func TranslateSQLError(in error) error {
	if sqlErr, ok := (in).(*mysql.MySQLError); ok {
		switch sqlErr.Number {
		case 1062:
			return fmt.Errorf("It already exists in a database.")
		}
	}
	return in
}

func FormatQueryError(query string, args ...interface{}) (out string) {
	for _, arg := range args {
		out = strings.Replace(query, "?", anyToQueryParam(arg), 1)
		query = out
	}
	return
}

func anyToQueryParam(in interface{}) (out string) {
	switch v := in.(type) {
	case string, uuid.UUID, uuid.NullUUID:
		if v != nil {
			out = "'" + fmt.Sprint(v) + "'"
			return
		}
	}
	out = fmt.Sprint(in)
	if out == "<nil>" {
		out = "null"
	}
	return
}
