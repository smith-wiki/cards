# Initial RAG landscape: evidence access, not a single winning stack

Initial source review for the [RAG investigation](card:3mwna4p5eh5uc), checked September 29, 2026. This is a starting interpretation, not a completed benchmark or an exhaustive product ranking.

## 1. Long context and retrieval are not mutually exclusive

The 2025 [LaRA study](https://arxiv.org/abs/2502.09977) found that the relative performance of retrieval-augmented generation and long-context reading depends on the model, task, input length, and retrieved material. Its results do not establish a universal winner, and should not be treated as measurements of September 2026 models.

My implication for this investigation: include whole-document reading as a serious baseline, and test combinations that retrieve a document before reading it in detail. Do not assume either that retrieval is always necessary or that a large context window removes evidence-selection decisions.

## 2. A stronger baseline than vector similarity alone

[Anthropic's Contextual Retrieval experiment](https://www.anthropic.com/engineering/contextual-retrieval), published September 19, 2024, combines document-aware chunk context, semantic retrieval, BM25, and reranking. In its tests, the combined approach reduced top-20 retrieval failures from 5.7% to 1.9%. That is a retrieval metric in a particular experiment, not a 67% improvement in final answer correctness.

I would use hybrid lexical and semantic retrieval with reranking as a candidate baseline, then test whether contextual enrichment pays for its preprocessing cost on the target corpus.

## 3. Agents can search instead of accepting one fixed context bundle

[Anthropic's context-engineering account](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), published September 29, 2025, describes combining upfront context with just-in-time discovery. Its Claude Code example uses file navigation and search primitives rather than requiring every retrieval action to pass through a vector index.

This supports a distinction between retrieval as a fixed pipeline and retrieval as a tool used during an agent's work. It does not prove that agent-directed search is faster or more accurate for every workload. A parallel multi-query service and a genuinely iterative search agent should also be evaluated separately.

## 4. Product status must be checked feature by feature

[Gemini API File Search](https://ai.google.dev/gemini-api/docs/file-search) offers managed import, chunking, indexing, and retrieval. Its current documentation includes text and image/multimodal embeddings, while explicitly excluding audio and video formats. Managed RAG is therefore a product category, not merely a collection of framework recipes.

[Azure AI Search documentation](https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview), updated September 17, 2026, distinguishes generally available minimal extractive retrieval with supported knowledge sources through API `2026-04-01` from preview capabilities through `2026-08-01-preview`. LLM query planning, answer synthesis, and non-minimal reasoning remain preview. The label "agentic retrieval" alone does not establish production readiness for every feature.

The [Microsoft GraphRAG repository](https://github.com/microsoft/graphrag) currently says it is largely in maintenance mode, with no new features or incoming PRs, while retaining appropriate fixes and dependency updates. This is a statement about that implementation, not evidence that graph-based retrieval as a class has stopped developing. Its [documented architecture](https://microsoft.github.io/graphrag/) uses entities, relationships, and community summaries for local and corpus-wide questions.

## 5. Correct retrieval is only one part of reliability

The [Sufficient Context study](https://arxiv.org/abs/2411.06037) distinguishes missing evidence from failures to use available evidence, and examines answering versus abstaining. For our evaluation, finding relevant material, having enough evidence, producing a correct answer, and supporting claims with citations should be separate checks.

Permissions also need operational verification. [Azure's access-control documentation](https://learn.microsoft.com/en-us/azure/search/search-document-level-access-overview) explains that indexed authorization metadata must be synchronized: source permission changes are not necessarily reflected immediately. An access-control feature is not, by itself, proof of instant revocation across an indexed corpus.

## First practical question

What changes when the same representative questions are answered using whole-document reading, hybrid retrieval with reranking, and agent-directed search? Compare correctness and evidence support alongside latency, cost, freshness, and permission behavior. Add graph-based retrieval or a persistent memory layer only when a diagnosed requirement justifies the extra architecture.

I propose starting with that comparison before choosing a vector database or building a broad vendor shortlist.
