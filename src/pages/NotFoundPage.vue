<script setup>
import { useHead } from '@unhead/vue'
import site from '@/data/site.json'

useHead({
  title: `Page not found | ${site.name}`,
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <section class="section not-found">
    <div class="shell tw:flex tw:flex-col tw:gap-5 tw:items-start">
      <h1 class="display-2">That page isn't here.</h1>
      <p class="lede muted measure">
        The link may be old or mistyped. Head back to the home page to see our plans and service area.
      </p>
      <v-btn color="accent" size="large" to="/">Go to the home page</v-btn>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  padding-top: calc(72px + var(--section-space));
  min-height: 70svh;
}
</style>
