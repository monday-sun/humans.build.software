# Implementation Plan: Jekyll to AstroWind Migration & Customization

## Directory Structure Strategy

- **Jekyll Blog (`dev-blog/`):** Maintain this directory as-is. It contains all the existing Jekyll blog content that will be migrated.
- **Astro Site (Root Directory):** The Astro site now lives in the project root directory. This simplifies development and deployment, allowing commands to be run directly from the project root.
- **Project Root:** Contains both the Astro site and project-wide configurations.

## Milestone 1: Basic Astro Starter Setup & Core Content Migration

- **Goal:** Get the essential Jekyll blog content working within the `accessible-astro-starter` theme structure.
- **Implementation Time:** 1-2 days
- **Tasks:**

  1.  ✅ Initialize the new Astro site using the `accessible-astro-starter` theme: (0.5 days)

      ```bash
      # Clone the theme repository into web/
      git clone https://github.com/incluud/accessible-astro-starter.git web

      # Remove the theme's git history and GitHub workflows
      rm -rf web/.git web/.github

      # Move all contents from web/ to root
      mv web/* web/.[!.]* .
      rm -rf web

      # Install dependencies
      npm install
      ```

      **Note:** We moved all files from the `web/` directory to the root to simplify development.

  2.  Configure Vercel adapter for deployment: (0.25 days)

      ```bash
      npm install @astrojs/vercel
      ```

      Then, **verify** `astro.config.mjs`. If the Vercel adapter isn't already configured by the theme, update it:

      ```javascript
      // astro.config.mjs
      import { defineConfig } from 'astro/config'
      import vercel from '@astrojs/vercel/static' // or '@astrojs/vercel/serverless' if needed

      export default defineConfig({
        // Other configs...
        output: 'static', // Ensure output is static for Vercel static hosting
        adapter: vercel(), // Add the adapter
        // Check if theme already has integrations/adapter config
      })
      ```

  3.  ✅ **Merge Configuration Files:** (0.25 days)

      - ✅ Moved all Astro theme files from `web/` to the root directory
      - ✅ Merged package.json files, preserving both project configurations
      - ✅ Merged .gitignore files
      - ✅ Updated configuration files in the root (`.prettierrc`, `.eslintrc.js`, `tailwind.config.js`, `.nvmrc`, `.npmrc`)
      - ✅ Updated astro.config.mjs with the correct site URL
      - ✅ Successfully ran `npm install` and `npm run dev` from the root

  4.  ✅ Configure basic site settings (e.g., in theme-specific files like `src/data/site.js` or `astro.config.mjs`, verify location): (0.5 days)

      - ✅ Created a centralized site configuration file at `src/data/site.js`
      - ✅ Set up shared metadata values (site name, description, author, etc.) from the original Jekyll site
      - ✅ Updated component files to use the shared configuration:
        - Modified `DefaultLayout.astro` to use siteConfig as defaults
        - Updated `SiteMeta.astro` to use siteConfig as defaults
        - Revised `Hero.astro` to display the site name and description from siteConfig
      - ✅ Created documentation at `docs/technical/site_configuration.md`
      - ✅ Updated the homepage to use the site name from the configuration

  5.  ✅ Define Blog Content Collection and Migrate Posts: (1-1.5 days)

      - ✅ **Update Content Configuration (`src/content.config.mjs`):**

        - ✅ Imported `defineCollection` and `z` from `astro:content`.
        - ✅ Defined a new `blog` collection using `defineCollection`.
        - ✅ Set the `loader` to point to `./src/content/blog/`.
        - ✅ Defined the schema using `z.object({})` with the following fields:
          - `title: z.string()`
          - `description: z.string()`
          - `author: z.string().optional()`
          - `pubDate: z.string().transform()` (With date transformation for flexible parsing)
          - `updatedDate: z.string().transform().optional()` (With transformation for flexible parsing)
          - `tags: z.array(z.string()).optional()` (Combined old `categories` and `tags`)
          - `image: z.object({ src: z.string(), alt: z.string() }).optional()`
          - `draft: z.boolean().optional().default(false)`
        - ✅ Added the `blog` collection to the `export const collections = { ... }` object.

      - ✅ **Content Directory:**

        - ✅ Created content directory at `src/content/blog/`

      - ✅ **Copy Posts:**

        - ✅ Copied posts from `dev-blog/_posts/` to `src/content/blog/`

      - ✅ **Adapt Frontmatter:**

        - ✅ Updated frontmatter in blog posts to match the Astro schema
        - ✅ Added proper date formatting in ISO 8601 format for `pubDate` and `updatedDate` fields
        - ✅ Ensured all required fields were present and correctly formatted

      - ✅ **Blog Rendering:**

        - ✅ Updated blog index page to display posts from content collection
        - ✅ Created dynamic routes for individual blog posts
        - ✅ Implemented styling for blog posts using CSS custom properties
        - ✅ Used entry IDs instead of slugs for routing to ensure consistent URLs

      - **Implementation Notes:**
        - Used content IDs for routing rather than slugs to avoid path resolution issues
        - Added string transformation for date fields to handle various date formats
        - Applied CSS custom properties for styling instead of Tailwind's built-in utility classes for links
        - Ensured proper rendering of markdown content with appropriate typography styles

  6.  ✅ Set up basic site navigation in the theme's navigation configuration file (verify location, possibly `src/data/navigation.js` or similar). (0.5 days)

  7.  ✅ Run `npm run dev` to verify that the site builds, the homepage loads, and blog posts are accessible and rendering correctly with the theme's styling and merged configurations.

  8.  ✅ **Troubleshooting Blog Post Rendering:**

      - ✅ **File Structure:** Ensured content collection file structure matched the configuration
      - ✅ **Schema Validation:** Used string transformation for dates to prevent validation errors
      - ✅ **Rendering Methods:** Successfully rendered content with the Content component
      - ✅ **Dynamic Routes:** Used entry.id for route parameters instead of slugs for more reliable routing
      - ✅ **Content Collections:** Applied best practices for accessing collection data
      - ✅ **Styling:** Created proper prose styling for blog content

  9.  **Additional Theme Cleanup & Fixes:** (0.25 days)
      - Update the Header component to correctly display the site name
      - Remove or reduce prominence of the "Get this theme on GitHub" section
      - Update the Footer component with correct author information
      - Create a basic About page and ensure navigation links correctly

- **Learning Outcome:** Understand the `accessible-astro-starter` theme's structure, configuration files, content setup, and basic rendering. Practice merging project-wide configurations. Assess raw content migration needs for this theme.

## Milestone 2: Foundational Styling (Colors & Fonts)

- **Goal:** Replace the default AstroWind aesthetic with your specified color palette and typography.
- **Implementation Time:** 0.5-1 day
- **Tasks:**
  1.  Modify `tailwind.config.js` to inject your custom color palette (primary, secondary, accent, muted). (0.25 days)
  2.  Identify where base colors are applied (likely in `src/assets/styles/tailwind.css` or potentially within layout/UI components) and update them to use your custom colors. (0.25 days)
  3.  Choose desired fonts (e.g., Atkinson Hyperlegible, IBM Plex Sans) and integrate them. This might involve: (0.5 days)
      - Adding `@font-face` rules in `src/assets/styles/tailwind.css`.
      - Installing via npm if available as packages.
      - Configuring Tailwind (`tailwind.config.js`) to use these fonts for sans-serif/serif/mono families.
  4.  Verify font loading and application across the site in dev mode.
- **Learning Outcome:** Gain familiarity with customizing AstroWind's visual appearance via Tailwind configuration and base CSS. Understand how to integrate and apply custom fonts.

## Milestone 3: Homepage Revamp ("Soft Invitation")

- **Goal:** Transform the default homepage layout into a warmer, more personal "soft invitation."
- **Implementation Time:** 1-2 days
- **Tasks:**
  1.  Analyze the structure of `src/pages/index.astro` and the widgets it imports (likely from `src/components/widgets/`). Identify the default Hero component. (0.5 days)
  2.  Modify or replace the Hero component's content with your whimsical welcome message and tagline ("Exploring software..."). (0.5 days)
  3.  Create a simple Astro component for the "Today's Mood" block. Initially, populate it with static content (emoji/quote). Place this component prominently on the homepage. (0.5 days)
  4.  Review other default homepage sections/widgets and remove or significantly restyle any that feel too much like a "consulting services" landing page. (0.5 days)
- **Learning Outcome:** Understand how to modify Astro page structure and compose pages using Astro components/widgets. Practice adapting existing components and creating simple new ones.

## Milestone 4: Blog Enhancement ("Zine Energy")

- **Goal:** Customize blog post layout and add features for a distinctive "zine" feel using MDX.
- **Implementation Time:** 2-3 days
- **Tasks:**
  1.  Locate the primary blog post layout (e.g., `src/layouts/MarkdownLayout.astro` or similar defined in `src/content/config.ts`). (0.5 days)
  2.  Modify the layout's header section to include placeholders or logic for: (1 day)
      - "Mood when writing" (requires adding this field to post frontmatter).
      - "Last updated" (can potentially pull from Git history using Astro utilities or require manual frontmatter field).
      - Displaying tags as emojis (requires mapping tag strings to emojis, potentially in the layout or a helper function).
  3.  Create custom MDX components (`.astro` files in `src/components/`) for your callouts (e.g., `HotTake.astro`, `NeuroHack.astro`, `HallucinationBadge.astro`). Style them distinctively. (1 day)
  4.  Ensure MDX integration is set up correctly (`@astrojs/mdx` integration) and test using these custom components within your migrated `.md` or converted `.mdx` blog posts. (0.5 days)
- **Learning Outcome:** Deepen understanding of Astro layouts, MDX integration, creating and using custom components within Markdown/MDX content, and potentially interacting with frontmatter or external data (like Git) in layouts.

## Milestone 5: Visual Polish & Art Direction

- **Goal:** Infuse the site with the "digital scrapbook" aesthetic using icons, dividers, and textures.
- **Implementation Time:** 1-2 days
- **Tasks:**
  1.  Source or create doodle-style icons and hand-drawn divider assets. (0.5 days)
  2.  Integrate icons into relevant UI elements (e.g., navigation links, list bullets, callout components) using `<img>` tags or potentially an icon component library if desired. (0.5 days)
  3.  Add divider elements (CSS borders, background images, or SVG components) between sections or in headers/footers. (0.5 days)
  4.  Apply subtle textured backgrounds or gradients using Tailwind utility classes directly in components/layouts or by extending the theme in `tailwind.config.js`. (0.5 days)
  5.  Customize the site Header and Footer components (`src/components/widgets/Header.astro`, `Footer.astro`) to include elements like the rotating footer quote (start static).
- **Learning Outcome:** Practice detailed UI refinement using CSS, Tailwind, and asset integration within the Astro component model.

## Milestone 6: Extra Features (Optional - Select as needed)

- **Goal:** Implement one or more of the suggested extra features.
- **Implementation Time:** 1-3 days per feature
- **Tasks (Example: "Lab" Page):**
  1.  Define content structure for lab projects (could be a new content collection `src/content/lab/` with `.md`/`.mdx` files or a simple JSON/TS data file). (0.5 days)
  2.  Create a new page route: `src/pages/lab.astro`. (0.25 days)
  3.  Design and implement an Astro component to display lab project summaries/cards. (1 day)
  4.  Fetch and render the lab project data on the `lab.astro` page. (0.5 days)
  5.  Add a link to the Lab page in the main navigation (`src/navigation.js`). (0.25 days)
- **Learning Outcome:** Practice creating new page routes, defining content structures (collections or data files), fetching/rendering data, and building feature-specific components. (Specific outcomes vary by chosen feature).

## Milestone 7: Vercel Deployment & Final Review

- **Goal:** Deploy the migrated and customized site to Vercel and perform final checks.
- **Implementation Time:** 0.5-1 day
- **Tasks:**

  1.  Ensure the Vercel adapter is properly configured in `astro.config.mjs` (see Milestone 1, Task 2). Ensure `output: 'static'` is set if using static deployment.

  2.  Run `npm run build` to generate the production site in `dist/`.

  3.  Test the production build locally using `npm run preview`.

  4.  Set up Vercel deployment:

      - Connect your GitHub repository to Vercel
      - Vercel should automatically detect:
        - That this is an Astro project
        - The build command (`astro build`)
        - The output directory (`dist`)

  5.  Deploy and verify:

      - Trigger the initial deployment
      - Verify the live site functions correctly
      - Set up your custom domain if needed

  6.  Perform cross-browser/device testing and fix any final styling or functional issues.

- **Learning Outcome:** Understand Astro's build process with the Vercel adapter and how to configure Vercel for optimal deployment.
