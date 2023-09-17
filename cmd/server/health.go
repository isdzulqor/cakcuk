package server

import (
	"cakcuk/config"
	"cakcuk/utils/logging"
	"context"
	"os"
	"time"

	"github.com/jmoiron/sqlx"
)

type HealthPersistences struct {
	DB     *sqlx.DB       `inject:""`
	Config *config.Config `inject:""`
}

func (h *HealthPersistences) Ping() bool {
	if err := h.DB.Ping(); err != nil {
		logging.Logger(context.Background()).Errorf("Failed to ping to DB, err: %v", err)
		return false
	}
	return true
}

func (h *HealthPersistences) Close() {
	time.Sleep(h.Config.DelayShutdown)
	h.DB.Close()
	if h.Config.SQLITE.Enabled {
		filePath := h.Config.BasePath + "/" + h.Config.SQLITE.FileName
		// delete sqlite file
		if err := os.Remove(filePath); err != nil {
			logging.Logger(context.Background()).Errorf("Failed to delete sqlite file, err: %v", err)
		}
	}
}
