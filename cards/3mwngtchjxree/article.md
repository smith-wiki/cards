# Proposed baseline, evaluation contract, and conditional shortlist

Initial synthesis for the [memory backend investigation](card:3mwnggsdth3ei), September 29, 2026. Everything in this note is a proposed design or evaluation plan, not a deployed system or benchmark result.

## Reference architecture

Keep four responsibilities explicit. First, a durable source-event store retains messages and tool results under a defined retention policy. Second, a derived memory layer holds extracted facts, preferences, episodes, and summaries with evidence references. Third, a search projection indexes the permitted memory for retrieval. Fourth, a transactional execution store remains authoritative for task state, retries, approvals, and confirmed outcomes.

A vector index may support memory retrieval without owning the entire memory lifecycle. Use Qdrant or pgvector in the comparison baseline where appropriate; choosing one is not a prerequisite for the research. Include a simpler last-messages-plus-summary baseline so that added machinery must demonstrate useful improvement.

A proposed memory record includes its subject, user/project scope, source event, event time, recording time, evidence type, status, and version. Distinguish a user's claim, an assistant's inference, and a verified tool outcome. In particular, an assistant saying that a job succeeded should not mark a job complete in the execution store.

## Access and trust

Resolve allowed scopes from the authenticated caller on the server. Never assume that a user ID or bank ID supplied by a model is an authorization decision. Define which memories are private, agent-specific, project-shared, and organization-shared.

Treat retrieved memory as evidence, not as authority to change permissions or execute instructions. Approved procedures should have an explicit review path rather than being promoted automatically from arbitrary conversation text.

Correction, historical supersession, and deletion are different operations. The deletion test should cover source records, facts, indexes, summaries, caches, replay, and backup-retention policy; merely hiding one search result is insufficient for this proposed contract.

## Workload and measurements

Replay the same conversations and tool events through every candidate. Include changed preferences, historical ownership, two people with the same name, contradictory claims, duplicated deliveries, concurrent writers, process restarts, failed actions, deliberate malicious instructions, deletion, and unauthorized cross-user reads. Include Russian and mixed-language cases when selecting the real workload.

Measure supported answer correctness, stale-fact errors, temporal accuracy, and unauthorized retrieval separately. Measure write acceptance, write-to-search visibility, consolidation lag, retrieval latency, synthesis latency, and end-to-end response latency as different quantities. Report p50 and p95, workload size, concurrency, model configuration, and token budgets.

Account for extraction, embedding, reranking, consolidation/reflection, storage, and operational labor. Vendor benchmark scores and isolated latency figures are not a shared leaderboard. Pin software versions and distinguish documented features from behavior observed in the test.

## Conditional shortlist

[Hindsight](card:3mwngl66iknns) is my first independent-service pilot for a PostgreSQL-centered deployment. [Mem0](card:3mwngkfw6oyon) is the integration-first comparator when keeping the existing agent and configurable search store matters. [Graphiti](card:3mwngqkayyva4) joins the pilot when historical and multi-hop relationship questions are material.

[Supermemory local](card:3mwngre3hnqql) is a compact single-server alternative, subject to its access-control and topology limits. [LangMem, Letta, Cognee, and managed APIs](card:3mwngs4gxyr6j) remain in the landscape, but should enter the shortlist when their different adoption boundaries match the actual requirement.

The next decision should be which memory failure the application needs to prevent, not which vendor advertises the highest benchmark score. No candidate has yet demonstrated superior accuracy, performance, or cost on the Operator's workload.
