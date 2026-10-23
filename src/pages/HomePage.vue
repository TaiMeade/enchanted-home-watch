<script setup>
import HeroGallery from '@/components/home/HeroGallery.vue'
import VisitReport from '@/components/home/VisitReport.vue'
import PlansSection from '@/components/plans/PlansSection.vue'
import HowItWorks from '@/components/home/HowItWorks.vue'
import ServiceArea from '@/components/home/ServiceArea.vue'
import FaqSection from '@/components/home/FaqSection.vue'
import CtaBand from '@/components/common/CtaBand.vue'
import { useSeo } from '@/composables/useSeo'
import { businessSchema, faqSchema } from '@/lib/structuredData'

useSeo({
  path: '/',
  jsonLd: [businessSchema(), faqSchema()],
})
</script>

<template>
  <HeroGallery />
  <VisitReport />
  <PlansSection />
  <HowItWorks />
  <ServiceArea />
  <FaqSection />
  <CtaBand />
</template>
