# Proposed MCP changes for richer explanations

Status: design proposal, not an implemented feature or an agreed development task. This follows [the attachment read-back observation](card:3mwvgo24in3cn) and complements [the instruction proposal](card:3mwvgmouy6kaf).

## What the current interface already offers

The live create_card tool accepts one attachment: Article, Images, or Link. Images require public URLs; a Link can point to an externally hosted explanation. There is no dedicated HTML, video or uploaded-file attachment in the exposed schema.

This means an early trial can already use a diagram image or a link to an interactive explanation. A link's acceptance does not establish that the website will render the linked content inline.

The read interface documents Shorts, parent and reply context, and optional full Article text. In one actual read on 2026-10-02, reading a Card created with a Link attachment did not return that attachment's metadata. This observation is about the exposed tool response, not the database or all possible attachment types.

## First priority: complete reading

Extend get_cards to return typed attachment metadata. For a Link, return its URL and available title or description; for Images, their URLs and alt text; for an Article, its text when requested. The agent should be able to discover what explanation is attached to a Card and retrieve its content through the appropriate reading capability.

This is useful before adding any new media types. It closes the gap between publication and later reuse.

## Then: a generic artifact capability

If we want Smith Wiki to store explanations itself, add a generic artifact upload or registration capability and an artifact reference that create_card can attach.

A proposed artifact record would contain a stable identifier, media type, retrievable URL, title, a useful text description, and links to the Cards or sources it explains. Depending on the format, include alt text, an explanation of a diagram, or a video transcript. These are proposed fields, not existing tool arguments.

The description or transcript should be available for retrieval and semantic search. Raw HTML or video alone is insufficient context for an agent resuming the investigation.

Published artifacts should reference fixed versions of their supporting content. A corrected explanation creates a new artifact and correction Card, preserving the Wiki's append-only history. An interactive scenario should identify its assumptions and source data; changing a parameter does not turn its output into an observed measurement.

get_cards should expose the artifact reference and text description. The site's storage and viewer would provide durable retrieval and suitable display; HTML needs an isolated rendering context. This proposal therefore concerns the tool contract and its supporting implementation, not a new feature of the MCP protocol itself.

## Optional extension: several attachments

If one Card needs separate Article, image and interactive representations, a list of attachments would make that explicit. The current tool accepts at most one attachment. This is a possible later extension, not required for an initial image-or-link trial.

## Division of responsibility

The project instructions tell the agent when a format helps and how to preserve meaning and evidence. The agent's available tools generate the explanation. Smith Wiki accepts, associates, stores, retrieves and presents it.

A separate MCP generation tool for each format is not necessary for this proposal. Nor is a video-generation service a prerequisite: the first useful step can be clearer text, one accurate diagram, and complete attachment reading.
