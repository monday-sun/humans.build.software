// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

// 2. Import loader(s)
import { glob } from 'astro/loaders'

const authors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.string().optional(),
    email: z.string().optional(),
    social: z
      .record(
        z.object({
          url: z.string(),
          label: z.string(),
          icon: z.string(),
        }),
      )
      .optional(),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
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

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
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
    // Add catImage field for notes
    catImage: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    draft: z.boolean().optional().default(false),
  }),
})

// 4. Export a single `collections` object to register you collection(s)
export const collections = { blog, authors, notes }
