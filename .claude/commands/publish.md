# /publish

Build the Hugo site and deploy to the server.

1. Run: `tools/publish.sh` (builds `public/`, checks it for dev-server output, then runs `tools/deploy.sh`)
2. Report the build output and deploy result.

To preview what would change on the server without deploying, run `tools/publish.sh dry-run` instead. `tools/publish.sh help` lists all subcommands.

If `tools/config.toml` doesn't exist or is missing a `[deploy]` section, `tools/deploy.sh` will fail with a clear error; relay it and point the user to `tools/config.toml.example`.
