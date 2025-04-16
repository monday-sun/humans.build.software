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
  const blogPosts = await getCollection('blog', ({ data }) => !data.draft)
  const notes = await getCollection('notes', ({ data }) => !data.draft)

  const allItems = [...blogPosts, ...notes]
    // Add the collection type to each item for URL generation
    .map((item) => ({ ...item, collectionType: item.collection }))
    // Sort all items by publication date, newest first
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  return rss({
    // `<title>` field in output xml
    title: siteConfig.name,
    // `<description>` field in output xml
    description: siteConfig.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: allItems.map((item) => ({
      title: item.data.title,
      pubDate: item.data.pubDate,
      description: item.data.description,
      // Render raw Markdown body to HTML for the content field
      content: parser.render(item.body),
      // Compute item link from collection type and slug
      link: `${getItemUrlPrefix(item.collectionType)}${item.slug}/`,
      // Optional: Add author information if available
      // customData: `<author>${item.data.author}</author>` // Need to resolve author ID to name if desired
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
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
