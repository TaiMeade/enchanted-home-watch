// schema.org JSON-LD builders. Search engines use these for rich results
// (business details, service areas, prices and FAQ answers).
import site from '@/data/site.json'
import areas from '@/data/areas.json'
import faq from '@/data/faq.json'
import { absoluteUrl } from '@/composables/useSeo'
import { usePlans } from '@/composables/usePlans'

const businessId = absoluteUrl('/#business')

export function businessSchema() {
  const { plans } = usePlans()
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId,
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phoneE164,
    image: absoluteUrl(site.ogImage),
    logo: absoluteUrl('favicon.svg'),
    foundingDate: String(site.foundingYear),
    priceRange: `$${Math.min(...plans.map((p) => p.monthly))}-$${Math.max(...plans.map((p) => p.monthly))} per month`,
    paymentAccepted: site.billing.methods.join(', '),
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.contact.geo.lat,
      longitude: site.contact.geo.lon,
    },
    areaServed: areas.towns.map((town) => ({
      '@type': 'City',
      name: `${town.name}, NM`,
    })),
    sameAs: site.social.map((s) => s.url),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Home watch plans',
      itemListElement: plans.map((plan) => ({
        '@type': 'Offer',
        name: `${plan.name} home watch plan`,
        description: plan.summary,
        price: plan.monthly,
        priceCurrency: site.billing.currency,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: plan.monthly,
          priceCurrency: site.billing.currency,
          unitCode: 'MON',
        },
      })),
    },
  }
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function areaServiceSchema(town) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Home watch',
    name: `Home watch in ${town.name}, NM`,
    description: town.intro,
    url: absoluteUrl(`/service-areas/${town.slug}/`),
    provider: { '@id': businessId },
    areaServed: { '@type': 'City', name: `${town.name}, NM` },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
