ARG GO_VERSION=1.15.2

FROM golang:${GO_VERSION}-alpine AS builder
LABEL maintainer="M Iskandar Dzulqornain <midzulqornain@gmail.com>"

RUN apk add --no-cache ca-certificates git

# Add upx compressor
ADD https://github.com/upx/upx/releases/download/v3.96/upx-3.96-amd64_linux.tar.xz /usr/local
RUN xz -d -c /usr/local/upx-3.96-amd64_linux.tar.xz | tar -xOf - upx-3.96-amd64_linux/upx > /bin/upx && chmod a+x /bin/upx

WORKDIR /src

COPY ./go.mod ./go.sum ./
RUN go mod download

COPY ./ ./
RUN CGO_ENABLED=0 go build \
    -ldflags="-s -w" \
    -installsuffix 'static' \
    -o /app cmd/main.go

# compress binary
RUN upx -9 /app

FROM busybox AS final

ENV PORT="80"

COPY ./playground-ui/public ./playground-ui/public
COPY ./migration ./migration
COPY --from=builder /app /app
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

EXPOSE 443
EXPOSE 80

VOLUME ["/cert-cache"]

ENTRYPOINT ["/app"]