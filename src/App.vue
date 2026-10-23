<script setup>
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import ContactDialog from '@/components/contact/ContactDialog.vue'
</script>

<template>
  <v-app>
    <a class="skip-link" href="#main">Skip to content</a>
    <SiteHeader />
    <v-main id="main" tabindex="-1">
      <router-view />
    </v-main>
    <SiteFooter />
    <ContactDialog />
  </v-app>
</template>
