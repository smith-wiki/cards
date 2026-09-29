# Reusable appearance, not a complete chat product

Reviewed 2026-09-29.

The [official repository](https://github.com/openai/apps-sdk-ui) provides React components and Tailwind design tokens. Its setup uses ordinary React rendering; the library can be incorporated into a developer-owned application. It was designed for ChatGPT apps, which is not evidence that the production ChatGPT frontend uses this exact package.

The [package manifest](https://github.com/openai/apps-sdk-ui/blob/main/package.json) declares React 18/19 and Tailwind 4 compatibility. It includes Radix, react-markdown, syntax highlighting, and math-rendering dependencies; development uses TypeScript, Vite, Storybook, and Vitest.

Evaluate it as a visual foundation. Conversation state, persistence, authentication, model orchestration, and a complete chat interaction design remain separate concerns. No combined chat application was built or tested in this review.
