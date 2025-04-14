# Implementation Plan: Jekyll to AstroWind Migration & Customization

## Milestone 1: Basic AstroWind Setup & Core Content Migration

*   **Goal:** Get the essential Jekyll blog content working within a standard AstroWind project structure.
*   **Implementation Time:** 1-2 days
*   **Tasks:**
    1.  Initialize a new Astro project using the AstroWind theme template (e.g., `npm create astro@latest -- --template onwidget/astrowind`). (0.5 days)
        *   Install dependencies (`npm install`).
    2.  Configure basic site settings in `src/config.yaml` (site name, URL, metadata defaults). (0.5 days)
    3.  Migrate existing Markdown blog posts from Jekyll's `_posts` directory to Astro's `src/content/post/` directory. (0.5-1 day)
        *   Review and adjust frontmatter fields as needed (e.g., Jekyll's `layout`, `tags`, `categories` vs. Astro's content collection schema if defined, or standard frontmatter). AstroWind uses frontmatter directly.
        *   Ensure date formats are compatible or convert them.
    4.  Set up basic site navigation in `src/navigation.js` to reflect primary pages (Home, Blog). (0.5 days)
    5.  Run `npm run dev` and verify that the site builds, the homepage loads, and blog posts are accessible and rendering correctly with the default AstroWind styling.
*   **Learning Outcome:** Understand AstroWind's project structure, configuration files (`config.yaml`, `navigation.js`), content collection setup (`src/content/`), and the basic Markdown/MDX rendering pipeline. Assess the complexity of raw content migration.

## Milestone 2: Foundational Styling (Colors & Fonts)

*   **Goal:** Replace the default AstroWind aesthetic with your specified color palette and typography.
*   **Implementation Time:** 0.5-1 day
*   **Tasks:**
    1.  Modify `tailwind.config.cjs` to inject your custom color palette (primary, secondary, accent, muted). (0.25 days)
    2.  Identify where base colors are applied (likely in `src/assets/styles/tailwind.css` or potentially within layout/UI components) and update them to use your custom colors. (0.25 days)
    3.  Choose desired fonts (e.g., Atkinson Hyperlegible, IBM Plex Sans) and integrate them. This might involve: (0.5 days)
        *   Adding `@font-face` rules in `src/assets/styles/tailwind.css`.
        *   Installing via npm if available as packages.
        *   Configuring Tailwind (`tailwind.config.cjs`) to use these fonts for sans-serif/serif/mono families.
    4.  Verify font loading and application across the site in dev mode.
*   **Learning Outcome:** Gain familiarity with customizing AstroWind's visual appearance via Tailwind configuration and base CSS. Understand how to integrate and apply custom fonts.

## Milestone 3: Homepage Revamp ("Soft Invitation")

*   **Goal:** Transform the default homepage layout into a warmer, more personal "soft invitation."
*   **Implementation Time:** 1-2 days
*   **Tasks:**
    1.  Analyze the structure of `src/pages/index.astro` and the widgets it imports (likely from `src/components/widgets/`). Identify the default Hero component. (0.5 days)
    2.  Modify or replace the Hero component's content with your whimsical welcome message and tagline ("Exploring software..."). (0.5 days)
    3.  Create a simple Astro component for the "Today's Mood" block. Initially, populate it with static content (emoji/quote). Place this component prominently on the homepage. (0.5 days)
    4.  Review other default homepage sections/widgets and remove or significantly restyle any that feel too much like a "consulting services" landing page. (0.5 days)
*   **Learning Outcome:** Understand how to modify Astro page structure and compose pages using Astro components/widgets. Practice adapting existing components and creating simple new ones.

## Milestone 4: Blog Enhancement ("Zine Energy")

*   **Goal:** Customize blog post layout and add features for a distinctive "zine" feel using MDX.
*   **Implementation Time:** 2-3 days
*   **Tasks:**
    1.  Locate the primary blog post layout (e.g., `src/layouts/MarkdownLayout.astro` or similar defined in `src/content/config.ts`). (0.5 days)
    2.  Modify the layout's header section to include placeholders or logic for: (1 day)
        *   "Mood when writing" (requires adding this field to post frontmatter).
        *   "Last updated" (can potentially pull from Git history using Astro utilities or require manual frontmatter field).
        *   Displaying tags as emojis (requires mapping tag strings to emojis, potentially in the layout or a helper function).
    3.  Create custom MDX components (`.astro` files in `src/components/`) for your callouts (e.g., `HotTake.astro`, `NeuroHack.astro`, `HallucinationBadge.astro`). Style them distinctively. (1 day)
    4.  Ensure MDX integration is set up correctly (`@astrojs/mdx` integration) and test using these custom components within your migrated `.md` or converted `.mdx` blog posts. (0.5 days)
*   **Learning Outcome:** Deepen understanding of Astro layouts, MDX integration, creating and using custom components within Markdown/MDX content, and potentially interacting with frontmatter or external data (like Git) in layouts.

## Milestone 5: Visual Polish & Art Direction

*   **Goal:** Infuse the site with the "digital scrapbook" aesthetic using icons, dividers, and textures.
*   **Implementation Time:** 1-2 days
*   **Tasks:**
    1.  Source or create doodle-style icons and hand-drawn divider assets. (0.5 days)
    2.  Integrate icons into relevant UI elements (e.g., navigation links, list bullets, callout components) using `<img>` tags or potentially an icon component library if desired. (0.5 days)
    3.  Add divider elements (CSS borders, background images, or SVG components) between sections or in headers/footers. (0.5 days)
    4.  Apply subtle textured backgrounds or gradients using Tailwind utility classes directly in components/layouts or by extending the theme in `tailwind.config.cjs`. (0.5 days)
    5.  Customize the site Header and Footer components (`src/components/widgets/Header.astro`, `Footer.astro`) to include elements like the rotating footer quote (start static).
*   **Learning Outcome:** Practice detailed UI refinement using CSS, Tailwind, and asset integration within the Astro component model.

## Milestone 6: Extra Features (Optional - Select as needed)

*   **Goal:** Implement one or more of the suggested extra features.
*   **Implementation Time:** 1-3 days per feature
*   **Tasks (Example: "Lab" Page):**
    1.  Define content structure for lab projects (could be a new content collection `src/content/lab/` with `.md`/`.mdx` files or a simple JSON/TS data file). (0.5 days)
    2.  Create a new page route: `src/pages/lab.astro`. (0.25 days)
    3.  Design and implement an Astro component to display lab project summaries/cards. (1 day)
    4.  Fetch and render the lab project data on the `lab.astro` page. (0.5 days)
    5.  Add a link to the Lab page in the main navigation (`src/navigation.js`). (0.25 days)
*   **Learning Outcome:** Practice creating new page routes, defining content structures (collections or data files), fetching/rendering data, and building feature-specific components. (Specific outcomes vary by chosen feature).

## Milestone 7: Deployment & Final Review

*   **Goal:** Deploy the migrated and customized site to a hosting provider (Netlify/Vercel recommended by AstroWind) and perform final checks.
*   **Implementation Time:** 0.5-1 day
*   **Tasks:**
    1.  Configure Astro for the target deployment platform (e.g., install adapter `@astrojs/netlify` or `@astrojs/vercel`).
    2.  Run `npm run build` to generate the production site in `./dist/`.
    3.  Test the production build locally using `npm run preview`.
    4.  Set up deployment via Git integration on Netlify/Vercel.
    5.  Deploy the `main` branch and verify the live site.
    6.  Perform cross-browser/device testing and fix any final styling or functional issues.
*   **Learning Outcome:** Understand Astro's build process, deployment adapters, and common hosting platform configurations. 