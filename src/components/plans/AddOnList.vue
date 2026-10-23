<script setup>
import { usePlans } from '@/composables/usePlans'
import { useContactDialog } from '@/composables/useContactDialog'
import { formatPrice } from '@/lib/format'

const { addOns } = usePlans()
const { openContact } = useContactDialog()

const priceLabel = (item) => (item.price == null ? 'Quoted' : formatPrice(item.price))
const unitLabel = (item) => (item.price == null ? `per ${item.unit}` : `/ ${item.unit}`)
</script>

<template>
  <div class="addons tw:grid tw:gap-10 tw:lg:grid-cols-[1fr_2fr] tw:items-start">
    <div class="tw:flex tw:flex-col tw:gap-4">
      <h3 class="display-3">Just need something once?</h3>
      <p class="muted">
        Book single services without a plan, or add them to one. Plan members get add-ons at the same price, with
        priority scheduling.
      </p>
      <v-btn variant="tonal" color="forest" class="tw:self-start tw:mt-2" @click="openContact('single-visit')">
        Ask about a one-time visit
      </v-btn>
    </div>

    <ul class="tw:grid tw:gap-3 tw:md:grid-cols-2">
      <li v-for="item in addOns" :key="item.id" class="addon">
        <div class="tw:flex tw:items-baseline tw:justify-between tw:gap-4">
          <h4 class="addon__name">{{ item.name }}</h4>
          <p class="addon__price">
            {{ priceLabel(item) }} <span class="addon__unit">{{ unitLabel(item) }}</span>
          </p>
        </div>
        <p class="addon__desc muted">{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.addons {
  padding: clamp(28px, 4vw, 48px);
  border-radius: var(--radius-xl);
  background: rgb(var(--v-theme-sage));
}

.addons ul {
  list-style: none;
}

.addon {
  padding: 18px 20px;
  border-radius: var(--radius-md);
  background: rgb(var(--v-theme-surface));
}

.addon__name {
  font-size: 1rem;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.addon__price {
  font-weight: 800;
  white-space: nowrap;
  color: rgb(var(--v-theme-primary));
}

.addon__unit {
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.75;
}

.addon__desc {
  margin-top: 4px;
  font-size: var(--step--1);
  line-height: 1.5;
}
</style>
