<script setup>
import faq from '@/data/faq.json'
import site from '@/data/site.json'
</script>

<template>
  <section id="faq" class="section" aria-labelledby="faq-title">
    <div class="shell tw:grid tw:gap-10 tw:lg:grid-cols-[2fr_3fr] tw:items-start">
      <div class="faq__intro tw:flex tw:flex-col tw:gap-4">
        <h2 id="faq-title" class="display-2">Questions owners ask first.</h2>
        <p class="muted">
          Something else on your mind? Call
          <a :href="`tel:${site.contact.phoneE164}`" class="faq__link tw:whitespace-nowrap">{{ site.contact.phone }}</a>
          or email
          <a :href="`mailto:${site.contact.email}`" class="faq__link">{{ site.contact.email }}</a>.
        </p>
      </div>

      <v-expansion-panels class="faq__panels" variant="default" :flat="true">
        <v-expansion-panel v-for="item in faq" :key="item.q" class="faq__panel" bg-color="surface">
          <v-expansion-panel-title>
            <h3 class="faq__q">{{ item.q }}</h3>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="faq__a">{{ item.a }}</v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 1024px) {
  .faq__intro {
    position: sticky;
    top: 120px;
  }
}

.faq__link {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  text-underline-offset: 3px;
  overflow-wrap: anywhere;
}

.faq__panels {
  gap: 10px;
}

.faq__panels :deep(.faq__panel) {
  margin: 0 !important;
  border-radius: var(--radius-md) !important;
  border: var(--hairline);
}

.faq__panels :deep(.faq__panel::after) {
  display: none;
}

.faq__panels :deep(.v-expansion-panel-title) {
  padding: 20px 24px;
  border-radius: var(--radius-md);
}

.faq__panels :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 24px 22px;
}

.faq__panels :deep(.v-expansion-panel--active) {
  box-shadow: var(--shadow-soft);
}

.faq__q {
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.faq__a {
  color: rgb(var(--v-theme-muted));
  max-width: 62ch;
}
</style>
