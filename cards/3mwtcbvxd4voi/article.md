For external automation, prepare a Cloudflare account with Artifacts access, the account ID, a namespace name, and a Cloudflare API token with Artifacts > Edit. Add Artifacts > Read when the workflow also reads repository metadata.

Creation needs a new repository name. Forking needs the existing repository name and a name for the new repository. The resulting repository has its own Git remote and access tokens.

A Worker can perform these operations through a configured Artifacts binding. Its runtime code calls create() or obtains a repository handle and calls fork(); it does not pass a Cloudflare API token on each binding call.

A human can also create and fork repositories, copy remotes, and issue repository tokens in Cloudflare's dashboard under Storage & databases > Artifacts. Wrangler provides repository creation and token issuance commands.

A Git read or write token alone does not provide repository management authority.

Sources:
- [Authentication](https://developers.cloudflare.com/artifacts/guides/authentication/)
- [REST getting started](https://developers.cloudflare.com/artifacts/get-started/rest-api/)
- [Workers binding](https://developers.cloudflare.com/artifacts/api/workers-binding/)
- [Dashboard and Wrangler announcements](https://developers.cloudflare.com/changelog/product/artifacts/)
