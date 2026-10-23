<script setup>
import faq from '@/data/faq.json'
import site from '@/data/site.json'
</script>

<template>
  <section id="faq" class="section" aria-labelledby="faq-title">
    <div class="shell tw:grid tw:gap-10 tw:lg:grid-cols-[2fr_3fr]">
      <div class="tw:flex tw:flex-col tw:gap-4">
        <h2 id="faq-title" class="display-2">Questions owners ask first.</h2>
        <p class="muted">
          Something else on your mind? Call
          <a :href="`tel:${site.contact.phoneE164}`" class="faq__link">{{ site.contact.phone }}</a>
          or email
          <a :href="`mailto:${site.contact.email}`" class="faq__link">{{ site.contact.email }}</a>.
        </p>
      </div>

      <v-expansion-panels class="faq__panels">
        <v-expansion-panel v-for="item in faq" :key="item.q" bg-color="transparent">
          <v-expansion-panel-title class="faq__q">
            <h3 class="faq__q-text">{{ item.q }}</h3>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="faq__a">{{ item.a }}</v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </section>
</template>

<style scoped>
.faq__link {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
  text-underline-offset: 3px;
  overflow-wrap: anywhere;
}

.faq__panels :deep(.v-expansion-panel) {
  border-bottom: 1px solid rgba(var(--v-theme-ridge), 0.12);
}

.faq__panels :deep(.v-expansion-panel-title) {
  padding: 20px 0;
}

.faq__panels :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 40px 24px 0;
}

.faq__q-text {
  font-size: var(--step-1);
  font-weight: 600;
}

.faq__a {
  color: rgb(var(--v-theme-stone));
  max-width: 62ch;
}
</style>
