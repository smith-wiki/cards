# What Docling adds to an existing Markdown splitter

Docling can remain a library inside the Operator's indexing script. The proposed local change is Markdown -> DoclingDocument -> chunks -> the existing embedding and Qdrant stages. This is not a proposal for a new publication platform or search backend.

The [DoclingDocument documentation](https://docling-project.github.io/docling/concepts/docling_document/) describes typed text, tables, pictures, section/group hierarchy, and parent-child references. The [technical report, section 3.2](https://arxiv.org/html/2501.17887v1), explains that markup formats are parsed directly into this representation; Markdown uses Marko. The current [dependency manifest](https://github.com/docling-project/docling/blob/main/pyproject.toml) still lists Marko for Markdown support.

The [HybridChunker documentation](https://docling-project.github.io/docling/concepts/chunking/) describes structural chunks refined to a tokenizer's budget. Oversized chunks are split and compatible smaller peers can be merged. Table headers can be repeated across split tables. 'Hybrid' here means structure plus token-budget handling, not lexical-plus-vector search.

The [worked example](https://docling-project.github.io/docling/_generated/examples/hybrid_chunking/) distinguishes `chunk.text` from `chunker.contextualize(chunk)`: the latter includes relevant metadata such as headings. This is deterministic serialization of available context, not an LLM writing a summary. Token budgeting should account for the text actually embedded, including those headings, with the embedding model's tokenizer where available.

A possible benefit even for simple documents is using section and item relationships to expand a search hit into a larger reading unit. That still requires application logic; merely choosing Docling does not add this behavior to the backend.

The data model's provenance support does not by itself establish exact source-line mappings for every Markdown construct. Keep the original file and indexed revision authoritative. Test fenced code, links, lists, tables, front matter, and any custom Markdown syntax rather than assuming that normalized serialized text is a byte-for-byte source slice.

No comparison of retrieval quality or source fidelity against the Operator's Chonkie configuration was performed.
