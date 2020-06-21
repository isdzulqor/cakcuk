package server

import (
	"cakcuk/config"
	"cakcuk/utils/errors"
	"cakcuk/utils/logging"
	"cakcuk/utils/response"
	stringLib "cakcuk/utils/string"
	"context"
	"fmt"
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
		ip := getIpAddress(r)
		ctx := logging.WithAddressAndRequestIDContext(context.Background(), ip, r.Header.Get("x-request-id"))

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
	xForwarderIPs := strings.Split(r.Header.Get("X-Forwarded-For"), ",")

	for _, xForwarderIP := range xForwarderIPs {
		if ok, err := isPrivateAddress(xForwarderIP); err == nil &&
			!ok && !isLocalhost(xForwarderIP) {
			return xForwarderIP
		}
	}
	if xRealIP := r.Header.Get("X-Real-Ip"); len(xRealIP) > 0 {
		if ip := net.ParseIP(xRealIP); ip != nil {
			return ip.String()
		}
	}
	return remoteIP
}

func isPrivateAddress(ip string) (isPrivate bool, err error) {
	IP := net.ParseIP(ip)
	if IP == nil {
		err = fmt.Errorf("Invalid IP")
		return
	}
	_, private24BitBlock, _ := net.ParseCIDR("10.0.0.0/8")
	_, private20BitBlock, _ := net.ParseCIDR("172.16.0.0/12")
	_, private16BitBlock, _ := net.ParseCIDR("192.168.0.0/16")
	isPrivate = private24BitBlock.Contains(IP) || private20BitBlock.Contains(IP) || private16BitBlock.Contains(IP)
	return
}

var localAddress = []string{
	"127.0.0.1",
	"127.0.1.1",
	"::1",
}

func isLocalhost(address string) bool {
	return stringLib.StringContains(localAddress, address)
}
