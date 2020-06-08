package server

import (
	"cakcuk/config"
	errorLib "cakcuk/utils/errors"
	"fmt"
	"io/ioutil"
	"os"
	"sort"
	"strings"

	"github.com/jmoiron/sqlx"
)

func initMySQL(conf *config.Config, basePath string) (db *sqlx.DB, err error) {
	if db, err = sqlx.Open("mysql",
		fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", conf.MySQL.Username,
			conf.MySQL.Password, conf.MySQL.Host, conf.MySQL.Database)); err != nil {
		return
	}
	if err = db.Ping(); err != nil {
		return
	}
	db.SetMaxOpenConns(conf.MySQL.ConnectionLimit)
	return db, migrate(db, basePath)
}

func migrate(db *sqlx.DB, basePath string) error {
	migrationPath := basePath + "/migration/"
	sqlFiles, err := readSortedFiles(migrationPath)
	if err != nil {
		return err
	}
	for _, v := range sqlFiles {
		sqlString, err := ioutil.ReadFile(migrationPath + v)
		if err != nil {
			return err
		}
		queries := extractQueries(string(sqlString))
		for _, query := range queries {
			if _, err := db.Exec(string(query)); err != nil {
				err = errorLib.TranslateSQLError(err)
				if errorLib.IsEqual(err, errorLib.ErrorTableAlreadyExist) || errorLib.IsEqual(err, errorLib.ErrorSQLQueryEmpty) {
					err = nil
					continue
				}
				return err
			}
		}
	}
	return nil
}

func readSortedFiles(pathDir string) (fileNames []string, err error) {
	var (
		files []os.FileInfo
		stat  os.FileInfo
	)
	if stat, err = os.Stat(pathDir); err != nil || !stat.IsDir() {
		err = fmt.Errorf("Wrong path - %v", err)
		return
	}

	if files, err = ioutil.ReadDir(pathDir); err != nil {
		return
	}
	for _, f := range files {
		if !f.IsDir() {
			fileNames = append(fileNames, f.Name())
		}
	}
	sort.Sort(sort.StringSlice(fileNames))
	return
}

func extractQueries(query string) []string {
	return strings.Split(query, ";")
}
