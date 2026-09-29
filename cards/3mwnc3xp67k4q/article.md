# Reference architecture for the public Markdown MCP service

The [Operator chooses this comparison baseline](card:3mwnc2epckwai): a repository push triggers a script, the script chunks changed files and embeds them into Qdrant, and a separate backend searches the chunks and returns a response.

Carry forward the existing requirements: public repositories, an open audience, search plus document reading, and no dependency on the Operator's laptop. Do not interpret choosing a reference as approving a deployment or selecting a vendor.

## Correction to my earlier framing

My [earlier custom-stack assessment](card:3mwnao6intpid) made custom development sound justified mainly by special scale or ranking requirements. That was too narrow for this comparison. A small, owned application is a legitimate starting point. Managed alternatives must show which responsibilities they remove or which measured outcomes they improve; being packaged is not itself proof of a better fit.

Hosting and architecture are separate choices. [Qdrant Managed Cloud](https://qdrant.tech/documentation/cloud/) is an available managed database option. Cloud CI, an embedding API, and a hosted backend are implementation choices for a laptop-independent version of the reference, not additional Operator decisions.

## Comparison contract

For each candidate, identify which parts of the reference it replaces: Git change detection, chunking, embedding, indexing, retrieval, document reading, and public MCP serving. Identify the integration and operating work that remains.

Compare corpus coverage and source fidelity, update and deletion visibility, retrieval quality on the same questions, search/read latency under the same workload, operating effort, cost, and control over models and ranking. Mark documented capabilities separately from measured outcomes and unknowns.

No quality ranking or cost advantage has been established on the Operator's repositories. No implementation was deployed in this exchange.
