<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { mdiPause, mdiPlay } from '@mdi/js'
import gallery from '@/data/gallery.json'
import site from '@/data/site.json'
import { usePhoto } from '@/composables/usePhotos'
import { useContactDialog } from '@/composables/useContactDialog'

const ADVANCE_MS = 7000

const { openContact } = useContactDialog()
const slides = gallery.map((item) => ({ ...item, ...usePhoto(item.image) }))

const active = ref(0)
const playing = ref(false)
let timer = null

const current = computed(() => slides[active.value])

function show(index) {
  active.value = (index + slides.length) % slides.length
}

function start() {
  stop()
  playing.value = true
  timer = setInterval(() => show(active.value + 1), ADVANCE_MS)
}

function stop() {
  playing.value = false
  clearInterval(timer)
}

function choose(index) {
  show(index)
  stop()
}

onMounted(() => {
  // Auto-advance only for people who haven't asked for reduced motion.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start()
})
onBeforeUnmount(stop)
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__photos">
      <img
        v-for="(slide, i) in slides"
        :key="slide.image"
        :src="slide.src"
        :srcset="slide.srcset"
        sizes="100vw"
        :alt="i === active ? slide.alt : ''"
        :aria-hidden="i !== active"
        :loading="i === 0 ? 'eager' : 'lazy'"
        :fetchpriority="i === 0 ? 'high' : 'auto'"
        class="hero__photo"
        :class="{ 'hero__photo--active': i === active }"
      />
    </div>

    <div class="shell hero__content">
      <div class="hero__copy">
        <h1 id="hero-title" class="display-1">We check on your mountain home while you're away.</h1>
        <p class="lede hero__lede">
          Scheduled walkthroughs, photo reports and storm checks for second homes in Taos, Angel Fire, Red River and
          across the Enchanted Circle.
        </p>
        <div class="hero__actions">
          <v-btn color="accent" size="x-large" @click="openContact()">{{ site.cta.primary }}</v-btn>
          <v-btn variant="outlined" size="x-large" color="white" to="/#plans">Compare plans</v-btn>
        </div>
      </div>

      <div class="hero__gallery">
        <p class="hero__caption" aria-live="polite">{{ current.caption }}</p>
        <div class="hero__thumbs">
          <button
            v-for="(slide, i) in slides"
            :key="slide.image"
            type="button"
            class="hero__thumb"
            :class="{ 'hero__thumb--active': i === active }"
            :aria-label="`Show photo: ${slide.caption}`"
            :aria-pressed="i === active"
            @click="choose(i)"
          >
            <img :src="slide.small" alt="" loading="lazy" />
          </button>
          <v-btn
            :icon="playing ? mdiPause : mdiPlay"
            variant="text"
            color="white"
            size="small"
            :aria-label="playing ? 'Pause slideshow' : 'Play slideshow'"
            @click="playing ? stop() : start()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: max(640px, 92svh);
  display: flex;
  align-items: flex-end;
  color: #fff;
  background: rgb(var(--v-theme-ridge));
  overflow: hidden;
  isolation: isolate;
}

.hero__photos {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.04);
  transition:
    opacity 1.4s var(--ease-out),
    transform 8s linear;
}

.hero__photo--active {
  opacity: 1;
  transform: scale(1);
}

/* Night-ridge shade rising from the bottom-left keeps the headline legible on any photo. */
.hero__photos::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(var(--v-theme-ridge), 0.92) 0%, rgba(var(--v-theme-ridge), 0.45) 45%, transparent 75%),
    linear-gradient(100deg, rgba(var(--v-theme-ridge), 0.55) 0%, transparent 60%),
    linear-gradient(to bottom, rgba(var(--v-theme-ridge), 0.5) 0%, transparent 18%);
}

.hero__content {
  display: grid;
  gap: 40px;
  padding-top: 140px;
  padding-bottom: clamp(32px, 6vw, 64px);
}

.hero__copy {
  max-width: 17em;
  font-size: var(--step-5);
}

.hero__copy h1 {
  font-size: inherit;
}

.hero__lede {
  max-width: 34rem;
  margin-top: 20px;
  opacity: 0.92;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.hero__gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: end;
}

.hero__caption {
  font-size: var(--step--1);
  opacity: 0.85;
}

.hero__thumbs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero__thumb {
  width: 64px;
  height: 44px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  background: none;
  transition:
    opacity 0.2s,
    border-color 0.2s;
}

.hero__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__thumb:hover,
.hero__thumb--active {
  opacity: 1;
}

.hero__thumb--active {
  border-color: rgb(var(--v-theme-aspen));
}

@media (min-width: 960px) {
  .hero__content {
    grid-template-columns: 1fr auto;
    align-items: end;
  }

  .hero__gallery {
    align-items: flex-end;
  }
}

@media (max-width: 599px) {
  .hero__actions :deep(.v-btn) {
    flex: 1 1 100%;
  }
}
</style>
