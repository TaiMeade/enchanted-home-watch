<script setup>
import { ref, watch } from 'vue'
import { mdiClose, mdiCheckCircle } from '@mdi/js'
import ContactForm from './ContactForm.vue'
import { useContactDialog } from '@/composables/useContactDialog'
import site from '@/data/site.json'

const { isOpen, preselectedService, closeContact } = useContactDialog()
const sent = ref(false)

// Show the form again the next time the dialog opens.
watch(isOpen, (open) => {
  if (open) sent.value = false
})
</script>

<template>
  <v-dialog v-model="isOpen" max-width="620" scrollable aria-labelledby="contact-title">
    <v-card class="contact" rounded="xl">
      <div class="contact__head">
        <div>
          <h2 id="contact-title" class="contact__title">{{ sent ? 'Request sent' : site.cta.primary }}</h2>
          <p v-if="!sent" class="contact__sub">
            Tell us a little about the home. We'll set up a time to walk it with you, in person or on video.
          </p>
        </div>
        <v-btn :icon="mdiClose" variant="text" aria-label="Close" @click="closeContact" />
      </div>

      <v-card-text class="contact__body">
        <div v-if="sent" class="contact__done" role="status">
          <v-icon :icon="mdiCheckCircle" color="success" size="48" />
          <p class="lede">Thanks. {{ site.contact.responseTime }}</p>
          <p class="muted">
            Need us sooner? Call <a :href="`tel:${site.contact.phoneE164}`">{{ site.contact.phone }}</a>.
          </p>
          <v-btn color="forest" variant="tonal" @click="closeContact">Close</v-btn>
        </div>
        <ContactForm v-else :service="preselectedService" @sent="sent = true" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.contact__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 28px 20px 8px 28px;
}

.contact__title {
  font-size: var(--step-3);
}

.contact__sub {
  margin-top: 6px;
  color: rgb(var(--v-theme-muted));
}

.contact__body {
  padding: 20px 28px 28px !important;
}

@media (max-width: 599px) {
  .contact__head {
    gap: 8px;
    padding: 22px 10px 4px 22px;
  }

  .contact__body {
    padding: 16px 22px 22px !important;
  }
}

.contact__done {
  display: grid;
  justify-items: start;
  gap: 16px;
}
</style>
