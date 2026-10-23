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
  <section class="cta" aria-labelledby="cta-title">
    <img :src="photo.src" :srcset="photo.srcset" sizes="100vw" alt="" loading="lazy" class="cta__bg" />
    <div class="shell cta__inner tw:flex tw:flex-col tw:gap-6 tw:md:flex-row tw:md:items-end tw:md:justify-between">
      <div class="tw:flex tw:flex-col tw:gap-3">
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
  isolation: isolate;
  overflow: hidden;
  color: #fff;
  background: rgb(var(--v-theme-ridge));
  padding-block: clamp(80px, 12vw, 160px) clamp(48px, 6vw, 72px);
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
  background: linear-gradient(to top, rgba(var(--v-theme-ridge), 0.92) 10%, rgba(var(--v-theme-ridge), 0.35) 100%);
}

.cta__title {
  max-width: 16em;
}

.cta__lede {
  opacity: 0.88;
}
</style>
