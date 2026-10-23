import { ViteSSG } from 'vite-ssg'
import '@fontsource-variable/manrope'
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
