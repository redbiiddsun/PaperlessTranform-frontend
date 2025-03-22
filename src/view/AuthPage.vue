<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const slideDirection = ref('slideLeft')
const route = useRoute()

watch(route, (newRoute) => {
  if (newRoute.name === 'Login') {
    slideDirection.value = 'slideLeft'
  } else if (newRoute.name === 'Signup') {
    slideDirection.value = 'slideRight'
  }
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
    class="hidden md:flex xl:hidden flex-row p-8 justify-center items-center bg-gradient-to-tr from-primary to-hightlight via-75% w-full h- "
  >
    <router-view v-slot="{ Component }">
      <transition :name="slideDirection" mode="out-in">
        <component :is="Component" v-if="Component" />
      </transition>
    </router-view>
  </div>

  <!-- Desktop -->
  <div class="hidden xl:flex h-screen w-screen">
    <div
      class="flex flex-col w-full h-full bg-gradient-to-tr from-primary to-hightlight via-75%"
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
  opacity: 0;
  transform: translateX(100%);
}

.slideRight-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slideLeft-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.slideLeft-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.slideRight-enter-active,
.slideRight-leave-active,
.slideLeft-enter-active,
.slideLeft-leave-active {
  transition: 0.3s ease-out;
}
</style>
