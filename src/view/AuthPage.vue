<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const slideDirection = ref('slideLeft')
const route = useRoute()
const previousRoute = ref(route.name)

const order = ['Login', 'Signup']

watch(route, (newRoute) => {
  const newIndex = order.indexOf(newRoute.name as string)
  const oldIndex = order.indexOf(previousRoute.value as string)
  console.log(newRoute.name)
  if (newIndex > oldIndex) {
    slideDirection.value = 'slideRight'
  } else {
    slideDirection.value = 'slideLeft'
  }

  previousRoute.value = newRoute.name
})
</script>

<template>
  <!-- Mobile View -->
  <div class="md:hidden flex">
    <router-view v-slot="{ Component }">
      <transition :name="slideDirection" mode="out-in">
        <component :is="Component" v-if="Component" />
      </transition>
    </router-view>
  </div>

  <!-- Tablet -->
  <div
    class="hidden md:flex xl:hidden flex-row p-8 justify-center items-center bg-gradient-to-tr from-primary to-hightlight via-75% w-full h-screen"
  >
    <router-view v-slot="{ Component }">
      <transition :name="slideDirection" mode="out-in">
        <component :is="Component" v-if="Component" />
      </transition>
    </router-view>
  </div>

  <!-- Desktop -->
  <div class="relative hidden xl:flex h-screen w-screen overflow-hidden">
    <div
      class="absolute flex flex-col w-[55%] h-full bg-gradient-to-tr from-primary to-hightlight via-75% transition-transform duration-500"
      :class="{
        'translate-x-0': slideDirection === 'slideRight',
        'translate-x-[85%]': slideDirection === 'slideLeft',
      }"
    ></div>
    <router-view v-slot="{ Component }">
      <transition :name="slideDirection" mode="out-in">
        <component :is="Component" v-if="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.slideRight-enter-from {
  opacity: 1;
  transform: translateX(100%);
}

.slideRight-leave-to {
  opacity: 1;
  transform: translateX(-100%);
}

.slideLeft-enter-from {
  opacity: 1;
  transform: translateX(-100%);
}

.slideLeft-leave-to {
  opacity: 1;
  transform: translateX(100%);
}

.slideRight-enter-active,
.slideRight-leave-active,
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: 0.3s ease-out;
}
</style>
