// src/composables/useBeforeUnload.ts
import { onMounted, onBeforeUnmount } from 'vue'

export function useBeforeUnload(enabled: boolean = true) {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!enabled) return
    event.preventDefault()
    event.returnValue = '' // Most browsers require this
  }

  onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
}
