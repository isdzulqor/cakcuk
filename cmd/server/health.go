package server

import (
	"cakcuk/config"
	"cakcuk/utils/logging"
	"context"
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
}
