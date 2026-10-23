<script setup>
import { ref } from 'vue'
import CircleMap from './CircleMap.vue'
import areas from '@/data/areas.json'
import { formatFeet } from '@/lib/format'

const activeSlug = ref(null)
</script>

<template>
  <section id="service-area" class="section area" aria-labelledby="area-title">
    <div class="shell tw:grid tw:gap-14 tw:lg:grid-cols-[5fr_7fr] tw:items-center">
      <div class="tw:flex tw:flex-col tw:gap-6">
        <h2 id="area-title" class="display-2">The whole {{ areas.loop.miles }}&#8209;mile loop, and the valleys off it.</h2>
        <p class="lede area__lede">
          We're based in Taos and drive the Enchanted Circle every week, from the adobe neighborhoods in town to the
          cabins above 9,000 feet. Pick your town to see what we watch for there.
        </p>

        <ul class="area__towns tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:gap-x-8">
          <li v-for="town in areas.towns" :key="town.slug">
            <router-link
              :to="`/service-areas/${town.slug}`"
              class="area__town"
              :class="{ 'area__town--active': activeSlug === town.slug }"
              @mouseenter="activeSlug = town.slug"
              @mouseleave="activeSlug = null"
              @focus="activeSlug = town.slug"
              @blur="activeSlug = null"
            >
              <span class="area__town-name">{{ town.name }}</span>
              <span class="area__town-elev">{{ formatFeet(town.elevationFt) }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="area__map">
        <CircleMap v-model:active-slug="activeSlug" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.area {
  color: rgb(var(--v-theme-background));
  /* Alpenglow fading into night: the Sangre de Cristos at last light */
  background:
    radial-gradient(120% 60% at 80% 0%, rgba(var(--v-theme-accent), 0.38) 0%, transparent 60%),
    linear-gradient(to bottom, rgb(var(--v-theme-ridge-soft)) 0%, rgb(var(--v-theme-ridge)) 55%);
  overflow: hidden;
}

.area__lede {
  opacity: 0.82;
  max-width: 34rem;
}

.area__towns {
  list-style: none;
}

.area__town {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 12px 0;
  text-decoration: none;
  border-bottom: 1px solid rgb(255 255 255 / 0.14);
  transition: color 0.2s;
}

.area__town-name {
  font-family: var(--type-display);
  font-size: var(--step-1);
  font-weight: 600;
}

.area__town-elev {
  font-size: var(--step--1);
  opacity: 0.6;
}

.area__town:hover,
.area__town--active {
  color: rgb(var(--v-theme-aspen));
}

.area__map {
  max-width: 620px;
  width: 100%;
  justify-self: center;
}
</style>
