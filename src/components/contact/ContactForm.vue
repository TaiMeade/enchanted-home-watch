<script setup>
import { ref, watch } from 'vue'
import site from '@/data/site.json'
import areas from '@/data/areas.json'
import { useEmailJS } from '@/composables/useEmailJS'
import { usePlans } from '@/composables/usePlans'

const props = defineProps({
  service: { type: String, default: null },
})
const emit = defineEmits(['sent'])

const { sendEmail, sending } = useEmailJS()
const { serviceOptions, serviceLabel } = usePlans()

const townOptions = [...areas.towns.map((t) => t.name), 'Somewhere else nearby']

const blank = () => ({
  name: '',
  email: '',
  phone: '',
  service: props.service ?? null,
  town: null,
  message: '',
  website: '', // honeypot: real people never see or fill this
})

const form = ref(blank())
const formRef = ref(null)
const failed = ref(false)

watch(
  () => props.service,
  (service) => {
    form.value.service = service
  },
)

const rules = {
  required: (label) => (v) => !!(v && String(v).trim()) || `Enter ${label}.`,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter an email like name@example.com.',
  phone: (v) => !v || /^[\d\s()+.-]{7,}$/.test(v) || 'Enter a phone number with area code, or leave it blank.',
}

async function submit() {
  failed.value = false
  const { valid } = await formRef.value.validate()
  if (!valid) return
  if (form.value.website) {
    emit('sent') // quietly drop bot submissions
    return
  }

  const message = form.value.town
    ? `${form.value.message}\n\nProperty location: ${form.value.town}`
    : form.value.message

  try {
    await sendEmail({
      to_email: site.contact.email,
      from_name: form.value.name,
      from_email: form.value.email,
      from_phone: form.value.phone || 'Not provided',
      service_type: serviceLabel(form.value.service),
      message,
    })
    form.value = blank()
    formRef.value.resetValidation()
    emit('sent')
  } catch {
    failed.value = true
  }
}
</script>

<template>
  <v-form ref="formRef" class="tw:grid tw:gap-1 tw:sm:grid-cols-2 tw:sm:gap-x-4" @submit.prevent="submit">
    <v-text-field
      v-model="form.name"
      label="Your name"
      autocomplete="name"
      :rules="[rules.required('your name')]"
      class="tw:sm:col-span-2"
    />
    <v-text-field
      v-model="form.email"
      label="Email"
      type="email"
      autocomplete="email"
      :rules="[rules.required('your email'), rules.email]"
    />
    <v-text-field
      v-model="form.phone"
      label="Phone (optional)"
      type="tel"
      autocomplete="tel"
      :rules="[rules.phone]"
    />
    <v-select
      v-model="form.service"
      :items="serviceOptions"
      label="What are you interested in?"
      :rules="[rules.required('what you are interested in')]"
    />
    <v-select v-model="form.town" :items="townOptions" label="Where is the home? (optional)" />
    <v-textarea
      v-model="form.message"
      label="Tell us about the home"
      placeholder="Type of home, how often you're away, anything we should know"
      rows="4"
      auto-grow
      :rules="[rules.required('a short message')]"
      class="tw:sm:col-span-2"
    />

    <div class="visually-hidden" aria-hidden="true">
      <label>Leave this empty <input v-model="form.website" type="text" tabindex="-1" autocomplete="off" /></label>
    </div>

    <v-alert v-if="failed" type="error" variant="tonal" class="tw:sm:col-span-2 tw:mb-4" role="alert">
      Your request didn't send. Check your connection and try again, or email
      <a :href="`mailto:${site.contact.email}`">{{ site.contact.email }}</a>.
    </v-alert>

    <div class="tw:sm:col-span-2 tw:flex tw:flex-col tw:gap-3 tw:sm:flex-row tw:sm:items-center tw:sm:justify-between">
      <p class="contact-form__note">{{ site.contact.responseTime }}</p>
      <v-btn type="submit" color="accent" size="large" :loading="sending">Send request</v-btn>
    </div>
  </v-form>
</template>

<style scoped>
.contact-form__note {
  font-size: var(--step--1);
  color: rgb(var(--v-theme-stone));
}
</style>
