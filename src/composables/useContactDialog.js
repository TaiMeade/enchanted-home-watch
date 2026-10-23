import { ref } from 'vue'

// One contact dialog for the whole site. Any button can open it,
// optionally preselecting the service the visitor was looking at.
const isOpen = ref(false)
const preselectedService = ref(null)

export function useContactDialog() {
  function openContact(serviceId = null) {
    preselectedService.value = serviceId
    isOpen.value = true
  }

  function closeContact() {
    isOpen.value = false
  }

  return { isOpen, preselectedService, openContact, closeContact }
}
