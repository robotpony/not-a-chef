.PHONY: build preview deploy

build:
	hugo --minify

preview:
	tools/preview.sh

deploy: build
	tools/deploy.sh
