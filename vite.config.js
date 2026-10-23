import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import site from './src/data/site.json' with { type: 'json' }
import areas from './src/data/areas.json' with { type: 'json' }
import { writeSeoFiles } from './scripts/seo-files.js'

// The public URL in site.json is the single source of truth for the base path.
// Moving to a custom domain later only means changing site.url (base becomes '/').
const base = new URL(site.url).pathname

export default defineConfig({
  base,
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  ssr: {
    noExternal: ['vuetify'],
  },
  // Vuetify 4: pre-bundle overlay components together in dev so a select menu
  // inside the contact dialog shares one stacking context (see Vuetify upgrade guide).
  optimizeDeps: {
    include: [
      'vuetify/components/VOverlay',
      'vuetify/components/VDialog',
      'vuetify/components/VMenu',
      'vuetify/components/VSelect',
      'vuetify/components/VNavigationDrawer',
    ],
  },
  ssgOptions: {
    script: 'async',
    dirStyle: 'nested',
    formatting: 'none',
    // Critical-CSS inlining reorders stylesheets and breaks the cascade-layer order
    // that keeps Tailwind and Vuetify apart. The full CSS is small, so ship it as is.
    beastiesOptions: false,
    // Pre-render every service-area page so each town is crawlable on its own URL.
    includedRoutes(paths) {
      return [
        ...paths.filter((p) => !p.includes(':')),
        ...areas.towns.map((town) => `/service-areas/${town.slug}`),
      ]
    },
    onFinished() {
      writeSeoFiles({ outDir: 'dist', site, towns: areas.towns })
    },
  },
})
