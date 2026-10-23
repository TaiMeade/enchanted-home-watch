// Brand palette drawn from the Enchanted Circle: Sangre de Cristo alpenglow,
// Taos blue doors, aspen gold and ponderosa pine. Vuetify exposes every key
// below as rgb(var(--v-theme-<key>)), so CSS and Tailwind read from here too.
export const palette = {
  snow: '#F3F6F5',
  ridge: '#1C2733',
  ridgeSoft: '#2A3847',
  taosBlue: '#2E7689',
  alpenglow: '#B8405F',
  aspen: '#D4A23A',
  ponderosa: '#3E5A49',
  stone: '#5B6670',
}

// Accent for each subscription tier, keyed by plan id in src/data/plans.json.
export const tierColors = {
  gold: '#C9962B',
  platinum: '#9AA7B1',
  diamond: '#7FB9CC',
}

export const enchantedTheme = {
  dark: false,
  colors: {
    background: palette.snow,
    surface: '#FFFFFF',
    'on-background': palette.ridge,
    'on-surface': palette.ridge,
    primary: palette.taosBlue,
    secondary: palette.ponderosa,
    accent: palette.alpenglow,
    ridge: palette.ridge,
    'ridge-soft': palette.ridgeSoft,
    aspen: palette.aspen,
    stone: palette.stone,
    'tier-gold': tierColors.gold,
    'tier-platinum': tierColors.platinum,
    'tier-diamond': tierColors.diamond,
    error: '#B3261E',
    warning: '#B26A00',
    success: '#2F7D4F',
    info: palette.taosBlue,
  },
}
