# Adjacent candidates: libraries, runtimes, knowledge pipelines, and managed APIs

Primary sources checked September 29, 2026. Landscape note for the [memory backend investigation](card:3mwnggsdth3ei).

## LangMem: components for an application-owned memory layer

[LangMem](https://langchain-ai.github.io/langmem/) provides extraction, consolidation, and prompt-optimization primitives. Its functional API can work independently of a storage provider; its ready-made memory tools integrate with LangGraph's store interface. An in-memory example is not durable production storage.

My assessment: evaluate it when owning memory policy is desirable, especially around an existing LangGraph application. It is not by itself an operated, authenticated, shared memory service comparable to a hosted API.

## Letta: evaluate the current runtime, not only legacy memory blocks

The current [Agent SDK memory guide](https://docs.letta.com/agent-sdk/memory) describes MemFS, a Git-backed memory repository. System memory files stay in context; other memory files are available on demand. Memory changes are persisted through the repository workflow, and dreaming supports consolidation. Shared hosted repositories and self-hosted Git remotes are distinct arrangements.

The [deployment guide](https://docs.letta.com/agent-sdk/deployment) separates cloud, local, and remote execution. Running an execution environment on an owned machine does not automatically imply that every part of agent state is self-hosted; the selected backend matters. The documentation labels the old V1 SDK as legacy.

My assessment: Letta belongs in the study as a stateful agent runtime with memory, rather than the first interchangeable storage service for an arbitrary existing agent. Adopting its execution model is a separate decision.

## Cognee: a broader knowledge and memory pipeline

The [Cognee architecture](https://docs.cognee.ai/core-concepts/architecture) separates relational metadata, vector retrieval, and graph relationships. This makes it relevant when documents and extracted relationships should participate in one knowledge/memory workflow.

Its [graph-store guide](https://docs.cognee.ai/setup-configuration/graph-stores) warns that adapters differ materially. The default embedded graph has single-writer and single-machine limits; the bundled PostgreSQL graph adapter is a demo, while a production adapter is separately licensed. Some production backends also impose edition-specific or single-tenant restrictions. A supported-provider list is therefore not evidence of equivalent isolation or deployment maturity.

My assessment: include Cognee when the desired scope extends beyond a small conversational fact store. Specify the actual database topology before comparing operating effort.

## Managed reference options

[AWS AgentCore Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html) provides short-term conversation storage and long-term extracted memory, with integration support across agent frameworks.

[Google Cloud Agent Platform Memory Bank](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank) documents extraction and consolidation, scoped memory, expiration, revisions, and access controls. It can be called from different agent environments.

Treat these as managed-memory comparators, not requirements to migrate an entire agent runtime. Compare storage region, authentication, data export, model configuration, operating work removed, and actual metered cost. No provider has been selected, and no current price quote or deployment test is included in this note.
