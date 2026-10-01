Smart HTTP is the standard Git protocol for exchanging repository data over HTTP or HTTPS.

When you run `git fetch`, the client discovers the server's branches and tags, tells it which commits it wants and which it already has, and receives the missing objects in a packfile. A packfile bundles Git objects for transfer, with compression and potentially delta encoding. Push sends new objects and requests updates to branch or tag references.

"Smart" refers to a server that understands Git and participates in this negotiation. The older Dumb HTTP mode serves repository files through a static web server, leaving discovery to the client.

Cloudflare Artifacts exposes this standard interface for ordinary `git clone`, `fetch`, `pull`, and `push`. The practical benefit is compatibility with existing Git tools. Creating repositories and issuing access tokens happen through the Workers binding or REST API; the returned remote URL and token let Git exchange repository contents over HTTPS.

Sources:
- [Git HTTP protocol specification](https://git-scm.com/docs/http-protocol)
- [Pro Git: HTTP protocols](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols)
- [Cloudflare Artifacts: Git protocol](https://developers.cloudflare.com/artifacts/api/git-protocol/)
- [Cloudflare Artifacts: repository interfaces](https://developers.cloudflare.com/artifacts/concepts/repositories/)
