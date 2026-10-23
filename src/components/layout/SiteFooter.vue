<script setup>
import BrandMark from '@/components/common/BrandMark.vue'
import site from '@/data/site.json'
import areas from '@/data/areas.json'
import { socialIcon } from '@/lib/icons'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="shell tw:grid tw:gap-12 tw:md:grid-cols-2 tw:lg:grid-cols-[3fr_2fr_2fr_2fr]">
      <div class="tw:flex tw:flex-col tw:gap-4">
        <router-link to="/" class="footer__home" aria-label="Enchanted Home Watch, home"><BrandMark /></router-link>
        <p class="footer__muted measure">{{ site.description }}</p>
        <ul class="footer__social tw:flex tw:gap-1" aria-label="Social media">
          <li v-for="link in site.social" :key="link.id">
            <v-btn
              :href="link.url"
              target="_blank"
              rel="noopener"
              :icon="socialIcon(link.id)"
              variant="text"
              size="small"
              :aria-label="link.label"
            />
          </li>
        </ul>
      </div>

      <div>
        <h2 class="footer__heading">Contact</h2>
        <ul class="footer__list">
          <li><a :href="`tel:${site.contact.phoneE164}`">{{ site.contact.phone }}</a></li>
          <li><a :href="`mailto:${site.contact.email}`" class="footer__email">{{ site.contact.email }}</a></li>
          <li class="footer__muted">{{ site.contact.hours }}</li>
          <li class="footer__muted">
            {{ site.contact.address.locality }}, {{ site.contact.address.region }} {{ site.contact.address.postalCode }}
          </li>
        </ul>
      </div>

      <nav aria-labelledby="footer-areas">
        <h2 id="footer-areas" class="footer__heading">Service areas</h2>
        <ul class="footer__list">
          <li v-for="town in areas.towns" :key="town.slug">
            <router-link :to="`/service-areas/${town.slug}`">Home watch in {{ town.name }}</router-link>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="footer__heading">Billing</h2>
        <ul class="footer__list">
          <li v-for="method in site.billing.methods" :key="method" class="footer__muted">{{ method }}</li>
          <li class="footer__muted">Monthly or annual, save {{ site.billing.annualDiscountPercent }}% yearly</li>
        </ul>
      </div>
    </div>

    <div class="shell footer__base tw:flex tw:flex-col tw:gap-2 tw:md:flex-row tw:md:justify-between">
      <p>&copy; {{ year }} {{ site.legalName }}. Serving the Enchanted Circle, New Mexico.</p>
      <p>Photos from Unsplash</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  color: rgb(var(--v-theme-background));
  background: rgb(var(--v-theme-ridge));
  padding-top: clamp(56px, 8vw, 96px);
}

.footer a {
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.footer__muted {
  opacity: 0.68;
}

.footer__heading {
  font-size: var(--step-1);
  margin-bottom: 14px;
  color: rgb(var(--v-theme-aspen));
}

.footer__list {
  list-style: none;
  display: grid;
  gap: 8px;
  font-size: 0.95rem;
}

.footer__email {
  overflow-wrap: anywhere;
}

.footer__social {
  list-style: none;
  margin-left: -8px;
}

.footer__base {
  margin-top: 56px;
  padding-block: 24px;
  border-top: 1px solid rgb(255 255 255 / 0.12);
  font-size: var(--step--1);
  opacity: 0.6;
}
</style>
