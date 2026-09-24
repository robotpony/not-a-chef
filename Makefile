.PHONY: build preview deploy

# --cleanDestinationDir: drop anything in public/ this build didn't write
# (old drafts, deleted pages) so deploy's rsync --delete can't ship it.
build:
	hugo --minify --cleanDestinationDir

preview:
	tools/preview.sh

deploy: build
	tools/deploy.sh
