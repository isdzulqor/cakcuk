package errors

import (
	"fmt"

	"github.com/go-sql-driver/mysql"
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
