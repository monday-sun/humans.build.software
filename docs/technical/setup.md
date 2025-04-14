# Project Setup & Commands

## Current Setup (Pre-Migration - Jekyll Blog)

1.  **Ruby Environment:** Ensure Ruby 3.3.0 is installed (using a version manager like rbenv or asdf is recommended).
2.  **Install Ruby Dependencies:** Run `bundle install` in the root directory to install Gems specified in the `Gemfile`.
3.  **Running Jekyll Locally:** (Command not specified in `package.json`, typically requires `bundle exec jekyll serve` run from the `dev-blog` directory or root, depending on configuration).
4.  **Building Jekyll Site:** (Command not specified, typically `bundle exec jekyll build`).

## Development Tooling Setup

1.  **Node.js Environment:** Ensure Node.js (LTS recommended) and Yarn are installed.
2.  **Install Node Dependencies:** Run `yarn install` in the root directory.
3.  **Available Scripts (`package.json`):**
    *   `yarn lint`: Run ESLint.
    *   `yarn format`: Run Prettier to format code.
    *   `yarn test`: Run Jest tests.

## Target Setup (Post-Migration - Astro Project)

*(These apply once the Astro project is initialized)*

1.  **Node.js Environment:** Ensure Node.js (version specified by Astro, check Astro docs) and npm are installed.
2.  **Install Node Dependencies:** Navigate to the new Astro project directory and run `npm install`.
3.  **Common Astro Commands:**
    *   `npm run dev`: Start the development server.
    *   `npm run build`: Build the site for production.
    *   `npm run preview`: Preview the production build locally. 