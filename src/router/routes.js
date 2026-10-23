import areas from '@/data/areas.json'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/service-areas/:slug',
    name: 'area',
    component: () => import('@/pages/AreaPage.vue'),
    props: true,
    // Unknown towns render the 404 page while keeping the URL the visitor typed.
    beforeEnter: (to) =>
      areas.towns.some((t) => t.slug === to.params.slug) || {
        name: 'missing',
        params: { pathMatch: to.path.slice(1).split('/') },
        query: to.query,
        hash: to.hash,
      },
  },
  {
    // Pre-rendered on its own, then copied to 404.html for GitHub Pages.
    path: '/404',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { solidHeader: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'missing',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { solidHeader: true },
  },
]

// Height of the fixed site header, so anchored sections aren't hidden under it.
const HEADER_OFFSET = 72

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) return { el: to.hash, top: HEADER_OFFSET, behavior: 'smooth' }
  return { top: 0 }
}
