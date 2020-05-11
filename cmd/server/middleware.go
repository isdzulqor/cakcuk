package server

import (
	"cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"cakcuk/utils/response"
	"net"
	"net/http"
	"time"
)

func RecoverHandler(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				ctx := r.Context()
				logging.Logger(ctx).Error(err)
				response.Failed(ctx, w, http.StatusInternalServerError, errors.ErrorInternalServer)
			}
		}()
		next.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

func LoggingHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := logging.GetContext(r.Context())

		ip, err := getIpAddress(r)
		if err != nil {
			response.Failed(ctx, w, http.StatusInternalServerError, errors.ErrorInternalServer)
			return
		}
		ctx = logging.WithAddressContext(ctx, ip)
		start := time.Now()
		logging.Logger(ctx).Info("Income: " + r.Method + " " + r.RequestURI)
		next.ServeHTTP(w, r.WithContext(ctx))
		logging.Logger(ctx).Info("Outcome: " + r.Method + " " + r.RequestURI + " took " + time.Since(start).String())
	})
}

func LimitHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		ip, err := getIpAddress(r)
		if err != nil {
			response.Failed(ctx, w, http.StatusInternalServerError, errors.ErrorInternalServer)
			return
		}
		limiter := getVisitor(ip)
		if limiter.Allow() == false {
			response.Failed(ctx, w, http.StatusTooManyRequests, errors.ErrorTooManyRequest)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func getIpAddress(r *http.Request) (string, error) {
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	return ip, err
}
