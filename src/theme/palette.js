// Brand palette: spruce forest and aspen gold on a soft sage mist.
// Two hues and their tints keep the site calm; gold is reserved for actions
// and highlights. Vuetify exposes every key below as rgb(var(--v-theme-<key>)),
// so CSS and Tailwind read from here too.
export const palette = {
  mist: '#F4F6F2', // page background
  sage: '#E6ECE5', // tinted sections and chips
  ink: '#16241F', // body text
  forest: '#173A33', // dark sections
  forestDeep: '#0E2622', // footer, gradients
  spruce: '#2C6B5E', // links, icons, checks
  gold: '#E3AA45', // primary actions
  goldSoft: '#F3D08A', // highlights on dark backgrounds
  muted: '#5C6A64', // secondary text
}

// Accent for each subscription tier, keyed by plan id in src/data/plans.json.
export const tierColors = {
  gold: '#D9A441',
  platinum: '#A3B0B8',
  diamond: '#8CC3D1',
}

export const enchantedTheme = {
  dark: false,
  colors: {
    background: palette.mist,
    surface: '#FFFFFF',
    'on-background': palette.ink,
    'on-surface': palette.ink,
    primary: palette.spruce,
    secondary: palette.forest,
    accent: palette.gold,
    'on-accent': palette.ink,
    forest: palette.forest,
    'forest-deep': palette.forestDeep,
    sage: palette.sage,
    'gold-soft': palette.goldSoft,
    muted: palette.muted,
    'tier-gold': tierColors.gold,
    'tier-platinum': tierColors.platinum,
    'tier-diamond': tierColors.diamond,
    error: '#B3261E',
    warning: '#A86A0C',
    success: '#2E7D57',
    info: palette.spruce,
  },
}
