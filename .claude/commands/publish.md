# /publish

Build the Hugo site and deploy to the server.

1. Run: hugo --minify
2. If the build succeeds, run: tools/deploy.sh
3. Report the build output and deploy result.

If tools/deploy.sh does not exist, stop after the build and remind the user that the deploy script needs to be created (Phase 5).
