BIN := ./node_modules/.bin
ESLINT := $(BIN)/eslint
DUO := $(BIN)/duo

#
# Default.
#

default: client node_modules test-style

#
# client.
#

client: node_modules
	@$(DUO) --copy --use ./support/duo client/index.js --stdout > client/build.js
	@$(DUO) client/index.css --stdout > client/build.css

#
# Test style.
#

# test-style:
# 	@$(ESLINT) ./client

#
# Dependencies.
#

node_modules: package.json
	@npm install

#
# Clean.
#

clean:
	@rm client/build.js client/build.css
	@rm -rf *.log
	
#
# Clean dependencies.
#

clean-deps:
	@rm -rf node_modules components

#
# Phonies.
#

.PHONY: client test-style
