import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useClickOutside(refs: Ref<HTMLElement | null>[], callback: () => void) {
  function handleClickOutside(event: MouseEvent) {
    if (refs.every((r) => r.value && !r.value.contains(event.target as Node))) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}
