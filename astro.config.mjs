import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import tailwind from '@astrojs/tailwind'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const env = loadEnv(import.meta.env.MODE, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  build: {
    format: 'file',
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
})
