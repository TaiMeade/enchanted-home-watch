<script setup>
import steps from '@/data/process.json'
import site from '@/data/site.json'
import { useContactDialog } from '@/composables/useContactDialog'

const { openContact } = useContactDialog()
</script>

<template>
  <section id="how-it-works" class="section how frame" aria-labelledby="how-title">
    <div class="shell tw:flex tw:flex-col tw:gap-14">
      <div class="tw:flex tw:flex-col tw:gap-6 tw:md:flex-row tw:md:items-end tw:md:justify-between">
        <h2 id="how-title" class="display-2 how__title">From first call to first report in about a week.</h2>
        <v-btn color="forest" size="x-large" class="tw:self-start tw:md:self-auto" @click="openContact()">
          {{ site.cta.primary }}
        </v-btn>
      </div>

      <ol class="how__steps tw:grid tw:gap-10 tw:md:grid-cols-3 tw:md:gap-8">
        <li v-for="(step, i) in steps" :key="step.title" class="how__step tw:flex tw:flex-col tw:gap-3">
          <span class="how__num" aria-hidden="true">{{ i + 1 }}</span>
          <h3 class="how__step-title">{{ step.title }}</h3>
          <p class="muted">{{ step.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.how {
  background: rgb(var(--v-theme-surface));
}

.how__title {
  max-width: 14em;
}

.how__steps {
  list-style: none;
}

.how__step {
  position: relative;
}

/* Connecting line between the numbered steps on wide screens */
@media (min-width: 768px) {
  .how__step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 24px;
    left: 64px;
    right: -16px;
    height: 2px;
    background: linear-gradient(90deg, rgba(var(--v-theme-accent), 0.8), rgba(var(--v-theme-accent), 0.15));
  }
}

.how__num {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  border-radius: 50%;
  font-size: 1.125rem;
  font-weight: 800;
  color: rgb(var(--v-theme-on-accent));
  background: rgb(var(--v-theme-accent));
  box-shadow: 0 0 0 6px rgba(var(--v-theme-accent), 0.18);
}

.how__step-title {
  font-size: var(--step-2);
}
</style>
