<script setup>
import { computed } from 'vue'
import { mdiCheck } from '@mdi/js'
import { formatPrice } from '@/lib/format'

const props = defineProps({
  plan: { type: Object, required: true },
  billing: { type: String, default: 'monthly' },
})
defineEmits(['choose'])

const price = computed(() => (props.billing === 'annual' ? props.plan.annualMonthly : props.plan.monthly))
</script>

<template>
  <article
    class="plan tw:flex tw:flex-col tw:gap-5"
    :class="{ 'plan--featured': plan.featured }"
    :style="{ '--tier': plan.color }"
    :aria-labelledby="`plan-${plan.id}`"
  >
    <header class="tw:flex tw:flex-col tw:gap-1">
      <div class="tw:flex tw:items-center tw:justify-between tw:gap-3">
        <h3 :id="`plan-${plan.id}`" class="plan__name">{{ plan.name }}</h3>
        <span v-if="plan.badge" class="plan__badge">{{ plan.badge }}</span>
      </div>
      <p class="plan__cadence">{{ plan.cadence }}</p>
    </header>

    <p class="plan__price">
      <span class="plan__amount">{{ formatPrice(price) }}</span>
      <span class="plan__per">/ month</span>
      <span v-if="billing === 'annual'" class="plan__billed">Billed {{ formatPrice(plan.annualTotal) }} a year</span>
    </p>

    <p class="plan__summary">{{ plan.summary }}</p>

    <div class="tw:flex tw:flex-col tw:gap-3 tw:grow">
      <p v-if="plan.includesLabel" class="plan__includes">{{ plan.includesLabel }}:</p>
      <ul class="plan__features tw:flex tw:flex-col tw:gap-3">
        <li v-for="feature in plan.features" :key="feature" class="tw:flex tw:gap-3">
          <v-icon :icon="mdiCheck" size="20" class="plan__check" />
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>

    <v-btn
      :color="plan.featured ? 'accent' : 'ridge'"
      :variant="plan.featured ? 'flat' : 'outlined'"
      size="large"
      block
      @click="$emit('choose', plan.id)"
    >
      Choose {{ plan.name }}
    </v-btn>
  </article>
</template>

<style scoped>
.plan {
  position: relative;
  padding: 32px 28px 28px;
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid rgba(var(--v-theme-ridge), 0.1);
  overflow: hidden;
}

/* The tier's metal shows as a band across the top of the card. */
.plan::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 6px;
  background: linear-gradient(90deg, var(--tier), color-mix(in srgb, var(--tier) 55%, #fff), var(--tier));
}

.plan--featured {
  color: #fff;
  background: rgb(var(--v-theme-ridge));
  border-color: transparent;
  box-shadow: 0 30px 60px -30px rgba(var(--v-theme-ridge), 0.6);
}

.plan__name {
  font-size: var(--step-3);
  color: color-mix(in srgb, var(--tier) 70%, rgb(var(--v-theme-ridge)));
}

.plan--featured .plan__name {
  color: var(--tier);
}

.plan__badge {
  font-size: var(--step--1);
  font-weight: 600;
  padding: 3px 12px;
  border-radius: 999px;
  color: rgb(var(--v-theme-ridge));
  background: rgb(var(--v-theme-aspen));
}

.plan__cadence {
  font-weight: 600;
}

.plan__price {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 6px;
}

.plan__amount {
  font-family: var(--type-display);
  font-size: var(--step-4);
  font-weight: 700;
  line-height: 1;
}

.plan__per,
.plan__billed {
  font-size: var(--step--1);
  opacity: 0.75;
}

.plan__billed {
  flex-basis: 100%;
}

.plan__summary {
  opacity: 0.8;
  padding-bottom: 20px;
  border-bottom: 1px solid currentColor;
  border-bottom-color: rgba(var(--v-theme-ridge), 0.12);
}

.plan--featured .plan__summary {
  border-bottom-color: rgb(255 255 255 / 0.16);
}

.plan__includes {
  font-weight: 600;
}

.plan__features {
  list-style: none;
  line-height: 1.45;
}

.plan__check {
  flex: none;
  margin-top: 1px;
  color: rgb(var(--v-theme-primary));
}

.plan--featured .plan__check {
  color: rgb(var(--v-theme-aspen));
}
</style>
