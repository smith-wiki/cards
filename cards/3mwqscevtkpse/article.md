# OpenViking as a context substrate

Checked September 30, 2026.

OpenViking describes itself as an open-source context database for AI agents. It exposes three primary context classes: Resources, Memories, and Skills.

Resources are external knowledge such as code repositories and documents. Memories are durable information learned from interactions and task execution. Skills are reusable agent capabilities. They are stored in different URI spaces and processed through different extraction paths.

The important architectural point for this investigation is that OpenViking does not require repository knowledge and agent memory to become the same logical object. It provides one filesystem-like substrate and one retrieval API over distinct context types.

Its retrieval API can search all types together or filter explicitly to resource, memory, or skill. This makes it closer to a built-in context assembler than to a single undifferentiated memory collection.

Sources:
- https://docs.openviking.ai/en/concepts/02-context-types
- https://docs.openviking.ai/en/concepts/04-viking-uri
- https://docs.openviking.ai/en/api/06-retrieval
