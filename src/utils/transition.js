import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useSlideDirection(order, option1, option2) {
  const route = useRoute()
  const previousRoute = ref(route.name)
  const slideDirection = ref(option2)

  watch(route, (newRoute) => {
    const newIndex = order.indexOf(newRoute.name)
    const oldIndex = order.indexOf(previousRoute.value)

    if (newIndex > oldIndex) {
      slideDirection.value = option1
    } else {
      slideDirection.value = option2
    }

    previousRoute.value = newRoute.name
  })

  return slideDirection
}
