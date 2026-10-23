import { computed, toValue } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import site from '@/data/site.json'

export const absoluteUrl = (path = '/') => new URL(path.replace(/^\//, ''), site.url).href

/**
 * Sets the title, description, canonical URL, social cards and any JSON-LD for a page.
 * Accepts a plain object or a getter (for pages whose content follows a route param).
 * Everything is rendered into the static HTML at build time by vite-ssg.
 */
export function useSeo(options) {
  const seo = computed(() => {
    const { title, description = site.description, path = '/', jsonLd = [] } = toValue(options)
    return {
      title: title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`,
      description,
      url: absoluteUrl(path),
      jsonLd,
    }
  })
  const image = absoluteUrl(site.ogImage)

  useSeoMeta({
    title: () => seo.value.title,
    description: () => seo.value.description,
    ogType: 'website',
    ogSiteName: site.name,
    ogLocale: site.locale,
    ogTitle: () => seo.value.title,
    ogDescription: () => seo.value.description,
    ogUrl: () => seo.value.url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterTitle: () => seo.value.title,
    twitterDescription: () => seo.value.description,
    twitterImage: image,
  })

  useHead({
    htmlAttrs: { lang: 'en' },
    link: () => [{ rel: 'canonical', href: seo.value.url }],
    script: () =>
      seo.value.jsonLd.map((data) => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(data),
      })),
  })
}
