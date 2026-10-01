# Who supports AG-UI?

Checked on October 1, 2026. These are integration and deployment claims, rather than a claim that every company jointly governs the protocol.

## Confirmed on vendor sources

| Project | Evidence of support |
| --- | --- |
| Microsoft Agent Framework | Microsoft's documentation describes AG-UI hosting adapters and client interaction, with support varying by language SDK. |
| Google ADK | Google's developer guide demonstrates wrapping an ADK agent with `ag_ui_adk` and exposing its events through FastAPI. |
| Amazon Bedrock AgentCore | AWS officially supports deployment of AG-UI servers in AgentCore Runtime. Its March 13, 2026 announcement describes authentication, session isolation and scaling for those workloads. |

Sources: [Microsoft integration](https://learn.microsoft.com/en-us/agent-framework/integrations/by-component/ui/ag-ui/), [Google's protocol guide](https://developers.googleblog.com/developers-guide-to-ai-agent-protocols/), [AWS announcement](https://aws.amazon.com/about-aws/whats-new/2026/03/amazon-bedrock-agentcore-runtime-ag-ui-protocol/).

## The project's wider integration matrix

AG-UI lists LangChain and CrewAI as partners. Its supported matrix also includes AWS Strands, Mastra, Pydantic AI, Agno, LlamaIndex, AG2 and Oracle Agent Spec. Claude Agent SDK and Claude Managed Agents are listed under community integrations. OpenAI Agent SDK and Cloudflare Agents are still marked In Progress on that matrix. [Current integration list](https://docs.ag-ui.com/introduction)

The 1.0 announcement reports specification feedback from Anthropic, Pydantic AI and TanStack. Feedback on the specification is different from an official native integration or complete feature coverage. [Announcement](https://www.copilotkit.ai/blog/ag-ui-1.0)

## What this establishes

There is adoption outside CopilotKit, backed by working integration paths documented by several major vendors. Existing integrations do not prove full conformance with the specification released on September 30, 2026. For a concrete deployment, check the pinned adapter's support for the required events and behaviors; this review has not run conformance tests.
