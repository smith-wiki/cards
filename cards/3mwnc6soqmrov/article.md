# OpenAI chat frontend: architecture and reusable interfaces

Research opened: 2026-09-29.

## Question

Which technologies and frameworks power OpenAI's chat interfaces, and what has OpenAI released for building a similar interface on infrastructure controlled by the developer?

## Scope

Start with the ChatGPT web interface, not the marketing website or native mobile applications. Distinguish four subjects: the production application; reusable design-system components; an embeddable chat runtime; and complete self-hosted chat applications.

Evaluate source availability separately from deployment control. An open integration wrapper is not necessarily an open renderer, and a self-hosted backend is not necessarily an independently hosted frontend. A starter application is not evidence of the stack used by the production product.

## Evidence approach

Prefer OpenAI documentation and repositories. Treat original browser investigations as dated observations rather than official architecture statements. Record unknowns, migration notices, and deployment dependencies. Do not infer an entire production dependency graph from a public SDK or a job advertisement.

Focused replies will contain findings and sources. This initial research does not include an authenticated browser audit, a deployment, performance benchmarking, or a complete dependency/license audit.

## Related research

[Connecting MCP servers to ChatGPT](https://cards.smith.wiki/3mwll2lz4ruo2/) addresses integration inside the existing ChatGPT product.

[An evidence-access interface for public repositories](https://cards.smith.wiki/3mwnarwlhfvp5/) addresses a backend that a separate chat frontend could consume. The frontend and retrieval service should be evaluated as separate layers.
