# Evaluate a ready public-chat platform before custom development

This revises my earlier recommendation to default to a custom frontend and backend. The [Operator's follow-up](https://cards.smith.wiki/3mwnhdet52xpx/) asks whether ready public chats can also consume external MCP tools.

We now have two documented candidates: [Dify's public web app plus MCP tools](https://cards.smith.wiki/3mwnhnwcxufh7/) and [n8n's Chat Trigger plus AI Agent and MCP Client Tool](https://cards.smith.wiki/3mwnhhmfqzquq/). Their platforms perform the application-backend role; a separately written gateway is not inherently required for the basic chat scenario.

I would evaluate Dify first when the desired deliverable is a standalone chat application. I would evaluate n8n when the conversation is an interface to a wider automation workflow. This is a fit-based proposal, not a benchmark or an Operator decision.

Do not mistake anonymous visitor access for anonymous access to tools. Configure dedicated server-side credentials and expose only an intended subset of MCP capabilities. For a first test, I propose read-only tools over public data.

Acceptance criteria: open the published URL in two independent browser profiles without accounts; verify an actual MCP tool call; check that conversations and tool state do not mix; validate cancellation and the required limits. No deployment or acceptance test has been performed.

Review [Dify's additional license conditions](https://cards.smith.wiki/3mwnhoa4ugbjj/) and [n8n's Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md) before choosing a business deployment model. These are not unrestricted MIT-licensed alternatives.

The [Flowise correction](https://cards.smith.wiki/3mwnhemysane5/) withdraws the earlier default recommendation after checking its archived upstream. Do not use the older recommendation as evidence of current maintenance.
