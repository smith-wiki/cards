# What generated API tooling means

This is an explanatory interpretation of the [Forge README](https://github.com/cloudflare/forge) and the [cf launch](https://blog.cloudflare.com/cloudflare-cf-cli-launch/), not a generation test.

Suppose a hypothetical service exposes `GET /projects` with a `limit` parameter. The following names are illustrative, not observed Forge output:

- SDK: a client method used as `client.projects.list({ limit: 20 })`.
- CLI: a command used as `my-api projects list --limit 20`.
- Reference documentation: a description of the operation, its parameters, and its response.

The client and CLI would request data from the service; they would not create its database or implement the logic that selects projects.

A useful conceptual separation is source generation, build/test, packaging, and publication. Those steps can be automated together, but they are not interchangeable. The cf announcement documents npm installation, illustrating an installable command-line tool without establishing that Forge's standalone SDK command emits a native executable.

The hypothetical examples explain the output categories; they do not promise exact names, filenames, or turnkey CLI generation for every API specification.
