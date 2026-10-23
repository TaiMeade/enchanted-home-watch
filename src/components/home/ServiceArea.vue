<script setup>
import { ref } from 'vue'
import { mdiArrowTopRight } from '@mdi/js'
import CircleMap from './CircleMap.vue'
import areas from '@/data/areas.json'
import { formatFeet } from '@/lib/format'

const activeSlug = ref(null)
</script>

<template>
  <section id="service-area" class="area frame" aria-labelledby="area-title">
    <div class="shell section tw:grid tw:gap-14 tw:lg:grid-cols-[5fr_7fr] tw:items-center">
      <div class="tw:flex tw:flex-col tw:gap-6">
        <h2 id="area-title" class="display-2">The whole {{ areas.loop.miles }}&#8209;mile loop, and the valleys off it.</h2>
        <p class="lede area__lede">
          We're based in Taos and drive the Enchanted Circle every week, from the adobe neighborhoods in town to the
          cabins above 9,000 feet. Pick your town to see what we watch for there.
        </p>

        <ul class="area__towns tw:grid tw:grid-cols-2 tw:gap-2">
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
              <span class="tw:flex tw:flex-col">
                <span class="area__town-name">{{ town.name }}</span>
                <span class="area__town-elev">{{ formatFeet(town.elevationFt) }}</span>
              </span>
              <v-icon :icon="mdiArrowTopRight" size="18" class="area__town-arrow" />
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
  /* Last light over the Sangre de Cristos, fading into the forest */
  background:
    radial-gradient(70% 55% at 85% 10%, rgba(var(--v-theme-accent), 0.22) 0%, transparent 70%),
    radial-gradient(60% 50% at 0% 100%, rgba(var(--v-theme-primary), 0.35) 0%, transparent 70%),
    rgb(var(--v-theme-forest));
}

.area__lede {
  color: rgba(255, 255, 255, 0.78);
  max-width: 34rem;
}

.area__towns {
  list-style: none;
  margin-top: 8px;
}

.area__town {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  text-decoration: none;
  background: rgb(255 255 255 / 0.06);
  border: 1px solid rgb(255 255 255 / 0.08);
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.area__town-name {
  font-weight: 700;
  letter-spacing: -0.015em;
}

.area__town-elev {
  font-size: 0.8rem;
  opacity: 0.6;
}

.area__town-arrow {
  flex-shrink: 0;
  opacity: 0.4;
  transition:
    opacity 0.2s,
    transform 0.2s var(--ease-out);
}

.area__town:hover,
.area__town--active {
  background: rgb(255 255 255 / 0.12);
  border-color: rgba(var(--v-theme-accent), 0.6);
}

.area__town:hover .area__town-arrow,
.area__town--active .area__town-arrow {
  opacity: 1;
  color: rgb(var(--v-theme-gold-soft));
  transform: translate(2px, -2px);
}

@media (max-width: 479px) {
  .area__town {
    padding: 10px 14px;
  }

  .area__town-arrow {
    display: none;
  }
}

.area__map {
  max-width: 620px;
  width: 100%;
  justify-self: center;
}
</style>
