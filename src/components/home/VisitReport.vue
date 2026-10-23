<script setup>
import { mdiCheckCircle, mdiAlertCircle, mdiWeatherSnowy, mdiSend } from '@mdi/js'
import report from '@/data/sample-report.json'
import { usePhoto } from '@/composables/usePhotos'

const photos = report.photos.map((slug) => usePhoto(slug))
const flagged = report.checks.filter((c) => c.status === 'flag').length
</script>

<template>
  <section class="section visit" aria-labelledby="visit-title">
    <div class="shell tw:grid tw:gap-14 tw:lg:grid-cols-2 tw:lg:gap-20 tw:items-center">
      <div class="tw:flex tw:flex-col tw:gap-6 visit__copy">
        <h2 id="visit-title" class="display-2">Every visit ends with a report you can read in a minute.</h2>
        <p class="lede muted">
          Snow, wind and deep cold are hard on an empty house. A pipe that freezes on Tuesday can flood a floor by
          Friday. We catch small problems before they become insurance claims, and we show you exactly what we saw.
        </p>
        <ul class="visit__points">
          <li>
            <strong>Inside</strong>
            <span>Plumbing, heat, appliances, smoke and CO detectors, signs of pests or entry</span>
          </li>
          <li>
            <strong>Outside</strong>
            <span>Roof, gutters and canales, doors, windows, decks, snow and storm damage</span>
          </li>
          <li>
            <strong>Photos</strong>
            <span>Time-stamped pictures of anything that needs your attention</span>
          </li>
        </ul>
      </div>

      <div class="report-wrap">
        <article class="report" aria-label="Sample visit report">
          <header class="report__head">
            <div>
              <p class="report__kicker">Visit report</p>
              <h3 class="report__property">{{ report.property }}</h3>
              <p class="report__when">{{ report.date }}, {{ report.time }}</p>
            </div>
            <p class="report__weather">
              <v-icon :icon="mdiWeatherSnowy" size="18" />
              {{ report.conditions }}
            </p>
          </header>

          <ul class="report__checks">
            <li
              v-for="check in report.checks"
              :key="check.label"
              class="report__check"
              :class="`report__check--${check.status}`"
            >
              <v-icon
                :icon="check.status === 'ok' ? mdiCheckCircle : mdiAlertCircle"
                size="20"
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

        <p class="report-wrap__sent" aria-hidden="true">
          <v-icon :icon="mdiSend" size="16" />
          Sent to the owner at {{ report.sentAt }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.visit__copy {
  max-width: 36rem;
}

.visit__points {
  list-style: none;
  display: grid;
  gap: 4px;
  margin-top: 8px;
}

.visit__points li {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 16px;
  padding: 14px 0;
  border-top: var(--hairline);
}

.visit__points strong {
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}

.report-wrap {
  position: relative;
  justify-self: center;
  width: 100%;
  max-width: 500px;
  padding: clamp(16px, 3vw, 32px);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(80% 70% at 100% 0%, rgba(var(--v-theme-accent), 0.22), transparent 70%),
    rgb(var(--v-theme-sage));
}

.report {
  background: rgb(var(--v-theme-surface));
  border-radius: var(--radius-lg);
  padding: clamp(20px, 3vw, 28px);
  box-shadow: var(--shadow-lift);
}

.report-wrap__sent {
  position: absolute;
  right: clamp(8px, 2vw, 20px);
  bottom: -18px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: var(--step--1);
  font-weight: 700;
  color: #fff;
  background: rgb(var(--v-theme-forest));
  box-shadow: var(--shadow-soft);
}

.report__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: var(--hairline);
}

.report__kicker {
  font-size: var(--step--1);
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}

.report__property {
  font-size: var(--step-1);
  margin-top: 2px;
  letter-spacing: -0.02em;
}

.report__when {
  font-size: var(--step--1);
  color: rgb(var(--v-theme-muted));
}

.report__weather {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgb(var(--v-theme-sage));
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
  grid-template-columns: 20px 1fr;
  gap: 12px;
  align-items: start;
  line-height: 1.45;
  font-size: 0.95rem;
}

.report__check--ok :deep(.v-icon) {
  color: rgb(var(--v-theme-success));
}

.report__check--flag {
  margin-inline: -12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  background: rgba(var(--v-theme-accent), 0.16);
}

.report__check--flag :deep(.v-icon) {
  color: rgb(var(--v-theme-warning));
}

.report__note {
  display: block;
  font-size: var(--step--1);
  color: rgb(var(--v-theme-muted));
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
  color: rgb(var(--v-theme-muted));
}

.report__summary {
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
}
</style>
