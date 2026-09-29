# Reading memory: retrieval, context selection, and optional synthesis

[LangChain's retrieval overview](https://docs.langchain.com/oss/python/deepagents/retrieval) describes fetching external knowledge at query time and integrating it with generation. The source can be a document collection, structured data, or an agent's previous experience. Memory and RAG are therefore overlapping concepts, not opposing architectures. The [RAG investigation](card:3mwna4p5eh5uc) concerns the evidence-access side of this boundary.

A useful memory query can constrain subject, project, and time as well as textual relevance. [Hindsight recall](https://hindsight.vectorize.io/developer/api/recall) is one documented implementation combining semantic, keyword, graph, and temporal retrieval. That is a capability example, not proof of better retrieval on our workload.

Context assembly then decides which retrieved records, standing facts, and recent messages the next model call receives. [Anthropic's context-engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) discusses compacting history and consulting durable notes rather than retaining everything in active context. Compression can lose details, so I would preserve a path back to source evidence.

Finally, [Hindsight reflect](https://hindsight.vectorize.io/developer/api/reflect) runs an LLM-driven search and synthesis loop, whereas recall returns records. A caller asking for evidence need not delegate answer generation to the memory service. The quality and cost of searching should be distinguished from those of generating a new interpretation.
