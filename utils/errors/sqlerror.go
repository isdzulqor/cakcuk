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
		case 1061:
			return ErrorDuplicateEntry
		case 1062:
			return ErrorAlreadyExists
		case 1064:
			return ErrorFalseSyntax
		case 1050:
			return ErrorTableAlreadyExist.AppendMessage(sqlErr.Message)
		case 1065:
			return ErrorSQLQueryEmpty.AppendMessage(sqlErr.Message)
		}
	}
	switch in.Error() {
	case "sql: no rows in result set":
		return ErrorNotExist
	}

	// SQLite errors
	// i.e: index idx_createdBy_SSH already exists
	if strings.HasPrefix(in.Error(), "index") && strings.HasSuffix(in.Error(), "already exists") {
		return ErrorIndexAlreadyExists
	}
	// i.e: UNIQUE constraint failed: SSH.id
	if strings.HasPrefix(in.Error(), "UNIQUE constraint faile") {
		return ErrorAlreadyExists
	}

	return in
}

func FormatQueryError(query string, args ...interface{}) (out string) {
	for _, arg := range args {
		out = strings.Replace(query, "?", anyToQueryParam(arg), 1)
		query = out
	}
	if out == "" {
		return fmt.Sprintf("query: %s\targs: %s", query, args)
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
