package logging

import (
	"context"
	"os"

	uuid "github.com/satori/go.uuid"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

const (
	requestIDKey = 0
	sessionIDKey = 1
	addressIDKey = 2
)

var (
	logger *zap.Logger
	sugar  *zap.SugaredLogger
)

func Init(level string) {
	cfg := zap.Config{
		Encoding:         "console",
		Level:            zap.NewAtomicLevelAt(getLevel(level)),
		OutputPaths:      []string{"stderr"},
		ErrorOutputPaths: []string{"stderr"},
		EncoderConfig: zapcore.EncoderConfig{
			MessageKey:    "message",
			StacktraceKey: "stackTrace",
			LevelKey:      "level",
			EncodeLevel:   zapcore.CapitalLevelEncoder,

			TimeKey:    "time",
			EncodeTime: zapcore.ISO8601TimeEncoder,

			CallerKey:    "caller",
			EncodeCaller: zapcore.ShortCallerEncoder,
		},
		InitialFields: map[string]interface{}{
			"pid": os.Getpid(),
		},
	}
	logger, _ = cfg.Build()
	sugar = logger.Sugar()
}

func getLevel(level string) zapcore.Level {
	switch level {
	case "info":
		return zapcore.InfoLevel
	case "warn":
		return zapcore.WarnLevel
	case "error":
		return zapcore.ErrorLevel
	case "panic":
		return zapcore.PanicLevel
	}
	return zapcore.DebugLevel
}

func GetContext(ctx context.Context) context.Context {
	return context.WithValue(ctx, requestIDKey, GetRequestID(ctx))
}

func WithAddressAndRequestIDContext(ctx context.Context, ipAddress, requestIDHeader string) context.Context {
	if requestIDHeader == "" {
		return context.WithValue(GetContext(ctx), addressIDKey, ipAddress)
	}
	ctx = context.WithValue(ctx, addressIDKey, ipAddress)
	ctx = context.WithValue(ctx, requestIDKey, requestIDHeader)
	return ctx
}

func Logger(ctx context.Context) (out *zap.SugaredLogger) {
	defer sugar.Sync()
	out = sugar

	if reqID, ok := ctx.Value(requestIDKey).(string); ok {
		out = out.With(zap.String("requestID", reqID))
	}
	if addressID, ok := ctx.Value(addressIDKey).(string); ok {
		out = out.With(zap.String("addressID", addressID))
	}
	return
}

func GetRequestID(ctx context.Context) string {
	if value, ok := ctx.Value(requestIDKey).(string); ok {
		return value
	}
	return uuid.NewV4().String()
}
