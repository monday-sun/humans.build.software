import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import MarkdownIt from 'markdown-it'
import { siteConfig } from '../data/site.js'

const parser = new MarkdownIt()

// Helper function to generate the correct URL prefix
function getItemUrlPrefix(collection) {
  if (collection === 'blog') {
    return '/blog/'
  }
  if (collection === 'notes') {
    return '/notes/'
  }
  return '/' // Default fallback
}

export async function GET(context) {
  // Ensure context.site is available
  if (!context.site) {
    throw new Error('Missing site context. Ensure site is set in astro.config.mjs')
  }

  const blogPosts = await getCollection('blog', ({ data }) => !data.draft)
  const notes = await getCollection('notes', ({ data }) => !data.draft)

  const allItems = [...blogPosts, ...notes]
    .map((item) => ({ ...item, collectionType: item.collection }))
    // Filter out items missing essential data like id, pubDate, title
    // Using item.id based on observation from page template
    .filter((item) => item.id && item.data.pubDate && item.data.title)
    // Sort all items by publication date, newest first
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  return rss({
    // `<title>` field in output xml
    title: siteConfig.name,
    // `<description>` field in output xml
    description: siteConfig.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site.toString(), // Ensure it's a string
    // Add the atom:link for self-reference
    atom: {
      // Construct absolute URL for the feed itself
      link: new URL('rss.xml', context.site).toString(),
    },
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: allItems.map((item) => {
      // --- Derive slug from item.id ---
      // item.id is typically like 'collection/filename.md'
      // Extract filename, remove extension to get the slug
      const idParts = item.id.split('/')
      const filename = idParts[idParts.length - 1]
      // Basic extension removal (handles .md, .mdx, etc.)
      const derivedSlug = filename.replace(/\.[^/.]+$/, '')
      // --- End Derive slug ---

      // Construct absolute URL for the item link using the derived slug
      const itemUrl = new URL(
        `${getItemUrlPrefix(item.collectionType)}${derivedSlug}/`,
        context.site, // Base URL for resolving the item link
      ).toString()

      // Render raw Markdown body to HTML for the content field
      let htmlContent = parser.render(item.body)

      const siteUrl = context.site.toString() // Get base site URL
      // Use a replacer function for clarity and correct quoting
      htmlContent = htmlContent.replace(
        /(src|href)=(["'])(?!https?:\/\/|\/\/|#)(.+?)\2/gi,
        (match, attr, quote, relativePath) => {
          try {
            // Construct the absolute URL
            const absoluteUrl = new URL(relativePath, siteUrl).toString()
            // Return the attribute with the original quotes and the new absolute URL
            return `${attr}=${quote}${absoluteUrl}${quote}`
          } catch (e) {
            // In case of invalid URL construction, return the original match
            console.error(`Error creating absolute URL for ${relativePath}:`, e)
            return match
          }
        },
      )

      // Wrap the HTML content in CDATA to ensure parsers treat it as raw data
      const cdataContent = `<![CDATA[${htmlContent}]]>`

      return {
        title: item.data.title,
        pubDate: item.data.pubDate,
        description: item.data.description,
        // Render raw Markdown body to HTML for the content field
        // Use the CDATA-wrapped content
        content: cdataContent,
        // Compute item link from collection type and slug, ensuring it's absolute
        link: itemUrl,
        // Explicitly set guid to the absolute item URL for uniqueness
        guid: itemUrl,
        // Optional: Add author information if available
        // customData: `<author>${item.data.author}</author>` // Need to resolve author ID to name if desired
      }
    }),
    // (optional) inject custom xml
    // Add language and explicitly add atom:link as customData for robustness
    customData: [
      `<language>en-us</language>`,
      `<atom:link href="${new URL('rss.xml', context.site).toString()}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>`,
    ].join(''),
    // Use site name as the managing editor (can be updated)
    managingEditor: siteConfig.author,
    // Use site name as the webmaster (can be updated)
    webMaster: siteConfig.author,
    // Copyright info
    copyright: `Copyright © ${new Date().getFullYear()} ${siteConfig.author}`,
    // Publication date of the feed itself
    pubDate: new Date(), // Use current date for feed publication
  })
}
