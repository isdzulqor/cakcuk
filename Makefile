# Run integration test
# need docker-compose and docker installed
integration-test:
	docker-compose -f docker-compose.test.yaml up -d
	sleep 10
	go test -v ./...
	docker-compose -f docker-compose.test.yaml down

# Run playground-ui on dev mode using npm
# need nodejs and npm installed
dev-ui:
	cd playground-ui && npm install
	cd playground-ui && npm run dev

# Run playground-ui on dev mode using yarn
# need nodejs and yarn installed
dev-ui-yarn:
	cd playground-ui && yarn install
	cd playground-ui && yarn run dev

# Export static site of playground-ui using npm
# need nodejs and npm installed
export-site:
	cd playground-ui && npm run export
	cd playground-ui && rm -rf public
	cd playground-ui && cp -R __sapper__/export public

# Export static site of playground-ui using yarn
# need nodejs and yarn installed
export-site-yarn:
	cd playground-ui && yarn run export
	cd playground-ui && rm -rf public
	cd playground-ui && cp -R __sapper__/export public

# run cakcuk service on dev mode
# need golang
dev:
	go run cmd/main.go

# build cakcuk with an output of `main` binary file
# need golang
build:
	CGO_ENABLED=1 go build cmd/main.go

build-ui:
	cd playground-ui && npm run build

# make run BUILD_UI=true
run:
	# optional build ui
	@if [ -n "$(BUILD_UI)" ]; then make build-ui; fi

	SLACK_TOKEN=${SLACK_TOKEN} \
		SLACK_VERIFICATION_TOKEN=${SLACK_VERIFICATION_TOKEN} \
		docker-compose -f docker-compose.yaml up --build --remove-orphans


# Read the contents of `loader.yaml` into a variable
# This is to simulate injecting `loader` via env
# You can also use file based by mounting it to `migration/yaml/loader.yaml`
LOADER := $$(cat ./migration/loader.yaml | base64)

# make run BUILD_UI=true
run-with-sqlite:
	@# optional build ui
	@if [ -n "$(BUILD_UI)" ]; then make build-ui; fi

	@# remove sqlite db to start fresh
	@rm -rf ./cakcuk.db

	SLACK_TOKEN=${SLACK_TOKEN} \
		SLACK_VERIFICATION_TOKEN=${SLACK_VERIFICATION_TOKEN} \
		LOADER="${LOADER}" \
		ALLOWED_CHANNELS=${ALLOWED_CHANNELS} \
		docker-compose -f docker-compose.sqlite.yaml up --build --remove-orphans