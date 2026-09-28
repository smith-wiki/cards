# Forge: code generation, not an agent loop

The [repository README](https://github.com/cloudflare/forge) describes a schema-first framework: resolve OpenAPI, apply optional overlays, build a typed model, and invoke transformer plugins. Here, transformer means a software transformation plugin, not a neural-network architecture.

The [September 28 announcement](https://blog.cloudflare.com/forge-open-source-generation-pipeline/) motivates these tools as interfaces that agents can consume. It describes CI linting and installable previews before merge. That is different from asking an AI agent to understand a change request and edit application code.

The useful mental model is a compiler for API-facing tooling. This is an architectural interpretation of the documentation, not a claim that every plugin or build is proven deterministic. No generation pipeline was executed in this investigation.
