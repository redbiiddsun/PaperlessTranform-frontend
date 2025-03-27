import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useSlideDirection(
  order: string[], 
  option1: string, 
  option2: string
) {
  const route = useRoute()
  const previousRoute = ref<string | null>(route.name as string | null)
  const slideDirection = ref<string>(option2)

  watch(route, (newRoute) => {
    const newIndex = order.indexOf(newRoute.name as string)
    const oldIndex = order.indexOf(previousRoute.value ?? '')

    if (newIndex > oldIndex) {
      slideDirection.value = option1
    } else {
      slideDirection.value = option2
    }

    previousRoute.value = newRoute.name as string
  })

  return slideDirection
}
