<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const slideDirection = ref('slideLeft')
const route = useRoute()
const previousRoute = ref(route.name)

const order = ['EmailSubmit', 'OTPVerification', 'ResetPassword']

watch(route, (newRoute) => {
  const newIndex = order.indexOf(newRoute.name as string)
  const oldIndex = order.indexOf(previousRoute.value as string)

  if (newIndex > oldIndex) {
    slideDirection.value = 'slideRight'
  } else {
    slideDirection.value = 'slideLeft'
  }

  previousRoute.value = newRoute.name
})
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-fit h-screen overflow-hidden md:h-fit xl:h-fit gap-1 md:gap-2 xl:gap-2 p-8 md:px-28 md:py-16 xl:py-16 xl:px-28 md:rounded-2xl xl:rounded-2xl md:bg-text xl:bg-text md:border-4 xl:border-4 md:border-hightlight xl:border-hightlight xl:absolute xl:left-1/2 xl:top-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2"
  >
    <!-- Logo -->
    <div alt="" class="w-[200px] h-[200px] bg-[#EAEAEA] rounded-lg"></div>

    <!-- Main Message -->
    <div class="flex flex-col p-4 w-auto h-fit items-center gap-1">
      <p class="font-Poppins font-bold text-4xl md:text-4xl text-text_b text-nowrap">
        Forgot Password
      </p>
      <p class="font-Poppins font-normal text-[12px] md:text-base text-center text-subtext">
        Forgot your password? No worries! Enter your email below, and we'll send you a otp to reset it.
      </p>
    </div>

    <!-- Form -->
    <router-view v-slot="{ Component }">
      <transition :name="slideDirection" mode="out-in">
        <component :is="Component" v-if="Component"/>
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