<script setup>
import { usePlans } from '@/composables/usePlans'
import { useContactDialog } from '@/composables/useContactDialog'
import { formatPrice } from '@/lib/format'

const { addOns } = usePlans()
const { openContact } = useContactDialog()

const priceLabel = (item) => (item.price == null ? 'Quoted' : `${formatPrice(item.price)} / ${item.unit}`)
</script>

<template>
  <div class="addons tw:grid tw:gap-10 tw:lg:grid-cols-[1fr_2fr]">
    <div class="tw:flex tw:flex-col tw:gap-4">
      <h3 class="display-3">Just need something once?</h3>
      <p class="muted">
        Book single services without a plan, or add them to one. Plan members get add-ons at the same price, with
        priority scheduling.
      </p>
      <v-btn variant="text" color="primary" class="tw:self-start tw:-ml-4" @click="openContact('single-visit')">
        Ask about a one-time visit
      </v-btn>
    </div>

    <dl class="addons__list tw:grid tw:gap-x-12 tw:md:grid-cols-2">
      <div v-for="item in addOns" :key="item.id" class="addons__item">
        <dt class="addons__row">
          <span class="addons__name">{{ item.name }}</span>
          <span class="addons__leader" aria-hidden="true" />
          <span class="addons__price">{{ priceLabel(item) }}</span>
        </dt>
        <dd class="addons__desc muted">{{ item.description }}</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.addons {
  padding-top: 56px;
  border-top: 1px solid rgba(var(--v-theme-ridge), 0.12);
}

.addons__list {
  margin: 0;
}

.addons__item {
  padding-block: 16px;
  border-bottom: 1px solid rgba(var(--v-theme-ridge), 0.08);
}

/* Lodge-menu style price list: name, dotted leader, price */
.addons__row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.addons__name {
  font-weight: 600;
}

.addons__leader {
  flex: 1;
  min-width: 16px;
  border-bottom: 2px dotted rgba(var(--v-theme-ridge), 0.25);
  transform: translateY(-4px);
}

.addons__price {
  font-family: var(--type-display);
  font-weight: 600;
  white-space: nowrap;
  color: rgb(var(--v-theme-primary));
}

.addons__desc {
  margin: 4px 0 0;
  font-size: var(--step--1);
}
</style>
