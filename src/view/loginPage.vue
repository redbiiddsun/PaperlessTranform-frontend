<script setup lang="ts">
import LoginComp from '@/components/LoginForm.vue'
</script>

<template>
  <!-- Mobile View -->
   <div class="md:hidden">
    <LoginComp />
   </div>

  <!-- Tablet -->
  <div
    class="hidden md:flex xl:hidden flex-row px-8 justify-center items-center bg-gradient-to-tr from-primary to-hightlight via-75% w-full h-screen"
  >
    <LoginComp />
  </div>

  <div class="hidden xl:flex h-screen w-screen">
    <div class="flex flex-col w-full h-full bg-gradient-to-tr from-primary to-hightlight via-75%"></div>
    <LoginComp class="max-w-[50%]"/>
  </div>
</template>
