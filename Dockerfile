ARG GO_VERSION=1.14.3

FROM golang:${GO_VERSION}-alpine AS builder
LABEL maintainer="M Iskandar Dzulqornain <midzulqornain@gmail.com>"

RUN apk add --no-cache ca-certificates git

WORKDIR /src

COPY ./go.mod ./go.sum ./
RUN go mod download

COPY ./ ./
RUN CGO_ENABLED=0 go build \
    -installsuffix 'static' \
    -o /app cmd/main.go

FROM scratch AS final

COPY ./playground-ui ./playground-ui
COPY --from=builder /app /app
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

EXPOSE 443
EXPOSE 80

VOLUME ["/cert-cache"]

ENTRYPOINT ["/app"]