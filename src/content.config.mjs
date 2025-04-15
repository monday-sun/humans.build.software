// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

// 2. Import loader(s)
import { glob } from 'astro/loaders'

// 3. Define your collection(s)
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    // Use string transformation first to handle various date formats
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

// 4. Export a single `collections` object to register you collection(s)
export const collections = { projects, blog }
