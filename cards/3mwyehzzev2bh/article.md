## Where the AI agent fits

The repository separates the CI engine from agent behavior. Its basic example implements installation, checks, and deployment. A second example adds a Healing Agent that consumes runner-failure diagnostics.

The package README states that the Healing Agent, its tools, and its AI dependencies belong to the application rather than `@cloudflare/ci`. Using the CI engine therefore does not by itself enable an AI repair policy.

This finding comes from the [package README](https://github.com/cloudflare/ci). I have not verified the agent's repair loop or run the example. Those remain a separate branch of this investigation.
