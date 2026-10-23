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
    class="plan tw:flex tw:flex-col tw:gap-6"
    :class="{ 'plan--featured': plan.featured }"
    :style="{ '--tier': plan.color }"
    :aria-labelledby="`plan-${plan.id}`"
  >
    <header class="plan__head tw:flex tw:items-center tw:justify-between tw:gap-3">
      <div class="tw:flex tw:items-center tw:gap-3">
        <span class="plan__gem" aria-hidden="true" />
        <h3 :id="`plan-${plan.id}`" class="plan__name">{{ plan.name }}</h3>
      </div>
      <span v-if="plan.badge" class="plan__badge">{{ plan.badge }}</span>
    </header>

    <div class="tw:flex tw:flex-col tw:gap-2">
      <p class="plan__price">
        <span class="plan__amount">{{ formatPrice(price) }}</span>
        <span class="plan__per">/ month</span>
      </p>
      <p class="plan__cadence">
        {{ plan.cadence }}<template v-if="billing === 'annual'">, billed {{ formatPrice(plan.annualTotal) }} a year</template>
      </p>
    </div>

    <p class="plan__summary">{{ plan.summary }}</p>

    <v-btn
      :color="plan.featured ? 'accent' : 'forest'"
      :variant="plan.featured ? 'flat' : 'tonal'"
      size="large"
      block
      @click="$emit('choose', plan.id)"
    >
      Choose {{ plan.name }}
    </v-btn>

    <div class="plan__divider" aria-hidden="true" />

    <div class="tw:flex tw:flex-col tw:gap-4 tw:grow">
      <p v-if="plan.includesLabel" class="plan__includes">{{ plan.includesLabel }}:</p>
      <ul class="plan__features tw:flex tw:flex-col tw:gap-3">
        <li v-for="feature in plan.features" :key="feature" class="tw:flex tw:gap-3">
          <span class="plan__check"><v-icon :icon="mdiCheck" size="14" /></span>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.plan {
  position: relative;
  padding: 32px 28px;
  border-radius: var(--radius-lg);
  background: rgb(var(--v-theme-surface));
  border: var(--hairline);
  box-shadow: var(--shadow-soft);
}

.plan--featured {
  color: #fff;
  background:
    radial-gradient(120% 60% at 100% 0%, rgba(var(--v-theme-accent), 0.2), transparent 60%),
    rgb(var(--v-theme-forest));
  border-color: transparent;
  box-shadow: var(--shadow-lift);
}

/* Same height with or without the badge, so prices line up across cards */
.plan__head {
  min-height: 30px;
}

/* A small faceted gem in the tier's metal */
.plan__gem {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  transform: rotate(45deg);
  background: linear-gradient(135deg, color-mix(in srgb, var(--tier) 45%, #fff), var(--tier) 55%);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--tier) 22%, transparent);
}

.plan__name {
  font-size: var(--step-2);
  letter-spacing: -0.03em;
}

.plan__badge {
  font-size: 0.78rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  color: rgb(var(--v-theme-on-accent));
  background: rgb(var(--v-theme-accent));
}

.plan__price {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.plan__amount {
  font-size: var(--step-4);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1;
}

.plan__per {
  font-size: var(--step--1);
  font-weight: 600;
  opacity: 0.6;
}

.plan__cadence {
  font-size: var(--step--1);
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}

.plan--featured .plan__cadence {
  color: rgb(var(--v-theme-gold-soft));
}

.plan__summary {
  opacity: 0.75;
}

.plan__divider {
  height: 1px;
  background: rgba(var(--v-theme-forest), 0.1);
}

.plan--featured .plan__divider {
  background: rgb(255 255 255 / 0.14);
}

.plan__includes {
  font-size: var(--step--1);
  font-weight: 700;
  opacity: 0.7;
}

.plan__features {
  list-style: none;
  font-size: 0.95rem;
  line-height: 1.45;
}

.plan__check {
  flex: none;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-sage));
}

.plan--featured .plan__check {
  color: rgb(var(--v-theme-on-accent));
  background: rgb(var(--v-theme-accent));
}
</style>
