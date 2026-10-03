## How a Cloudflare CI pipeline works

`@cloudflare/ci` provides a CI engine for Cloudflare Workers. You define a TypeScript class that extends `CIWorkflow`, implement its `pipeline()` method, and deploy it with a Worker. The package targets the Workers runtime.

Workflows controls the execution steps. Sandbox runners execute the commands. The example's Worker configuration connects the source repository, Workflow, Sandbox container, and R2 backup bucket.

The Cloudflare Artifacts example starts on a repository push. Its event trigger targets the Workflow directly; this configuration does not need a Queue.

The example pipeline:

1. Runs `npm ci`, with cache inputs based on the package manifest and lockfile.
2. Runs lint, tests, type checks, and build in parallel.
3. Runs `wrangler deploy` after those checks finish.

The pipeline is application code. Its HTTP routes, event handling, resource bindings, and concrete Workflow classes are also supplied by the application. Changes to the example's pipeline take effect after redeploying the Worker.

This connects to our [earlier Artifacts finding](card:3mwtef2kaufrq): repository events supply the trigger; a separate execution component supplies the build and deployment.

This is a source review, not a deployed experiment.

Sources: [package README](https://github.com/cloudflare/ci), [Artifacts example README](https://github.com/cloudflare/ci/blob/main/examples/cloudflare-artifacts/README.md), [pipeline implementation](https://github.com/cloudflare/ci/blob/main/examples/cloudflare-artifacts/cloudflare.ci.ts), [Worker configuration](https://github.com/cloudflare/ci/blob/main/examples/cloudflare-artifacts/wrangler.jsonc).
