import { ViteSSG } from 'vite-ssg'
import '@fontsource/zilla-slab/500.css'
import '@fontsource/zilla-slab/600.css'
import '@fontsource/zilla-slab/700.css'
import '@fontsource-variable/public-sans'
// Core only: Tailwind covers layout utilities, and the vite plugin adds per-component CSS.
import 'vuetify/styles/core'
import './styles/main.css'

import App from './App.vue'
import { routes, scrollBehavior } from './router/routes'
import { createAppVuetify } from './plugins/vuetify'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior, base: import.meta.env.BASE_URL },
  ({ app }) => {
    app.use(createAppVuetify())
  },
)
