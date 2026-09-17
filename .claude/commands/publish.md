# /publish

Build the Hugo site and deploy to the server.

1. Run: `make build`
2. If the build succeeds, run: `make deploy` (this re-runs the build, then `tools/deploy.sh`)
3. Report the build output and deploy result.

If `tools/config.toml` doesn't exist or is missing a `[deploy]` section, `tools/deploy.sh` will fail with a clear error — relay it and point the user to `tools/config.toml.example`.
