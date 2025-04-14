# Architecture Overview

## Current Architecture (Pre-Migration)

*   **Framework:** Jekyll (Static Site Generator)
*   **Language:** Ruby (via Jekyll and Bundler)
*   **Templating:** Liquid
*   **Content:** Markdown files (`dev-blog/_posts`)
*   **Styling:** (Likely custom CSS or a Jekyll theme's CSS - needs confirmation)
*   **Hosting:** Vercel
*   **Build Process:** Managed by Jekyll (likely via `bundle exec jekyll build`)

## Target Architecture (Post-Migration)

*   **Framework:** Astro (Static Site Generator / MPA framework)
*   **UI Framework/Template:** AstroWind
*   **Language:** JavaScript/TypeScript
*   **Component Model:** Astro Components (.astro), potentially React/Vue/Svelte if needed.
*   **Content:** Markdown/MDX files (`src/content/post`)
*   **Styling:** Tailwind CSS
*   **Hosting:** Vercel
*   **Build Process:** Managed by Astro (via `npm run build`) 