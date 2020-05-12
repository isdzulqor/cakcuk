package server

import (
	"cakcuk/config"
	"cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"cakcuk/utils/response"
	"context"
	"net"
	"net/http"
	"strings"
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
		ctx := logging.GetContext(context.Background())
		ip := getIpAddress(r)

		ctx = logging.WithAddressContext(ctx, ip)
		start := time.Now()
		logging.Logger(ctx).Info("Requesting " + r.Method + " " + r.RequestURI)
		next.ServeHTTP(w, r.WithContext(ctx))
		logging.Logger(ctx).Info("Response " + r.Method + " " + r.RequestURI + " took " + time.Since(start).String())
	})
}

func LimitHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		ip := getIpAddress(r)

		limiter := getVisitor(ip)
		if limiter.Allow() == false {
			response.Failed(ctx, w, http.StatusTooManyRequests, errors.ErrorTooManyRequest)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func GuardHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		conf := config.Get()
		if r.Header.Get("x-cakcuk-secret-key") != conf.SecretKey {
			response.Failed(r.Context(), w, http.StatusUnauthorized, errors.ErrorUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func getIpAddress(r *http.Request) string {
	remoteIP, _, _ := net.SplitHostPort(r.RemoteAddr)

	if xff := strings.Trim(r.Header.Get("X-Forwarded-For"), ","); len(xff) > 0 {
		addrs := strings.Split(xff, ",")
		lastFwd := addrs[len(addrs)-1]
		if ip := net.ParseIP(lastFwd); ip != nil {
			remoteIP = ip.String()
		}
	} else if xri := r.Header.Get("X-Real-Ip"); len(xri) > 0 {
		if ip := net.ParseIP(xri); ip != nil {
			remoteIP = ip.String()
		}
	}
	return remoteIP
}
