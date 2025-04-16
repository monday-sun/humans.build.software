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

  9.  ✅ **Additional Theme Cleanup & Fixes:** (0.25 days)
      - ✅ Updated the Header component to correctly display the site name from siteConfig
      - ✅ Replaced the "Get this theme on GitHub" section with "Stay connected" call to action
      - ✅ Updated the Footer component with correct author information from siteConfig
      - ✅ Created a basic About page with detailed author information from the original authors.yml
      - ✅ Updated navigation links to include the About page and removed example pages

- **Learning Outcome:** Understand the `accessible-astro-starter` theme's structure, configuration files, content setup, and basic rendering. Practice merging project-wide configurations. Assess raw content migration needs for this theme.

## Milestone 2: Foundational Styling (Colors & Fonts)

- **Goal:** Replace the default AstroWind aesthetic with your specified color palette and typography.
- **Implementation Time:** 0.5-1 day
- **Tasks:**
  1.  ✅ Modify `tailwind.config.js` to inject your custom color palette (primary, secondary, accent, muted). (0.25 days)
  2.  ✅ Identify where base colors are applied (likely in `src/assets/styles/tailwind.css` or potentially within layout/UI components) and update them to use your custom colors. (0.25 days)
  3.  ✅ Choose desired fonts (e.g., Atkinson Hyperlegible, IBM Plex Sans) and integrate them. This might involve: (0.5 days)
      - ✅ Adding `@font-face` rules in `src/assets/styles/tailwind.css`.
      - ✅ Installing via npm if available as packages.
      - ✅ Configuring Tailwind (`tailwind.config.js`) to use these fonts for sans-serif/serif/mono families.
  4.  ✅ Verify font loading and application across the site in dev mode.
- **Learning Outcome:** Gain familiarity with customizing AstroWind's visual appearance via Tailwind configuration and base CSS. Understand how to integrate and apply custom fonts.

## Milestone 3: Homepage Revamp ("Soft Invitation")

- **Goal:** Transform the default homepage layout into a warmer, more personal "soft invitation."
- **Implementation Time:** 1-2 days
- **Tasks:**

  1.  ✅ Analyze the structure of `src/pages/index.astro` and the widgets it imports (likely from `src/components/widgets/`). Identify the default Hero component. (0.5 days)
  2.  ✅ Modify or replace the Hero component's content with your whimsical welcome message and tagline ("Exploring software..."). (0.5 days)
  3.  ❌ Create a simple Astro component for the "Today's Mood" block. Initially, populate it with static content (emoji/quote). Place this component prominently on the homepage. (0.5 days)
      - **Note:** Decided to skip this component as it would require ongoing maintenance.
  4.  ✅ Review other default homepage sections/widgets and remove or significantly restyle any that feel too much like a "consulting services" landing page. (0.5 days)
      - **Implementation Notes:**
        - Removed all template sections (Features, ContentMedia, FAQ, Counters)
        - Added a "What to Expect" section with blog description
        - Added a "Recent Posts" section with latest blog entries in a card layout
        - Styled cards with hover effects and clean typography
        - ✅ **Update ([Date]):** Refactored recent posts section to use a shared `CardNoImage` component. Updated title to "Recent Activity" and configured to display the latest 3 items combined from both 'blog' and 'notes' collections. Fixed URL generation to handle `id` for blog and `slug` for notes.

- **Learning Outcome:** Understand how to modify Astro page structure and compose pages using Astro components/widgets. Practice adapting existing components and creating simple new ones.

## Milestone 4: Blog Enhancements and Additional Features (Simplified Plan)

- **Goal:** Focus on practical improvements to enhance blog functionality and user experience
- **Implementation Time:** 3-5 days
- **Tasks:**

  1. ✅ **Review and Enhance Blog Page** (0.5-1 day)

     - Analyze the current blog index page structure and design
     - Improve post listing layout and readability
     - Add pagination if needed
     - Ensure consistent styling with the homepage

  2. ✅ **Multi-Author Support** (0.5-1 day)

     - ✅ Created authors content collection in `src/content.config.mjs`
     - ✅ Created a directory structure for authors at `src/content/authors/`
     - ✅ Migrated existing author data to the new collection
     - ✅ Updated blog post schema to reference author IDs
     - ✅ Created individual author pages with bios rendered as markdown
     - ✅ Updated navigation and about page to support the new author system
     - ✅ Ensured all blog posts reference authors by ID

  3. ✅ **Create Notes Section** (1-1.5 days)

     - ✅ Create a separate content collection for "Notes" (shorter-form content)
     - ✅ Define schema for Notes in the content config
     - ✅ Design a Notes index page at `/notes` (using `CardNoImage` component)
     - ✅ Develop a streamlined template for individual note posts
     - ✅ Add to site navigation
     - ✅ **Note:** Integrated latest notes alongside blog posts into the "Recent Activity" section on the homepage.

  4. ~~**Portfolio Page Placeholder** (0.5 days)~~ (Removed)

     - ~~Create a simple "Coming Soon" portfolio page~~
     - ~~Design a visually appealing placeholder with future intent~~
     - ~~Add to site navigation~~

  5. ✅ **Blog Post Cover Images** (0.5-1 day)

     - ✅ Added robust cover image support to blog post schema (`src/content/config.mjs`).
     - ✅ Updated blog list layout (`src/pages/blog/[...page].astro`) to pass image to `Card`.
     - ✅ Updated blog post layout (`src/pages/blog/[post].astro`) to display cover images prominently using `<Image>`.
     - ✅ Ensured responsive image handling with Tailwind classes.
     - ✅ Implemented image optimization using Astro's `<Image>`.
     - ✅ Added images to example posts (`crystal-ball.md`, `micro-commits.md`).

  6. **RSS Feed Implementation** (0.5 days)

     - Install and configure RSS feed integration
     - Ensure both blog posts and notes are included in feeds
     - Add RSS link to the site footer and/or header
     - Test feed validity with an RSS validator

  7. **Email Signup Integration** (1 day)

     - Research email subscription options (likely Mailchimp or ConvertKit)
     - Create a clean, non-intrusive signup component
     - Add to strategic locations (blog sidebar, end of posts)
     - Test signup flow from end to end

  8. **About Page Enhancement** (0.5 days)

     - Fix styling issues on the About page
     - Add author photo with appropriate sizing and positioning
     - Ensure consistent typography and layout with rest of site
     - Review and improve author bio content if needed

  9. I broke the author link in the blog posts

- **Learning Outcome:** Master practical aspects of building a content-focused site with Astro, including content collections, responsive design, and third-party integrations.

## Milestone 5: Deployment and Optimization

- **Goal:** Deploy the site and ensure optimal performance
- **Implementation Time:** 0.5-1 day
- **Tasks:**

  1. **Vercel Configuration and Deployment** (0.5 days)

     - Ensure Vercel adapter is properly configured in `astro.config.mjs`
     - Run production build and test locally
     - Deploy to Vercel and verify functionality
     - Set up custom domain if needed

  2. **Performance Optimization** (0.5 days)
     - Analyze Lighthouse scores
     - Optimize image loading and rendering
     - Implement any necessary performance improvements
     - Ensure accessibility compliance

- **Learning Outcome:** Understand Astro's build process with the Vercel adapter and optimization techniques for production deployment.
