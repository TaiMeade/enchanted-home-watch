import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Sends template params through the shared EmailJS account.
 * The template delivers to whatever `to_email` the caller passes.
 */
export function useEmailJS() {
  const sending = ref(false)
  const error = ref(null)

  async function sendEmail(params) {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      const missing = new Error('EmailJS keys are missing. Set the VITE_EMAILJS_* variables.')
      error.value = missing
      throw missing
    }

    sending.value = true
    error.value = null
    try {
      return await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
    } catch (err) {
      error.value = err
      throw err
    } finally {
      sending.value = false
    }
  }

  return { sendEmail, sending, error }
}
