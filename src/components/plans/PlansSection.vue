<script setup>
import { ref } from 'vue'
import PlanCard from './PlanCard.vue'
import AddOnList from './AddOnList.vue'
import { usePlans } from '@/composables/usePlans'
import { useContactDialog } from '@/composables/useContactDialog'
import site from '@/data/site.json'
import { sentenceList } from '@/lib/format'

defineProps({
  // Area pages reuse the plans without the add-on price list.
  showAddOns: { type: Boolean, default: true },
  heading: { type: String, default: 'Pick how often we stop by.' },
})

const { plans, annualDiscountPercent } = usePlans()
const { openContact } = useContactDialog()
const billing = ref('monthly')
const periods = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annual', label: 'Annual' },
]
</script>

<template>
  <section id="plans" class="section plans" aria-labelledby="plans-title">
    <div class="shell">
      <div class="tw:flex tw:flex-col tw:items-center tw:gap-6 tw:text-center">
        <h2 id="plans-title" class="display-2 measure">{{ heading }}</h2>
        <p class="lede muted measure">
          Every plan includes a free walkthrough, a checklist written for your house and a photo report after every
          visit. Each tier adds to the one before it.
        </p>

        <div class="billing" role="radiogroup" aria-label="Billing period">
          <button
            v-for="period in periods"
            :key="period.value"
            type="button"
            role="radio"
            class="billing__option"
            :class="{ 'billing__option--active': billing === period.value }"
            :aria-checked="billing === period.value"
            @click="billing = period.value"
          >
            {{ period.label }}
            <span v-if="period.value === 'annual'" class="billing__save">Save {{ annualDiscountPercent }}%</span>
          </button>
        </div>
      </div>

      <div class="tw:grid tw:gap-6 tw:mt-14 tw:lg:grid-cols-3 tw:items-start">
        <PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" :billing="billing" @choose="openContact" />
      </div>

      <p class="plans__terms muted">
        {{ site.billing.terms }} Pay by {{ sentenceList(site.billing.methods) }}.
      </p>

      <AddOnList v-if="showAddOns" class="tw:mt-20" />
    </div>
  </section>
</template>

<style scoped>
.billing {
  display: inline-flex;
  padding: 5px;
  border-radius: 999px;
  background: rgb(var(--v-theme-sage));
}

.billing__option {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 0.93rem;
  font-weight: 700;
  color: rgb(var(--v-theme-muted));
  background: transparent;
  cursor: pointer;
  transition:
    background-color 0.25s var(--ease-out),
    color 0.25s var(--ease-out),
    box-shadow 0.25s var(--ease-out);
}

.billing__option--active {
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
  box-shadow: var(--shadow-soft);
}

.billing__save {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 999px;
  color: rgb(var(--v-theme-on-accent));
  background: rgb(var(--v-theme-accent));
}

.plans__terms {
  margin-top: 28px;
  font-size: var(--step--1);
  text-align: center;
}
</style>
