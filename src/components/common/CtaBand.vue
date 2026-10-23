<script setup>
import site from '@/data/site.json'
import { usePhoto } from '@/composables/usePhotos'
import { useContactDialog } from '@/composables/useContactDialog'

defineProps({
  heading: { type: String, default: "Leaving the mountains for the season? We'll keep an eye on the house." },
  serviceId: { type: String, default: null },
})

const { openContact } = useContactDialog()
const photo = usePhoto('winter-sunset')
</script>

<template>
  <section class="cta frame" aria-labelledby="cta-title">
    <img :src="photo.src" :srcset="photo.srcset" sizes="100vw" alt="" loading="lazy" class="cta__bg" />
    <div class="shell cta__inner tw:flex tw:flex-col tw:gap-8 tw:lg:flex-row tw:lg:items-end tw:lg:justify-between">
      <div class="tw:flex tw:flex-col tw:gap-5">
        <h2 id="cta-title" class="display-2 cta__title">{{ heading }}</h2>
        <p class="lede cta__lede">The walkthrough is free, and there's nothing to sign until you pick a plan.</p>
      </div>
      <div class="tw:flex tw:flex-wrap tw:gap-3 tw:shrink-0">
        <v-btn color="accent" size="x-large" @click="openContact(serviceId)">{{ site.cta.primary }}</v-btn>
        <v-btn variant="outlined" color="white" size="x-large" :href="`tel:${site.contact.phoneE164}`">
          Call {{ site.contact.phone }}
        </v-btn>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  color: #fff;
  background: rgb(var(--v-theme-forest));
  padding-block: clamp(96px, 12vw, 176px) clamp(40px, 5vw, 64px);
  margin-bottom: var(--frame-inset);
}

.cta__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(to top, rgba(var(--v-theme-forest-deep), 0.92) 15%, rgba(var(--v-theme-forest-deep), 0.25) 100%);
}

.cta__title {
  max-width: 15em;
}

.cta__lede {
  color: rgba(255, 255, 255, 0.82);
}
</style>
