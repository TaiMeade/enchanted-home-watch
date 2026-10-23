import { existsSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

// Runs after vite-ssg has pre-rendered every page. Writes the crawl files that
// need the absolute site URL and turns the /404 page into GitHub Pages' 404.html.
export function writeSeoFiles({ outDir, site, towns }) {
  const absolute = (path) => new URL(path.replace(/^\//, ''), site.url).href
  const today = new Date().toISOString().slice(0, 10)

  const pages = [
    { path: '/', priority: '1.0' },
    ...towns.map((town) => ({ path: `/service-areas/${town.slug}/`, priority: '0.8' })),
  ]

  const urls = pages
    .map(
      ({ path, priority }) =>
        `  <url><loc>${absolute(path)}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`,
    )
    .join('\n')

  writeFileSync(
    join(outDir, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )

  writeFileSync(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absolute('sitemap.xml')}\n`)

  const notFoundDir = join(outDir, '404')
  if (existsSync(join(notFoundDir, 'index.html'))) {
    renameSync(join(notFoundDir, 'index.html'), join(outDir, '404.html'))
    rmSync(notFoundDir, { recursive: true, force: true })
  }
}
