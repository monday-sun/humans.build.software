import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  site: 'https://humans.build.software',
  integrations: [
    mdx(),
    icon(),
    tailwind({
      applyBaseStyles: false,
    }),
    compress(),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          logger: {
            warn: () => {},
          },
        },
      },
    },
  },
})
