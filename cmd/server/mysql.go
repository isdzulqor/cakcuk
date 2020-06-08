package server

import (
	"cakcuk/config"
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/logging"
	stringLib "cakcuk/utils/string"
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"sort"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"
)

func initMySQL(ctx context.Context, conf *config.Config, basePath string) (db *sqlx.DB, err error) {
	dbConnection := fmt.Sprintf("%s:%s@tcp(%s)/%s?parseTime=true", conf.MySQL.Username,
		conf.MySQL.Password, conf.MySQL.Host, conf.MySQL.Database)
	if db, err = sqlx.Open("mysql", dbConnection); err != nil {
		return
	}

	for i := 30; i > 0; i-- {
		err = db.Ping()
		if err == nil {
			break
		}
		if i == 0 {
			logging.Logger(ctx).Warnf("Not able to establish connection to database %s", dbConnection)
		}
		logging.Logger(ctx).Warnf("Could not connect to database. Wait 2 seconds. %d retries left...", i)
		time.Sleep(2 * time.Second)
	}
	if err != nil {
		return db, err
	}

	db.SetMaxOpenConns(conf.MySQL.ConnectionLimit)
	return db, migrate(db, basePath)
}

func migrate(db *sqlx.DB, basePath string) error {
	migrationPath := stringLib.SanitizePath(basePath + "/migration/")
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
