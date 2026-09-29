# Docling performance for Markdown is not its PDF benchmark

Checked September 29, 2026. This is a source-based analysis and proposed measurement plan, not a completed benchmark.

The [technical report](https://arxiv.org/html/2501.17887v1) distinguishes direct parsing of markup formats from visual reconstruction of PDF pages. Its performance section measures PDF conversion, not Markdown-to-chunks throughput. Those historical PDF timings should not be presented as current Markdown timings. The current [SimplePipeline reference](https://docling-project.github.io/docling/reference/document_converter/#docling.document_converter.SimplePipeline) describes backends that directly produce DoclingDocument output.

For native Markdown without optional enrichments, OCR, layout detection, GPU inference, and LLM calls are not necessary to parse and chunk the text. The [HybridChunker implementation](https://github.com/docling-project/docling-core/blob/main/docling_core/transforms/chunker/hybrid_chunker.py) performs serialization, token counting, splitting, and optional peer merging. It does not generate the corpus's embeddings. Loading tokenizer assets is distinct from loading embedding-model weights.

The extra work relative to a direct text-splitting path is constructing the intermediate document representation and performing its structural serialization and token-budget checks. This identifies work to profile; it does not establish a universal speed or memory ratio against Chonkie, whose chosen chunker and tokenizer also affect cost.

Measure cold process startup and tokenizer initialization separately from warm conversion and chunking. With many tiny changed files, startup can be a substantial fraction of a job. With large files, inspect parser, serialization, and repeated tokenization costs. Peak resident memory should be measured independently from dependency download size; multiple text/object representations and concurrent documents can affect it.

For the Operator's architecture, these direct costs belong to indexing after a push, not to every public search request. Indirect costs can still change: different numbers of chunks and repeated heading/table context change how much text is embedded and how many vectors are stored. Record chunk counts and embedded-token totals alongside runtime.

I found no sufficiently comparable public Markdown-input benchmark for Docling versus the Operator's Chonkie setup, and did not complete an execution benchmark. No documents-per-second, MB-per-second, peak-RAM figure, or comparative speedup is established here.
