# Mintlify relative to the custom reference

Checked September 29, 2026. This develops the [earlier Mintlify assessment](card:3mwnbdiswbqic), not a quality ranking.

[Mintlify's search MCP](https://www.mintlify.com/docs/ai/model-context-protocol) is hosted with the documentation site and makes indexed public pages available without user authentication. The indexed site, rather than an arbitrary collection of repository files, defines the retrieval surface.

[Native multi-repository publishing](https://www.mintlify.com/docs/deploy/multi-repo) requires Enterprise and a docs.json in each source repository, with all sources on the same Git provider.

Relative to the reference, this offers managed publishing and MCP serving, while introducing a documentation-site content model. It is not simply a replacement for Qdrant. The Operator would need to adapt the corpus and verify that all intended documents remain searchable. Whether the extra publishing product is useful is distinct from whether retrieval is better.
