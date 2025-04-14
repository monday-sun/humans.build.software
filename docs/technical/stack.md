# Technical Stack

## Current Stack (Pre-Migration)

*   **Static Site Generator:** Jekyll
*   **Language:** Ruby 3.3.0 (specified in `.ruby-version`)
*   **Package Manager (Ruby):** Bundler (via `Gemfile`)
*   **Key Gems:** (Refer to `Gemfile` and `Gemfile.lock` for details - likely includes Jekyll, potentially themes or plugins)

## Development Tooling (Supporting the codebase)

*   **Runtime:** Node.js (Version not specified, assumed LTS)
*   **Package Manager (Node):** Yarn (indicated by `yarn.lock`)
*   **Language:** TypeScript
*   **Linting:** ESLint (`eslint.config.mjs`)
*   **Formatting:** Prettier (`.prettierrc`, `.prettierignore`)
*   **Testing:** Jest (`jest` config in `package.json`, `ts-jest`)

## Target Stack (Post-Migration)

*   **Framework:** Astro
*   **UI Template:** AstroWind
*   **Language:** JavaScript / TypeScript
*   **Runtime:** Node.js
*   **Package Manager (Node):** npm (typically used with `create-astro`)
*   **Styling:** Tailwind CSS
*   **Content:** Markdown / MDX (`@astrojs/mdx` integration) 