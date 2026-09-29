# A smaller Docling installation is a real option

Checked September 29, 2026. This finding narrows the dependency question; it is not a runtime benchmark.

The official [Docling Slim README](https://github.com/docling-project/docling/blob/main/packages/docling-slim/README.md) documents a minimal package with opt-in extras, including `format-markdown`, `convert-core`, and `feat-chunking`. The current [project dependency manifest](https://github.com/docling-project/docling/blob/main/pyproject.toml) lists Marko under `format-markdown`, while local neural models and OCR have separate extras.

The README's approximate base-dependency size is not a measurement of the complete Markdown-plus-chunking installation, container image size, or peak RAM. Dependencies of the selected tokenizer also matter. Do not infer those quantities from the base-package estimate.

My implication for the existing push-to-Qdrant architecture: assess a Markdown-only installation, not the full PDF-oriented default environment. Conversion and chunking can remain inside the indexing job; this finding is not a proposal to adopt Docling's hosted service or move public search to it.

No package installation, Markdown throughput benchmark, or Chonkie comparison was completed in this exchange.
