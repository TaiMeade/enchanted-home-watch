<script setup>
import { ref } from 'vue'
import PlanCard from './PlanCard.vue'
import AddOnList from './AddOnList.vue'
import { usePlans } from '@/composables/usePlans'
import { useContactDialog } from '@/composables/useContactDialog'
import site from '@/data/site.json'

defineProps({
  // Area pages reuse the plans without the add-on price list.
  showAddOns: { type: Boolean, default: true },
  heading: { type: String, default: 'Pick how often we stop by.' },
})

const { plans, annualDiscountPercent } = usePlans()
const { openContact } = useContactDialog()
const billing = ref('monthly')
</script>

<template>
  <section id="plans" class="section plans" aria-labelledby="plans-title">
    <div class="shell">
      <div class="tw:flex tw:flex-col tw:gap-6 tw:md:flex-row tw:md:items-end tw:md:justify-between">
        <div class="tw:flex tw:flex-col tw:gap-4 measure">
          <h2 id="plans-title" class="display-2">{{ heading }}</h2>
          <p class="lede muted">
            Every plan includes a free walkthrough, a checklist written for your house and a photo report after every
            visit. Each tier adds to the one before it.
          </p>
        </div>

        <v-btn-toggle
          v-model="billing"
          mandatory
          rounded="pill"
          color="ridge"
          variant="outlined"
          density="comfortable"
          class="plans__toggle"
          aria-label="Billing period"
        >
          <v-btn value="monthly">Monthly</v-btn>
          <v-btn value="annual">Annual, save {{ annualDiscountPercent }}%</v-btn>
        </v-btn-toggle>
      </div>

      <div class="tw:grid tw:gap-6 tw:mt-12 tw:lg:grid-cols-3 tw:items-stretch">
        <PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" :billing="billing" @choose="openContact" />
      </div>

      <p class="plans__terms muted">
        {{ site.billing.terms }} We accept {{ site.billing.methods.join(', ').toLowerCase() }}.
      </p>

      <AddOnList v-if="showAddOns" class="tw:mt-20" />
    </div>
  </section>
</template>

<style scoped>
.plans {
  background:
    linear-gradient(to bottom, rgb(var(--v-theme-surface)) 0, rgb(var(--v-theme-background)) 100%);
}

.plans__toggle {
  flex: none;
  align-self: flex-start;
}

.plans__terms {
  margin-top: 24px;
  font-size: var(--step--1);
  text-align: center;
}
</style>
