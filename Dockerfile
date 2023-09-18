FROM node:14.4.0-alpine3.12 as frontend_build
WORKDIR /playground-ui

COPY ./playground-ui .

RUN npm install
RUN npm run build

FROM golang:1.20-alpine3.17 AS builder
LABEL maintainer="M Iskandar Dzulqornain <midzulqornain@gmail.com>"

RUN apk add --no-cache ca-certificates git gcc musl-dev

WORKDIR /src

COPY ./go.mod ./go.sum ./
RUN go mod download

COPY ./ ./
RUN CGO_ENABLED=1 go build \
    -o /app cmd/main.go

FROM alpine:3.16 AS final

ENV PORT="80"

COPY ./migration ./migration
COPY --from=builder /app /app
COPY ./playground-ui/public ./playground-ui/public
COPY --from=frontend_build /playground-ui/public/bundle.css ./playground-ui/public/bundle.css
COPY --from=frontend_build /playground-ui/public/bundle.css.map ./playground-ui/public/bundle.css.map
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

EXPOSE 443
EXPOSE 80

VOLUME ["/cert-cache"]

ENTRYPOINT ["/app"]