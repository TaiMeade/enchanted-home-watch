<script setup>
import steps from '@/data/process.json'
import site from '@/data/site.json'
import { useContactDialog } from '@/composables/useContactDialog'

const { openContact } = useContactDialog()
</script>

<template>
  <section id="how-it-works" class="section how" aria-labelledby="how-title">
    <div class="shell tw:flex tw:flex-col tw:gap-14">
      <h2 id="how-title" class="display-2 measure">From first call to first report in about a week.</h2>

      <ol class="how__steps tw:grid tw:gap-10 tw:md:grid-cols-3 tw:md:gap-8">
        <li v-for="(step, i) in steps" :key="step.title" class="how__step tw:flex tw:flex-col tw:gap-3">
          <span class="how__num" aria-hidden="true">{{ i + 1 }}</span>
          <h3 class="how__title">{{ step.title }}</h3>
          <p class="muted">{{ step.body }}</p>
        </li>
      </ol>

      <v-btn color="accent" size="x-large" class="tw:self-start" @click="openContact()">{{ site.cta.primary }}</v-btn>
    </div>
  </section>
</template>

<style scoped>
.how__steps {
  list-style: none;
  counter-reset: none;
}

.how__step {
  position: relative;
  padding-top: 24px;
  border-top: 2px solid rgba(var(--v-theme-ridge), 0.14);
}

.how__num {
  font-family: var(--type-display);
  font-size: var(--step-5);
  font-weight: 700;
  line-height: 0.9;
  color: rgb(var(--v-theme-primary));
}

.how__title {
  font-size: var(--step-2);
}
</style>
