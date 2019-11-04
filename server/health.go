package server

import (
	"cakcuk/config"
	"time"
)

// TODO
type HealthPersistences struct {
	Config *config.Config `inject:""`
}

// TODO
func (h *HealthPersistences) Ping() bool {
	// Ping DB
	return true
}

// TODO
func (h *HealthPersistences) Close() {
	duration := time.Duration(h.Config.DelayShutdownSecond) * time.Second
	time.Sleep(duration)
	// Close DB
}
