Cloudflare OS is a web application platform. It does not provide a guest operating system or general-purpose virtual machines. The OS analogy describes its coordination of users, agents, applications, and permissions.

Its backend runs on Workers. The README maps each workspace to a Durable Object and each Gadget backend to a Dynamic Worker facet. Gadget client code runs in a sandboxed browser iframe.

Workers execute code in V8 isolates: lightweight runtime sandboxes inside an existing runtime, rather than machines with their own guest operating system. Creating a Gadget therefore does not provision a Linux VM or boot a container image.

For example, ask the agent to build a dashboard. The result is an application with a browser interface and a Workers backend.

Sources: [Cloudflare OS README](https://github.com/cloudflare/cloudflare-os) and [How Workers works](https://developers.cloudflare.com/workers/reference/how-workers-works/).
