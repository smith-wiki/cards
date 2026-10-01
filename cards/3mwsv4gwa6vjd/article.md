# A remote Herdr fleet from a browser

Yes, Herdr separates server and client. The server owns the terminals and processes; the bundled client is a terminal UI. You can connect from another machine with `herdr --remote workbox`. Sources: [Client and server](https://herdr.dev/docs/concepts/#client-and-server), [Remote access](https://herdr.dev/docs/persistence-remote/#remote-attach-over-ssh).

Browser access adds another component. [Roamgate](https://github.com/powerfooI/roamgate), formerly Herdr Studio, is a community client under the MIT license. It offers desktop/mobile browser access and PWA installation, terminal control, agent inspection, and file/diff views.

Its [architecture](https://github.com/powerfooI/roamgate/blob/main/docs/ARCHITECTURE.md) uses HTTP/WebSocket between the browser and a bridge. That bridge connects to Herdr's control and terminal sockets and manages independent local or SSH connection profiles. For the proposed deployment, Herdr and agents run on their hosts; a reachable Roamgate bridge provides the browser entry point. Roamgate includes authentication and describes itself as trusted single-user administration.

A different community option, [barnuri/herdr-web](https://github.com/barnuri/herdr-web), streams the actual Herdr TUI into an xterm.js browser terminal.

These clients' documentation was inspected on October 1, 2026. No deployment or compatibility test has been performed here.
