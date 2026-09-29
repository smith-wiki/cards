# Define the privacy boundary beyond storage

The Operator's requirement is not merely self-hosted persistence. Project content can leave the machine through memory extraction, embeddings, reranking, or an extension's curation model even when the database itself is local.

Hindsight supports local LLM providers such as Ollama and LM Studio, and local embedding/reranking configurations. Its full Docker image bundles local embedding and reranking models, while the LLM can be pointed at a local service.

Sources:
- https://hindsight.vectorize.io/developer/configuration
- https://github.com/vectorize-io/hindsight/blob/main/skills/hindsight-docs/references/developer/installation.md

Graphiti defaults to OpenAI but documents OpenAI-compatible local endpoints such as Ollama, vLLM, llama.cpp, and LM Studio. It warns that ingestion depends on reliable structured output and smaller local models may fail schema generation.

Source:
- https://github.com/getzep/graphiti

Mem0 and Supermemory Local likewise allow self-hosted or local-model configurations, but their defaults or adapters may still select hosted model providers unless configured otherwise.

For the pilot, audit network egress during ingestion and retrieval rather than inferring privacy from the word self-hosted.
