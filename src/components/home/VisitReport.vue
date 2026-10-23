<script setup>
import { mdiCheckCircle, mdiAlertCircle, mdiWeatherSnowy } from '@mdi/js'
import report from '@/data/sample-report.json'
import { usePhoto } from '@/composables/usePhotos'

const photos = report.photos.map((slug) => usePhoto(slug))
const flagged = report.checks.filter((c) => c.status === 'flag').length
</script>

<template>
  <section class="section visit" aria-labelledby="visit-title">
    <div class="shell visit__grid">
      <div class="visit__copy">
        <h2 id="visit-title" class="display-2">Every visit ends with a report you can read in a minute.</h2>
        <p class="lede muted">
          Snow, wind and deep cold are hard on an empty house. A pipe that freezes on Tuesday can flood a floor by
          Friday. We catch small problems before they become insurance claims, and we show you exactly what we saw.
        </p>
        <ul class="visit__points">
          <li>Inside: plumbing, heat, appliances, smoke and CO detectors, signs of pests or entry</li>
          <li>Outside: roof, gutters and canales, doors, windows, decks, snow and storm damage</li>
          <li>Time-stamped photos of anything that needs your attention</li>
        </ul>
      </div>

      <article class="report" aria-label="Sample visit report">
        <header class="report__head">
          <div>
            <p class="report__kicker">Visit report</p>
            <h3 class="report__property">{{ report.property }}</h3>
            <p class="report__when">{{ report.date }}, {{ report.time }}</p>
          </div>
          <p class="report__weather">
            <v-icon :icon="mdiWeatherSnowy" size="20" />
            {{ report.conditions }}
          </p>
        </header>

        <ul class="report__checks">
          <li v-for="check in report.checks" :key="check.label" class="report__check" :class="`report__check--${check.status}`">
            <v-icon
              :icon="check.status === 'ok' ? mdiCheckCircle : mdiAlertCircle"
              size="22"
              :aria-label="check.status === 'ok' ? 'Looks good' : 'Needs attention'"
            />
            <span>
              {{ check.label }}
              <span v-if="check.note" class="report__note">{{ check.note }}</span>
            </span>
          </li>
        </ul>

        <div class="report__photos">
          <img v-for="(photo, i) in photos" :key="i" :src="photo.small" alt="" loading="lazy" />
        </div>

        <footer class="report__foot">
          <span>{{ report.signoff }}</span>
          <span class="report__summary">{{ report.checks.length - flagged }} clear, {{ flagged }} to watch</span>
        </footer>
      </article>
    </div>
  </section>
</template>

<style scoped>
.visit__grid {
  display: grid;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}

.visit__copy {
  display: grid;
  gap: 24px;
  max-width: 34rem;
}

.visit__points {
  list-style: none;
  display: grid;
  gap: 14px;
}

.visit__points li {
  position: relative;
  padding-left: 28px;
}

/* Small peak glyph as the bullet, echoing the brand mark */
.visit__points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45em;
  width: 14px;
  height: 10px;
  background: rgb(var(--v-theme-primary));
  clip-path: polygon(0 100%, 40% 0, 60% 45%, 75% 15%, 100% 100%);
}

.report {
  position: relative;
  background: #fff;
  border-radius: var(--radius-lg);
  padding: clamp(20px, 3vw, 32px);
  box-shadow:
    0 1px 2px rgba(var(--v-theme-ridge), 0.06),
    0 24px 48px -24px rgba(var(--v-theme-ridge), 0.28);
  border-top: 6px solid rgb(var(--v-theme-primary));
  max-width: 520px;
  justify-self: center;
  width: 100%;
}

.report__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px dashed rgba(var(--v-theme-ridge), 0.18);
}

.report__kicker {
  font-size: var(--step--1);
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.report__property {
  font-size: var(--step-1);
  margin-top: 2px;
}

.report__when {
  font-size: var(--step--1);
  color: rgb(var(--v-theme-stone));
}

.report__weather {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  font-size: var(--step--1);
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
}

.report__checks {
  list-style: none;
  display: grid;
  gap: 12px;
  padding-block: 20px;
}

.report__check {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 12px;
  align-items: start;
  line-height: 1.4;
}

.report__check--ok :deep(.v-icon) {
  color: rgb(var(--v-theme-success));
}

.report__check--flag {
  margin-inline: -12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: rgba(var(--v-theme-aspen), 0.14);
}

.report__check--flag :deep(.v-icon) {
  color: rgb(var(--v-theme-warning));
}

.report__note {
  display: block;
  font-size: var(--step--1);
  color: rgb(var(--v-theme-stone));
}

.report__photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.report__photos img {
  aspect-ratio: 4 / 3;
  width: 100%;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.report__foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin-top: 18px;
  font-size: var(--step--1);
  color: rgb(var(--v-theme-stone));
}

.report__summary {
  font-weight: 600;
  color: rgb(var(--v-theme-ridge));
}

@media (min-width: 960px) {
  .visit__grid {
    grid-template-columns: 1fr 1fr;
  }

  .report {
    transform: rotate(1.2deg);
  }
}
</style>
