# Mem0: modular integration, but compare the current editions

Primary sources checked September 29, 2026. Finding for the [memory backend investigation](card:3mwnggsdth3ei).

## Deployment and fit

The [OSS overview](https://docs.mem0.ai/open-source/overview) documents a Python/Node library and a self-hosted server. The library's default vector store is local Qdrant, and its components are configurable. The documented server stack instead defaults to PostgreSQL with pgvector and includes a dashboard and API-key management. These are different deployment paths, not a requirement to replace Qdrant when adopting the library.

My assessment: Mem0 is a strong first integration candidate when the goal is to keep an existing agent and add extraction and retrieval around it. This is a proposed fit, not a measured advantage.

## Important algorithm and feature changes

The [OSS v2-to-v3 migration guide](https://docs.mem0.ai/migration/oss-v2-to-v3) describes single-pass ADD-only extraction. Changed information is added alongside older facts rather than automatically producing UPDATE and DELETE extraction events. Entity matching adds a retrieval signal, but is not an independently queryable knowledge graph. The guide explicitly says graph memory was removed from OSS and moved to the hosted Platform.

ADD-only extraction does not mean that administrators cannot remove a memory. The [edition comparison](https://docs.mem0.ai/platform/platform-vs-oss) still documents individual OSS update/delete operations. It also lists Graph Memory, Memory Decay, Temporal Reasoning, and Dream consolidation as Platform-only features. Evaluate those named capabilities separately from manual metadata filters or application-owned retention logic.

The comparison page's dashboard row appears inconsistent with the newer self-hosted-server overview. Do not use that row to claim that the server has no dashboard; distinguish the embedded library from the packaged server and pin the deployed version.

## Evidence limits

The [repository README](https://github.com/mem0ai/mem0) identifies the project license as Apache-2.0. It also explicitly says its advertised benchmark scores describe the managed platform, including proprietary optimizations absent from OSS. Those scores are not an OSS performance promise.

## Pilot questions

Test changed facts and historical questions separately. Check whether the desired temporal behavior works in the selected OSS configuration, how repeated facts accumulate, and what explicit retention or deletion policy is needed. Preserve source-event identifiers and distinguish a verified tool outcome from an assistant's claim that an action succeeded.

No deployment, multilingual quality test, latency measurement, or total-cost comparison has been performed here.
