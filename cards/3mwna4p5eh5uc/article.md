# RAG in September 2026: research scope

This investigation asks what retrieval-augmented generation is useful for now, rather than assuming that a vector database is the starting point or that a larger context window has made retrieval obsolete.

The cutoff for this initial investigation is September 29, 2026. Older foundational work can inform the analysis, but product availability, project maintenance, and claims about current capabilities need current verification.

## Questions to answer

1. **Architecture:** When should a system read complete documents, retrieve selected passages, combine lexical and semantic search, navigate document structure or graphs, or let an agent search iteratively?
2. **Evidence:** Which improvements survive realistic evaluation, and which depend on a particular benchmark, corpus, model, or vendor's experiment?
3. **Implementation:** Which capabilities are available as maintained open-source components or managed products? What must an application still build itself?
4. **Operational reliability:** How should ingestion, updates, deletions, source permissions, provenance, citations, and untrusted retrieved content be handled?
5. **Agent knowledge:** Where does retrieval end and persistent agent memory begin? What is needed beyond document question answering?

These are a research agenda, not claims that one architecture solves all five problems.

## Comparison frame

Compare approaches on identifiable workloads: finding a fact, reading a whole document, joining evidence across documents, synthesizing themes across a corpus, and answering against changing or permissioned sources. Track answer correctness, evidence coverage, citation support, appropriate abstention, latency, cost, and operational complexity separately.

Treat reported benchmark gains as evidence within their tested setting, not universal rankings. Distinguish a technical pattern from one implementation bearing its name, and distinguish documented availability from marketing language.

## First decision to investigate

For a realistic knowledge corpus and question set, which is the best baseline: whole-document reading, hybrid retrieval with reranking, or agent-directed search? Establish that comparison before adding a graph, an elaborate memory system, or a broad catalog of vendors.

This Card opens the investigation. Findings and changes in interpretation should appear in replies, with sources and uncertainty preserved.
