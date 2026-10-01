# Provisioning operations

| Operation | Input | Result |
| --- | --- | --- |
| Create | Namespace and new name | Empty remote repository |
| Import | Public HTTPS Git remote and new name | New repository initialized from that remote |
| Fork | Existing Artifacts repository and new name | Independent repository initialized from existing history |
| Clone | Remote URL and Git credential | A local client copy of an existing repository |

The management API returns repository information and credentials for the new remote. Fork/import can be in progress, so callers must handle readiness rather than assume immediate usability. Import is an initialization operation, not a documented continuous upstream synchronization service.

Use a branch for work sharing one repository's permissions and lifecycle. Use a fork when separate credentials or cleanup are needed.

Sources: [REST API](https://developers.cloudflare.com/artifacts/api/rest-api/), [Import repositories](https://developers.cloudflare.com/artifacts/guides/import-repositories/), [Best practices](https://developers.cloudflare.com/artifacts/concepts/best-practices/).
