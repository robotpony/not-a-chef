.PHONY: build preview deploy publish

build:
	tools/publish.sh build

preview:
	tools/preview.sh

deploy: publish

publish:
	tools/publish.sh
