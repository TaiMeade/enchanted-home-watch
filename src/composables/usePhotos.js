// Resolves a photo slug (as used in the JSON data files) to hashed asset URLs.
// Drop `<slug>-960.webp` (and optionally `<slug>-1600.webp`) into src/assets/photos
// and reference the slug from any data file.
const files = import.meta.glob('@/assets/photos/*.webp', { eager: true, import: 'default' })

const photos = {}
for (const [path, url] of Object.entries(files)) {
  const [, slug, width] = path.match(/([\w-]+)-(\d+)\.webp$/)
  photos[slug] ??= {}
  photos[slug][width] = url
}

export function usePhoto(slug) {
  const sizes = photos[slug]
  if (!sizes) {
    if (import.meta.env.DEV) console.warn(`[photos] No image found for "${slug}"`)
    return { src: '', srcset: '' }
  }
  const widths = Object.keys(sizes).map(Number).sort((a, b) => a - b)
  return {
    src: sizes[widths.at(-1)],
    small: sizes[widths[0]],
    srcset: widths.map((w) => `${sizes[w]} ${w}w`).join(', '),
  }
}
