<script setup>
import site from '@/data/site.json'
</script>

<template>
  <span class="brand">
    <svg class="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="3" class="brand__ring" />
      <path d="M9 34 L19.5 17.5 L24 24 L28.5 16.5 L39 34 Z" fill="currentColor" />
    </svg>
    <span class="brand__name">{{ site.name }}</span>
  </span>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.brand__mark {
  width: 34px;
  height: 34px;
  flex: none;
}

.brand__ring {
  stroke: rgb(var(--v-theme-accent));
}

.brand__name {
  font-family: var(--type-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.005em;
  white-space: nowrap;
}
</style>
