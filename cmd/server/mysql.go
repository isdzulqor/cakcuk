package server

import (
	"cakcuk/config"
	"fmt"

	"github.com/jmoiron/sqlx"
)

func initMySQL(conf *config.Config) (db *sqlx.DB, err error) {
	if db, err = sqlx.Open("mysql",
		fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", conf.MySQL.Username,
			conf.MySQL.Password, conf.MySQL.Host, conf.MySQL.Database)); err != nil {
		return
	}
	if err = db.Ping(); err != nil {
		return
	}
	db.SetMaxOpenConns(conf.MySQL.ConnectionLimit)
	return
}
