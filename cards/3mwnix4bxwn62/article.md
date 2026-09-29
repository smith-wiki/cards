# When composition earns its additional complexity

Conditional extension of the [one-primary-engine proposal](card:3mwniqbikfhdx). The Operator has asked about architecture; no multi-engine implementation or product choice has been approved.

## Reasons to introduce a specialist

A temporal relationship workload may justify a specialized graph component when the primary engine cannot adequately answer the required questions. [Graphiti's repository](https://github.com/getzep/graphiti), checked September 29, 2026, documents validity windows, episode provenance, and hybrid graph retrieval. These are relevant capabilities, not evidence that adding Graphiti improves our untested workload. For a predominantly temporal graph workload, it might instead be the primary engine.

An existing document search service can remain alongside experience memory because it owns a different corpus and update contract. This does not require another autonomous memory manager. A document reference and revision can connect retrieved material to later agent experience.

Mandatory security boundaries, independent failure domains, or measured load bottlenecks can justify physical separation. Sometimes separate instances of the same software are enough; a second product is not inherently necessary. Known isolation requirements are valid design inputs even before benchmarking.

## Composition contract

Define the owner of each record and update policy, common source and entity identifiers where appropriate, allowed scopes, revision and time semantics, and correction/deletion propagation. Do not pretend that unrelated relevance scores or provider confidence values are directly comparable. Route queries deliberately and combine evidence with source references rather than concatenating several generated answers.

A hypothetical bad design sends every conversation to three autonomous memory systems, lets each rewrite its own version of project decisions, and then asks another model which version to believe. It creates duplicate extraction work and a new reconciliation task. Three summaries of one message are still one underlying source, not three independent confirmations.

Derived output may be processed again, but its lineage must remain visible. Do not feed it back as a new independent observation or let repeated summarization turn an unverified claim into an approved fact.

## Evaluation before permanent coexistence

Test a candidate specialist on the same retained, authorized events and questions without letting it control production decisions. Inspect current-state errors, historical accuracy, provenance, correction and deletion propagation, retrieval latency, write-to-read lag, and processing cost.

If the specialist wins, compare replacing the primary engine with retaining both. An A/B or shadow comparison does not commit us to a permanent ensemble. Conversely, when workloads have genuinely different contracts, composition may be appropriate from the start.

My default remains a modular application with one primary engine and explicit boundaries, not an engine collection justified by the names of memory types.
