package health

import (
	"cakcuk/utils/response"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

var IsShuttingDown bool

type HealthPersistence interface {
	Ping() bool
	Close()
}

type HealthHandler struct {
	hp HealthPersistence
}

func NewHealthGSHandler(persistence HealthPersistence) *HealthHandler {
	handler := &HealthHandler{hp: persistence}
	handler.GracefulShutdown()
	return handler
}

func (h HealthHandler) GracefulShutdown() {
	stopChan := make(chan os.Signal)
	signal.Notify(stopChan, os.Interrupt, syscall.SIGTERM)
	go h.ListenToSigTerm(stopChan)
}

func (h HealthHandler) ListenToSigTerm(stopChan chan os.Signal) {
	<-stopChan
	log.Println("Shutting down server...")
	IsShuttingDown = true
	h.hp.Close()
	log.Println("Bye..")
	os.Exit(0)
}

func (h HealthHandler) GetHealth(w http.ResponseWriter, r *http.Request) {
	if IsShuttingDown {
		response.Failed(w, 500, errors.New("service is shutting down"))
		return
	}

	if h.hp != nil && !h.hp.Ping() {
		response.Failed(w, 500, errors.New("persistence fail"))
		return
	}

	response.Success(w, 200, Health{Message: "service is alive"})
}
