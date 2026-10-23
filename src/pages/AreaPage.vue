<script setup>
import { computed } from 'vue'
import { mdiMapMarker } from '@mdi/js'
import PlansSection from '@/components/plans/PlansSection.vue'
import CtaBand from '@/components/common/CtaBand.vue'
import areas from '@/data/areas.json'
import site from '@/data/site.json'
import { usePhoto } from '@/composables/usePhotos'
import { useContactDialog } from '@/composables/useContactDialog'
import { useSeo } from '@/composables/useSeo'
import { areaServiceSchema, breadcrumbSchema } from '@/lib/structuredData'
import { formatFeet } from '@/lib/format'

const props = defineProps({
  slug: { type: String, required: true },
})

const { openContact } = useContactDialog()

// The route guard guarantees the slug matches a town in areas.json.
const town = computed(() => areas.towns.find((t) => t.slug === props.slug))
const photo = computed(() => usePhoto(town.value.image))
const otherTowns = computed(() => areas.towns.filter((t) => t.slug !== props.slug))

useSeo(() => ({
  title: `Home Watch in ${town.value.name}, NM`,
  description: `Second-home watch in ${town.value.name}, New Mexico: scheduled visits, photo reports and storm checks from a local team. Plans from Gold to Diamond.`,
  path: `/service-areas/${town.value.slug}/`,
  jsonLd: [
    areaServiceSchema(town.value),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: `Home watch in ${town.value.name}`, path: `/service-areas/${town.value.slug}/` },
    ]),
  ],
}))
</script>

<template>
  <section class="town-hero" aria-labelledby="town-title">
    <img :src="photo.src" :srcset="photo.srcset" sizes="100vw" alt="" class="town-hero__bg" fetchpriority="high" />
    <div class="shell town-hero__inner tw:flex tw:flex-col tw:gap-5">
      <nav aria-label="Breadcrumb" class="town-hero__crumbs">
        <router-link to="/">Home</router-link>
        <span aria-hidden="true">/</span>
        <router-link to="/#service-area">Service area</router-link>
      </nav>
      <h1 id="town-title" class="display-1">Home watch in {{ town.name }}, NM</h1>
      <p class="town-hero__meta">
        <v-icon :icon="mdiMapMarker" size="20" />
        {{ formatFeet(town.elevationFt) }} elevation,
        {{ town.onLoop ? `on the ${areas.loop.name}` : 'just off the Enchanted Circle' }}
      </p>
      <v-btn color="accent" size="x-large" class="tw:self-start" @click="openContact()">{{ site.cta.primary }}</v-btn>
    </div>
  </section>

  <section class="section" aria-labelledby="watch-title">
    <div class="shell tw:grid tw:gap-12 tw:lg:grid-cols-2">
      <div class="tw:flex tw:flex-col tw:gap-5">
        <h2 id="watch-title" class="display-2">What we watch for in {{ town.name }}</h2>
        <p class="lede muted measure">{{ town.intro }}</p>
      </div>
      <ul class="watch-list">
        <li v-for="item in town.watchFor" :key="item">{{ item }}</li>
      </ul>
    </div>
  </section>

  <PlansSection :show-add-ons="false" :heading="`Plans for ${town.name} homes`" />

  <section class="section others" aria-labelledby="others-title">
    <div class="shell tw:flex tw:flex-col tw:gap-6">
      <h2 id="others-title" class="display-3">We also cover</h2>
      <ul class="tw:flex tw:flex-wrap tw:gap-3 others__list">
        <li v-for="other in otherTowns" :key="other.slug">
          <v-btn :to="`/service-areas/${other.slug}`" variant="outlined" color="ridge">{{ other.name }}</v-btn>
        </li>
      </ul>
    </div>
  </section>

  <CtaBand :heading="`Away from your ${town.name} home? We'll keep an eye on it.`" />
</template>

<style scoped>
.town-hero {
  position: relative;
  isolation: isolate;
  min-height: max(520px, 70svh);
  display: flex;
  align-items: flex-end;
  color: #fff;
  background: rgb(var(--v-theme-ridge));
  overflow: hidden;
}

.town-hero__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.town-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(to top, rgba(var(--v-theme-ridge), 0.92) 0%, rgba(var(--v-theme-ridge), 0.3) 60%),
    linear-gradient(to bottom, rgba(var(--v-theme-ridge), 0.55) 0%, transparent 25%);
}

.town-hero__inner {
  padding-top: 140px;
  padding-bottom: clamp(40px, 6vw, 72px);
}

.town-hero__inner h1 {
  max-width: 14em;
}

.town-hero__crumbs {
  display: flex;
  gap: 8px;
  font-size: var(--step--1);
  opacity: 0.85;
}

.town-hero__crumbs a {
  text-decoration: none;
}

.town-hero__crumbs a:hover {
  text-decoration: underline;
}

.town-hero__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.9;
}

.watch-list {
  list-style: none;
  display: grid;
  gap: 0;
  align-self: start;
}

.watch-list li {
  padding: 18px 0 18px 32px;
  position: relative;
  font-size: var(--step-1);
  line-height: 1.4;
  border-bottom: 1px solid rgba(var(--v-theme-ridge), 0.12);
}

.watch-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 1.45em;
  width: 16px;
  height: 3px;
  background: rgb(var(--v-theme-accent));
}

.others {
  padding-top: 0;
}

.others__list {
  list-style: none;
}
</style>
