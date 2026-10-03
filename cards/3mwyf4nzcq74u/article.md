## Connect an Artifacts repository to Cloudflare CI

The provided setup has two parts: the repository whose code you want to build, stored in Cloudflare Artifacts, and a CI Worker that runs your pipeline. A deployed event filter connects them.

### 1. Prepare the source repository

Create or import the repository into Artifacts and put your project code there. You need its namespace, repository name, Git remote, and a repository token with write scope for pushes. See our earlier [repository setup](card:3mwtcbvxd4voi) and [Git access](card:3mwtcc63vtt5l) findings. Importing from GitHub is discussed in a separate reply.

### 2. Start from the deployable CI example

Use the `examples/cloudflare-artifacts` directory as your CI project:

```bash
git clone https://github.com/cloudflare/ci.git
cd ci/examples/cloudflare-artifacts
pnpm install
```

The source project and CI project have different roles. The pipeline definition in this example belongs to the CI Worker.

### 3. Identify the source in the CI configuration

Edit the example's `wrangler.jsonc`:

| Setting | Your value |
| --- | --- |
| `artifacts[0].namespace` | Source Artifacts namespace |
| `triggers.events[0].filter.namespace` | Same namespace |
| `triggers.events[0].filter.repo_name` | Source repository name |
| `CLOUDFLARE_ACCOUNT_ID` | Account running CI |
| `CLOUDFLARE_DEPLOY_ACCOUNT_ID` | Account receiving the deployed project |
| `BACKUP_BUCKET` and `BACKUP_BUCKET_NAME` | Matching R2 bucket configuration |

The repository example uses `repo_name`. Keep the example's full configuration as your starting point, including its Workflow, Sandbox container, Durable Object, and R2 bindings.

### 4. Choose what to run

Edit `cloudflare.ci.ts` in the CI project. Replace the example commands with your project's install, test, and build commands. Include a deployment step if you want deployment. The configured Sandbox image must supply the tools those commands require.

### 5. Configure credentials and deploy CI

Prepare the configured R2 backup bucket. The example's deploy flow prompts for the secrets listed in `.dev.vars.example`: `CF_TOKEN`, `R2_ACCESS_KEY_ID`, and `R2_SECRET_ACCESS_KEY`. You can also set them with Wrangler secret commands as described in the example README.

Deploy from the example directory:

```bash
pnpm run deploy
```

### 6. Push source changes

Push a new commit to the source Artifacts repository using its Git remote and write token. The configured push event starts CI, which checks out that commit and runs the commands. Inspect the run in the Cloudflare Workflows dashboard.

Changing the CI example's pipeline requires redeploying its Worker. Changing the source project only requires a push to the configured Artifacts repository.

This procedure is based on source and documentation review. I have not configured or deployed it for the operator.

Sources: [example setup](https://github.com/cloudflare/ci/blob/main/examples/cloudflare-artifacts/README.md), [example configuration](https://github.com/cloudflare/ci/blob/main/examples/cloudflare-artifacts/wrangler.jsonc), [credential names](https://github.com/cloudflare/ci/blob/main/examples/cloudflare-artifacts/.dev.vars.example), [build and deploy guide](https://developers.cloudflare.com/artifacts/guides/build-and-deploy-on-push/), [Git access](https://developers.cloudflare.com/artifacts/examples/git-client/).
