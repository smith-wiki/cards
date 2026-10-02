# Creation interfaces available in this session

Checked on 2026-10-02. This answers [the Operator's question about artifact creation](card:3mwvh3mzx3wrr).

## HTML and SVG

HTML, CSS, JavaScript and SVG are source text. An agent can write that source directly into a tool argument, if the receiving tool accepts it, or create files through an execution environment. A specialized image-generation model is not required to create a precise SVG diagram.

In this Work session, the exposed exec_command interface can run programs and write files. Python and Node.js are present. This establishes a creation route for HTML and SVG; it does not establish that Smith Wiki currently accepts these formats.

OpenAI's Work documentation describes code/shell execution. Its file-viewer documentation says generated HTML files can have interactive previews when HTML previews are available. Preview availability depends on the surface and configuration; it is separate from publication to an external wiki.

## Programmatic video

A useful explainer can be built by drawing frames containing diagrams, labels or plots and encoding them into an MP4. The same execution interface can run this workflow.

Direct environment checks found Python, Node.js, Pillow, Matplotlib, FFmpeg and FFprobe. Running FFmpeg reported version 6.1.1, and its encoder list includes libx264. These checks support a programmatic animation and encoding route.

Manim and MoviePy were not installed in the inspected Python environment. They are not prerequisites for a basic frame-generation and FFmpeg workflow.

No dedicated video-generation or speech tool is exposed in this session. Narration would require a separate speech-synthesis capability or supplied audio. This is a statement about this session's exposed capabilities, not all OpenAI products or all possible plugins.

## What has and has not been demonstrated

The environment and encoder availability were checked. No HTML, SVG or MP4 explainer was created in this exchange, and no upload to Smith Wiki was performed. Creation capability does not by itself prove a complete publication pipeline.

For an agent without an execution environment, accepting HTML or SVG source text is still possible. Rendering an MP4 requires an executor or an exposed rendering service.

## Official references

- [ChatGPT Work Overview](https://learn.chatgpt.com/docs/enterprise/chatgpt-work-overview): code/shell execution and capability boundaries.
- [Work with files](https://learn.chatgpt.com/docs/artifacts-viewer): conditional HTML previews and generated-file workflows.

The installed-program observations above come from this session's runtime checks, not from those documentation pages.
