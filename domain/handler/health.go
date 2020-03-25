package handler

import (
	errorLib "cakcuk/utils/errors"
	"cakcuk/utils/response"
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

type HealthHandler struct {
	hp HealthPersistence
}

func NewHealthHandler(persistence HealthPersistence) *HealthHandler {
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
		response.Failed(w, 500, errorLib.ErrorSuttingDown)
		return
	}

	if h.hp != nil && !h.hp.Ping() {
		response.Failed(w, 500, errorLib.ErrorPersistenceCheck)
		return
	}

	response.Success(w, 200, "Cakcuk is running...")
}
