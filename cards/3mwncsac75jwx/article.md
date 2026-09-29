# Replace the splitter, not the architecture

[Chonkie RecursiveChunker](https://docs.chonkie.ai/oss/chunkers/recursive-chunker) provides a Python Markdown recipe and configurable tokenization. Set the intended tokenizer explicitly; the documented default is character-based.

[Docling HybridChunker](https://docling-project.github.io/docling/concepts/chunking/) combines structural splitting with token-budget adjustments and can repeat table headers. Docling [accepts Markdown](https://docling-project.github.io/docling/usage/supported_formats/), but its chunkers work on a DoclingDocument representation.

My starting choice for plain Markdown is the smaller splitter integration. Consider Docling when its document model or table handling solves a concrete problem. Preserve source coordinates separately and verify fences, tables, and oversized sections with fixtures.

I propose embedding a heading breadcrumb with each chunk and retaining parent-section identifiers so retrieval can expand to a larger reading unit. These are integration choices, not guaranteed library behavior.
