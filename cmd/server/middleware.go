package server

import (
	"cakcuk/utils/logging"
	"context"
	"net/http"
)

func RecoverHandler(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				logging.Logger(context.Background()).Panic(err)
				http.Error(w, http.StatusText(500), 500)
			}
		}()
		next.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

func LoggingHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := logging.GetContext(context.Background())
		logging.Logger(ctx).Info(r.Method + " " + r.RequestURI)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
