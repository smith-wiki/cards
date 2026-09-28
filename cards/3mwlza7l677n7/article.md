# Remote execution exists, but its maturity must be assessed separately

Paperclip's Environments documentation describes named execution targets: local host, SSH machine, or a sandbox supplied by a plugin. Targets can be assigned at instance, project, or agent level. Compatible providers can also capture a prepared sandbox as a reusable image.

The management interface is currently enabled through Settings -> Instance settings -> Experimental. This is a UI gate: disabling it does not delete existing environments or their assignments. Environment management remains restricted to board operators.

Source: [Environments documentation](https://docs.paperclip.ing/experimental/environments/).

This qualifies both the earlier claim that Paperclip has no execution security and any opposite assumption that every remote execution path is uniformly production-qualified. Evaluate the installed release, provider, image, isolation settings, and recovery behavior together. No provider deployment was tested in this investigation.
