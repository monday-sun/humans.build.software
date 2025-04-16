# Blog Configuration

## Overview

The blog uses Astro's Content Collections to manage blog posts. This provides type-safe frontmatter validation, unified content access, and simplified content management.

## Content Collection Configuration

Content collections are defined in `src/content.config.mjs`:

```javascript
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    // String transformation for flexible date parsing
    pubDate: z
      .string()
      .transform((str) => new Date(str))
      .pipe(z.date()),
    updatedDate: z
      .string()
      .transform((str) => new Date(str))
      .pipe(z.date())
      .optional(),
    tags: z.array(z.string()).optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    draft: z.boolean().optional().default(false),
  }),
})
```

## Frontmatter Format

Each blog post needs frontmatter at the top of the markdown file:

```markdown
---
title: 'Post Title'
description: 'Brief description of the post'
author: 'Author Name'
pubDate: 'YYYY-MM-DDT00:00:00Z'
updatedDate: 'YYYY-MM-DDT00:00:00Z' # Optional
tags:
  - 'tag1'
  - 'tag2'
draft: false # Optional, defaults to false
---

Post content goes here...
```

## Key Components

### Blog Listing Page

Located at `src/pages/blog/[...page].astro`, this component:

- Fetches all blog posts using `getCollection('blog')`
- Sorts posts by publication date (newest first)
- Paginates the results (6 posts per page)
- Renders each post as a card with title, description, and publication date
- Provides pagination controls

### Blog Post Page

Located at `src/pages/blog/[post].astro`, this component:

- Generates dynamic routes for each blog post using the post's ID
- Renders the full content of individual blog posts
- Displays metadata (author, publication date, tags, etc.)
- Applies proper styling to markdown content

## Implementation Notes

### Date Handling

- The schema uses string transformation to handle various date formats
- Dates are stored in ISO 8601 format (`YYYY-MM-DDT00:00:00Z`)
- Display formatting is handled in the components using `toLocaleDateString()`

### Routing Strategy

- Blog posts are routed using their content ID (e.g., `/blog/crystal-ball`)
- This provides more reliable routing than using slugs
- Links between pages use the ID for consistency

### Styling

- Blog post content is styled using the `.prose` class with Tailwind utilities
- Links use CSS custom properties (`var(--action-color)`) for consistent theming
- The layout is responsive with appropriate spacing for various screen sizes

## MDX Support

The site has MDX integration configured, allowing for:

- Embedding components in markdown
- Enhanced formatting options
- Custom interactive elements

To use MDX, simply change the file extension from `.md` to `.mdx` and import components at the top of the file.

## Adding New Blog Posts

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add the required frontmatter (title, description, pubDate)
3. Write your content using markdown
4. The post will automatically appear in the blog listing page once built

## Troubleshooting

If blog posts aren't rendering correctly:

1. Verify the frontmatter has all required fields
2. Check that date strings are in a format JavaScript can parse
3. Ensure the post ID in the URL exactly matches the filename (without extension)
4. For MDX issues, check that any imported components exist and are properly exported
