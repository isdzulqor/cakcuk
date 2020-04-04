package logging

import (
	"context"
	"os"

	uuid "github.com/satori/go.uuid"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type correlationIdType int

const (
	requestIDKey correlationIdType = iota
	sessionIDKey
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
	return context.WithValue(ctx, requestIDKey, getRequestID(ctx))
}

func Logger(ctx context.Context) *zap.SugaredLogger {
	defer sugar.Sync()

	if reqID, ok := ctx.Value(requestIDKey).(string); ok {
		return sugar.With(zap.String("requestID", reqID))
	}
	return sugar
}

func getRequestID(ctx context.Context) string {
	if value, ok := ctx.Value(requestIDKey).(string); ok {
		return value
	}
	return uuid.NewV4().String()
}
