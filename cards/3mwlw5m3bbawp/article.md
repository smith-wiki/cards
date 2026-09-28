# How an agent actually reaches its tools

## The workload keeps its normal client

NVIDIA documents support for existing coding agents and custom sandbox images. A custom agent can keep its own planning loop and service clients. Running inside the controlled environment, rather than calling an OpenShell function voluntarily, creates the enforcement boundary.

Source: [platform FAQ](https://www.nvidia.com/en-us/solutions/ai/agent-safety/).

## A network request crosses the supervisor

The sandbox mediates TCP connections and DNS lookups and identifies the calling executable. It sends these over a protected OpenShell Sandbox Protocol connection to the trusted supervisor. The supervisor evaluates policy and opens permitted external connections. The workload's outer network boundary disallows direct alternative egress.

Source: [architecture](https://docs.nvidia.com/openshell/latest/about/architecture).

The external service still receives its normal protocol. Configured inspectors distinguish REST methods and paths, GraphQL operations, and MCP methods and tool names. For native TCP protocols, the boundary can restrict the destination, port, and executable without understanding every application operation. MCP inspection specifically covers Streamable HTTP, not an arbitrary local stdio exchange. Its native tool rules do not match arguments.

Source: [network rules](https://docs.nvidia.com/openshell/latest/how-it-works/policies/network-rules).

## Credentials are a separate integration concern

A provider profile describes service endpoints and credential configuration. Static secrets are represented by placeholders inside the workload and resolved at approved outbound HTTP endpoints. This is not a generated SDK or a collection of business actions. Raw uninspected tunnels do not provide the same credential rewriting or application-level inspection.

Source: [provider profiles](https://docs.nvidia.com/openshell/latest/how-it-works/providers/profiles).

## What this means for a custom tool

As a proposed integration, a self-hosted research agent could keep its existing HTTP MCP client and publishing server. OpenShell would constrain the network path and permitted MCP tools. Restrictions on publication arguments and content would still require server-side authorization or suitable additional content inspection. Compatibility with the Operator's actual deployment has not been established.

This is a documentation-based explanation, not a completed deployment test.
