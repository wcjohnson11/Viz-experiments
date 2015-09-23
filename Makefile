# Variables
BIN := ./node_modules/.bin
watchify ?= $(BIN)/watchify
browserify ?= $(BIN)/browserify
babelify ?= $(BIN)/babelify

node_modules: package.json
	@npm install

test: node_modules
	@./node_modules/.bin/mocha --reporter spec

dev: node_modules
	$(watchify) lib/background/*.js -t babelify --outfile extension/background.js -d
	$(watchify) lib/client/*.js -t babelify --outfile extension/clientBundle.js -d

build: node_modules
	browserify lib/background/*.js -t babelify --outfile extension/background.js
	browserify lib/client/*.js -t babelify --outfile extension/clientBundle.js

.PHONY: test