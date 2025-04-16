# Site Configuration

## Overview

The site uses a central configuration file (`src/data/site.js`) to manage site-wide metadata like the site name, description, and author information. This provides a single source of truth for important site values.

## Configuration File Location

```
src/data/site.js
```

## Current Configuration Values

```javascript
export const siteConfig = {
  name: 'Humans Build Software',
  description:
    'A development practices blog centered around people, the mistakes we make, and how to avoid or recover from them.',
  url: 'https://humans.build.software',
  author: 'Monday Romelfanger',
  defaultImage: 'social-preview-image.png',
}
```

## Usage in Components

The configuration is used in the following key components:

### DefaultLayout.astro

The layout uses siteConfig values as defaults for its props:

```javascript
const {
  title = siteConfig.name,
  description = siteConfig.description,
  url = Astro.site || siteConfig.url,
  image = siteConfig.defaultImage,
  author = siteConfig.author,
} = Astro.props
```

### SiteMeta.astro

The SiteMeta component also uses siteConfig values as defaults:

```javascript
const {
  title = siteConfig.name,
  description = siteConfig.description,
  url = siteConfig.url,
  image,
  author = siteConfig.author,
} = Astro.props
```

### Hero.astro

The Hero component uses siteConfig directly:

```javascript
<h1 class="text-center text-6xl md:text-left lg:text-8xl">
  <slot><span class="text-gradient">{siteConfig.name.split(' ')[0]}</span> {siteConfig.name.split(' ').slice(1).join(' ')}</slot>
</h1>
<p class="text-center text-2xl md:text-left">
  {siteConfig.description}
</p>
```

## Special Cases

- **Homepage (index.astro)**: The homepage uses a static title "Home" instead of the site name:
  ```javascript
  <DefaultLayout title="Home">
  ```

## Updating Site Information

To update site-wide metadata:

1. Edit `src/data/site.js`
2. Modify the desired values in the `siteConfig` object
3. All components using these values will automatically reflect the changes

Note that some components or pages may override these values with their own specific content.
