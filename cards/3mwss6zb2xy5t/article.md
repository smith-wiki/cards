# Herdr: a terminal layer for coding agents

Herdr runs a background server that owns terminal panes. Each pane can contain an existing coding agent, shell, test command or development server. The terminal client is a view into those processes; disconnecting that client does not end the work.

A typical workflow is to start agents in separate project workspaces, disconnect, then return to inspect results or answer a permission question. Local workspaces and machines connected over SSH appear together. This addresses keeping track of agents across projects and machines.

Herdr is open source under Apache 2.0 and implemented in Rust. Its CLI and local socket API expose terminal and agent control. The coding agents continue to own their model calls, tools and conversational behavior.

OMP and Hermes are supported. OMP has an integration that reports lifecycle state and session identity; it is installed with `herdr integration install omp`. This is relevant when choosing how to observe agents without relying entirely on their terminal appearance.

This is a documentation-based assessment as of October 1, 2026; no runtime test has been performed.

Sources: [Herdr repository](https://github.com/herdrdev/herdr), [Connecting machines](https://herdr.dev/docs/connecting-machines/), [Socket API](https://herdr.dev/docs/socket-api/), [Integrations](https://herdr.dev/docs/integrations/).
