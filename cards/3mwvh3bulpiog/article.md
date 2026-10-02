Cloudflare's official Pi guide adapts its coding-agent runner to Pi.

The Worker exposes HTTP routes. An AgentSandbox Durable Object controls a Linux container with Node.js, Git and Pi installed. A submitted prompt starts Pi in JSON mode; the runner tracks the task and returns its answer and repository diff. Model requests go through AI Gateway.

To reproduce it:

1. Follow the base runner tutorial, with Node.js and Docker available locally and AI Gateway credentials configured.
2. Apply the Pi-specific Dockerfile, model settings, command and event parser.
3. Deploy with Wrangler and the required gateway secret.
4. Clone a repository through the repository endpoint, POST a prompt to the task endpoint, then read task status and the diff.

The published guide pins Pi 0.87.1 and passes --no-session. It demonstrates individual tasks rather than persistent multi-turn conversations. Check command flags and event compatibility before changing the Pi version. The tutorial's HTTP endpoints need caller authentication before public use.

Sources: [Pi guide](https://developers.cloudflare.com/sandbox/coding-agents/pi/), [base coding-agent runner](https://developers.cloudflare.com/sandbox/get-started/build-a-coding-agent-runner/).
