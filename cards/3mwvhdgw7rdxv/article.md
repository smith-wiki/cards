# Proposed interfaces: source submission and binary upload

Status: architecture proposal, not an implemented interface. This answers [how agents can create and deliver richer explanations](card:3mwvh3mzx3wrr) and uses [the checked capabilities of this Work session](card:3mwvhbccp2rat).

## Text artifacts

For HTML and SVG, Smith Wiki can expose a tool that receives source text, a media type and a useful description, stores the source, and returns an artifact identifier. The agent can supply the text directly as tool arguments. It can also create and inspect a file first when an execution environment is available.

For example, a proposed create_artifact interface could accept text/html or image/svg+xml plus the source content. This tool name and these arguments are illustrative design choices, not current Smith Wiki tools.

The site's viewer would render the stored source appropriately. HTML rendering and file storage are supporting implementation responsibilities beyond merely adding an accepted MIME type to create_card.

## Binary video

A rendered MP4 is a binary file. It needs a supported transfer route from the agent's execution environment to storage accessible to Smith Wiki. A path in Work's sandbox is a location within that environment; sending its string to a remote MCP server does not give the server the bytes.

One proposed sequence is:

1. The agent creates the MP4 through its execution tools.
2. A preparation tool returns an upload identifier and a temporary upload URL reachable under the runtime's network policy.
3. The runtime uploads the actual file bytes.
4. A completion tool validates the upload and returns a durable artifact reference.
5. create_card attaches that reference.

A client-provided file-transfer bridge is another possible route when it is explicitly supported. Its availability must be checked for the particular MCP client; it cannot be assumed from a file-path argument alone.

The media description, source Card links and any transcript should accompany the final artifact. Video bytes should not have to pass through the model's text context as a large base64 argument.

## Agents without an execution environment

An agent that can only call Smith Wiki tools can still generate HTML or SVG source text. To produce an MP4, it needs an exposed rendering capability, such as a tool that accepts a storyboard or scene description and runs a renderer on the service's compute. That is an optional extension for clients without their own runtime, not a prerequisite for the current Work session.

Narration is another capability boundary: it needs supplied audio or a speech-synthesis implementation. This session does not expose a dedicated speech tool.

## Suggested first implementation

Start with text submission for HTML/SVG and a binary upload contract for MP4, alongside complete attachment retrieval. The instructions then choose the format according to the agent's actual capabilities. A rendering service can be added if supporting runtime-free clients becomes an explicit requirement.
