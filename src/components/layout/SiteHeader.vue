<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { mdiMenu, mdiClose } from '@mdi/js'
import BrandMark from '@/components/common/BrandMark.vue'
import { useContactDialog } from '@/composables/useContactDialog'
import site from '@/data/site.json'

const route = useRoute()
const { openContact } = useContactDialog()

const scrolled = ref(false)
const drawer = ref(false)

// Pages with a photo hero start with a dark glass bar that turns light on scroll.
const overPhoto = computed(() => !route.meta.solidHeader && !scrolled.value)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function openFromDrawer() {
  drawer.value = false
  openContact()
}
</script>

<template>
  <header class="site-header" :class="{ 'site-header--photo': overPhoto }">
    <div class="shell">
      <div class="site-header__bar">
        <router-link to="/" class="site-header__home" aria-label="Enchanted Home Watch, home">
          <BrandMark />
        </router-link>

        <nav class="site-header__nav" aria-label="Main">
          <router-link v-for="item in site.nav" :key="item.to" :to="item.to" class="site-header__link">
            {{ item.label }}
          </router-link>
        </nav>

        <div class="site-header__actions">
          <v-btn color="accent" class="site-header__cta" @click="openContact()">
            {{ site.cta.primary }}
          </v-btn>
          <v-btn
            class="site-header__menu"
            :icon="mdiMenu"
            variant="text"
            size="small"
            aria-label="Open menu"
            @click="drawer = true"
          />
        </div>
      </div>
    </div>
  </header>

  <v-navigation-drawer v-model="drawer" location="right" temporary width="320" color="forest">
    <div class="drawer">
      <v-btn :icon="mdiClose" variant="text" aria-label="Close menu" class="drawer__close" @click="drawer = false" />
      <nav aria-label="Mobile">
        <router-link
          v-for="item in site.nav"
          :key="item.to"
          :to="item.to"
          class="drawer__link"
          @click="drawer = false"
        >
          {{ item.label }}
        </router-link>
      </nav>
      <v-btn color="accent" size="x-large" block @click="openFromDrawer">{{ site.cta.primary }}</v-btn>
      <a class="drawer__phone" :href="`tel:${site.contact.phoneE164}`">{{ site.contact.phone }}</a>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: calc(var(--frame-inset) + 10px) 0 auto;
  z-index: 1006;
  pointer-events: none;
}

.site-header__bar {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
  padding-inline: 20px 10px;
  border-radius: 999px;
  color: rgb(var(--v-theme-on-background));
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(var(--v-theme-forest), 0.08);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  transition:
    background-color 0.35s var(--ease-out),
    color 0.35s var(--ease-out),
    border-color 0.35s var(--ease-out),
    box-shadow 0.35s var(--ease-out);
}

.site-header--photo .site-header__bar {
  color: #fff;
  background: rgba(var(--v-theme-forest-deep), 0.28);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: none;
}

.site-header__home {
  text-decoration: none;
  margin-right: auto;
}

.site-header__nav {
  display: none;
  gap: 4px;
}

.site-header__link {
  font-weight: 600;
  font-size: 0.93rem;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 999px;
  transition: background-color 0.2s;
}

.site-header__link:hover {
  background: rgba(var(--v-theme-forest), 0.07);
}

.site-header--photo .site-header__link:hover {
  background: rgba(255, 255, 255, 0.14);
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.site-header__cta {
  display: none;
}

@media (min-width: 960px) {
  .site-header__nav {
    display: flex;
  }

  .site-header__cta {
    display: inline-flex;
  }

  .site-header__menu {
    display: none;
  }
}

@media (max-width: 420px) {
  .site-header :deep(.brand__name) {
    font-size: 1rem;
  }
}

.drawer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 24px 32px;
  height: 100%;
}

.drawer__close {
  align-self: flex-end;
}

.drawer nav {
  margin-bottom: 24px;
}

.drawer__link {
  display: block;
  padding: 14px 0;
  font-size: var(--step-2);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;
  border-bottom: 1px solid rgb(255 255 255 / 0.1);
}

.drawer__phone {
  margin-top: 12px;
  text-align: center;
  opacity: 0.8;
}
</style>
