.PHONY: build preview deploy publish drafts

build:
	tools/publish.sh build

preview:
	tools/preview.sh

deploy: publish

publish:
	tools/publish.sh

drafts:
	python3 tools/drafts.py
