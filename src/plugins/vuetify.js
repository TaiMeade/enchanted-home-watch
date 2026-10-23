import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { enchantedTheme } from '@/theme/palette'

// Called once per app instance so pre-rendering (vite-ssg) never shares state.
export function createAppVuetify() {
  return createVuetify({
    ssr: true,
    icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
    theme: {
      defaultTheme: 'enchanted',
      themes: { enchanted: enchantedTheme },
    },
    defaults: {
      VBtn: { rounded: 'pill' },
      VTextField: { variant: 'outlined', density: 'comfortable', color: 'primary' },
      VTextarea: { variant: 'outlined', density: 'comfortable', color: 'primary' },
      VSelect: { variant: 'outlined', density: 'comfortable', color: 'primary' },
      VExpansionPanels: { variant: 'accordion', flat: true },
    },
  })
}
