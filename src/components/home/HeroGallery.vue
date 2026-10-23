<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { mdiCheck, mdiPause, mdiPlay } from '@mdi/js'
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
  <section class="hero frame" aria-labelledby="hero-title" :style="{ '--advance': `${ADVANCE_MS}ms` }">
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
        <ul class="hero__highlights">
          <li v-for="item in site.highlights" :key="item">
            <v-icon :icon="mdiCheck" size="16" />
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="hero__gallery">
        <p class="hero__caption" aria-live="polite">{{ current.caption }}</p>
        <div class="hero__thumbs">
          <button
            v-for="(slide, i) in slides"
            :key="slide.image"
            type="button"
            class="hero__thumb"
            :class="{ 'hero__thumb--active': i === active, 'hero__thumb--playing': i === active && playing }"
            :aria-label="`Show photo: ${slide.caption}`"
            :aria-pressed="i === active"
            @click="choose(i)"
          >
            <img :src="slide.small" alt="" loading="lazy" />
            <span :key="`${active}-${playing}`" class="hero__progress" aria-hidden="true" />
          </button>
          <v-btn
            :icon="playing ? mdiPause : mdiPlay"
            variant="tonal"
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
  margin-top: var(--frame-inset);
  min-height: max(660px, calc(100svh - var(--frame-inset) * 2));
  display: flex;
  align-items: flex-end;
  color: #fff;
  background: rgb(var(--v-theme-forest));
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
  transform: scale(1.05);
  transition:
    opacity 1.4s var(--ease-out),
    transform 9s linear;
}

.hero__photo--active {
  opacity: 1;
  transform: scale(1);
}

/* Forest shade rising from the bottom-left keeps the headline legible on any photo. */
.hero__photos::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(var(--v-theme-forest-deep), 0.9) 0%, rgba(var(--v-theme-forest-deep), 0.4) 42%, transparent 72%),
    linear-gradient(100deg, rgba(var(--v-theme-forest-deep), 0.5) 0%, transparent 55%),
    linear-gradient(to bottom, rgba(var(--v-theme-forest-deep), 0.45) 0%, transparent 20%);
}

.hero__content {
  display: grid;
  gap: 40px;
  padding-top: 160px;
  padding-bottom: clamp(32px, 5vw, 56px);
}

.hero__copy {
  max-width: 14.5em;
  font-size: var(--step-5);
}

.hero__copy h1 {
  font-size: inherit;
}

.hero__lede {
  max-width: 34rem;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.86);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 36px;
}

.hero__highlights {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  margin-top: 28px;
  font-size: var(--step--1);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.82);
}

.hero__highlights li {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.hero__highlights :deep(.v-icon) {
  color: rgb(var(--v-theme-gold-soft));
}

.hero__gallery {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: end;
}

.hero__caption {
  font-size: var(--step--1);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.78);
}

.hero__thumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 20px;
  background: rgba(var(--v-theme-forest-deep), 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  align-self: flex-start;
}

.hero__thumb {
  position: relative;
  width: 64px;
  height: 46px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.55;
  background: none;
  transition: opacity 0.2s;
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

/* Gold bar under the current photo; it fills while the slideshow plays. */
.hero__progress {
  position: absolute;
  left: 6px;
  right: 6px;
  bottom: 5px;
  height: 3px;
  border-radius: 3px;
  background: rgb(var(--v-theme-accent));
  transform-origin: left;
  transform: scaleX(0);
}

.hero__thumb--active .hero__progress {
  transform: scaleX(1);
}

.hero__thumb--playing .hero__progress {
  animation: hero-progress var(--advance) linear forwards;
}

@keyframes hero-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (min-width: 960px) {
  .hero__content {
    grid-template-columns: 1fr auto;
    align-items: end;
  }

  .hero__gallery {
    align-items: flex-end;
  }

  .hero__thumbs {
    align-self: flex-end;
  }
}

@media (max-width: 599px) {
  .hero__actions :deep(.v-btn) {
    flex: 1 1 100%;
  }

  .hero__thumb {
    width: 56px;
    height: 40px;
  }
}
</style>
