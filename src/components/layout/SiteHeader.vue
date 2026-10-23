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

// Pages with a photo hero start with a see-through header that turns solid on scroll.
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
    <div class="shell site-header__bar">
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
          aria-label="Open menu"
          @click="drawer = true"
        />
      </div>
    </div>
  </header>

  <v-navigation-drawer v-model="drawer" location="right" temporary width="300" color="ridge">
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
      <v-btn color="accent" size="large" block @click="openFromDrawer">{{ site.cta.primary }}</v-btn>
      <a class="drawer__phone" :href="`tel:${site.contact.phoneE164}`">{{ site.contact.phone }}</a>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 1006;
  color: rgb(var(--v-theme-ridge));
  background: rgba(var(--v-theme-background), 0.94);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 rgba(var(--v-theme-ridge), 0.08);
  transition:
    background-color 0.3s var(--ease-out),
    color 0.3s var(--ease-out),
    box-shadow 0.3s var(--ease-out);
}

.site-header--photo {
  color: #fff;
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
}

.site-header__bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 72px;
}

.site-header__home {
  text-decoration: none;
  margin-right: auto;
}

.site-header__nav {
  display: none;
  gap: 28px;
}

.site-header__link {
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  padding-block: 6px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

.site-header__link:hover {
  border-bottom-color: rgb(var(--v-theme-accent));
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
    font-size: 1.05rem;
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

.drawer__link {
  display: block;
  padding: 12px 0;
  font-family: var(--type-display);
  font-size: var(--step-2);
  text-decoration: none;
  border-bottom: 1px solid rgb(255 255 255 / 0.12);
}

.drawer nav {
  margin-bottom: 24px;
}

.drawer__phone {
  margin-top: 12px;
  text-align: center;
  opacity: 0.85;
}
</style>
