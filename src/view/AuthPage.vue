<script setup lang="ts">
import { useSlideDirection } from '@/utils/transition'
import '@/assets/transiton.css'

const order = ['Login', 'Signup']
const slideDirection = useSlideDirection(order, 'slideRight', 'slideLeft')
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
