# Late interaction is a different tradeoff from late chunking

[Qdrant's ColBERT guide](https://qdrant.tech/documentation/fastembed/fastembed-colbert/) explains token-level vector representations and their additional resource cost. Its [hybrid reranking tutorial](https://qdrant.tech/documentation/tutorials-basics/reranking-hybrid-search/) combines dense and sparse candidate retrieval with a multivector rescoring stage.

This keeps Qdrant but changes indexing and storage. A cross-encoder instead consumes retrieved text paired with the query, so it need not add document vectors to the index.

Late interaction compares query and document token representations at search time. It is not the same as [late chunking](card:3mwncp4cgf4a3), which incorporates surrounding document context while producing chunk vectors. I propose treating them as separate experiments rather than stacking both by default.
