# Generated files are not automatically repository commits

The [Forge README](https://github.com/cloudflare/forge) documents `pnpm exec forge openapi.json --out ./generated`. Full generation requires Docker; outputs include SDK source, the finalized OpenAPI document, and `sdk-map.json`.

The distinction between generation and publication is an engineering interpretation: a workflow can test or package those files without committing them, or add a separate commit or pull-request step. A bot commit would not by itself imply AI involvement.

The [launch announcement](https://blog.cloudflare.com/forge-open-source-generation-pipeline/) describes preview generation, not a verified default Git write-back policy. Attempts to inspect implementation and workflow files were unsuccessful. No pipeline was run, so strict reproducibility and default Git side effects remain unverified.
