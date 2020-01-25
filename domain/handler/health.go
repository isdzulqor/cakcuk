package handler

import (
	"cakcuk/utils/response"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

var isShuttingDown bool

type HealthPersistence interface {
	Ping() bool
	Close()
}

type Health struct {
	Message string `json:"message"`
}

type HealthHandler struct {
	hp HealthPersistence
}

func NewHealthGSHandler(persistence HealthPersistence) *HealthHandler {
	handler := &HealthHandler{hp: persistence}
	handler.gracefulShutdown()
	return handler
}

func (h HealthHandler) gracefulShutdown() {
	stopChan := make(chan os.Signal)
	signal.Notify(stopChan, os.Interrupt, syscall.SIGTERM)
	go h.listenToSigTerm(stopChan)
}

func (h HealthHandler) listenToSigTerm(stopChan chan os.Signal) {
	<-stopChan
	log.Println("Shutting down server...")
	isShuttingDown = true
	h.hp.Close()
	log.Println("Bye..")
	os.Exit(0)
}

func (h HealthHandler) GetHealth(w http.ResponseWriter, r *http.Request) {
	if isShuttingDown {
		response.Failed(w, 500, errors.New("service is shutting down"))
		return
	}

	if h.hp != nil && !h.hp.Ping() {
		response.Failed(w, 500, errors.New("persistence fail"))
		return
	}

	response.Success(w, 200, Health{Message: "service is alive"})
}
