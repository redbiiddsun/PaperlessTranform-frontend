<script setup lang="ts">
import ForgotPassword from '@/components/ForgotPassword.vue'
</script>

<template>
  <!-- Mobile View -->
   <div class="md:hidden">
    <ForgotPassword />
   </div>

  <!-- Tablet -->
  <div
    class="hidden md:flex xl:hidden flex-row px-8 justify-center items-center bg-gradient-to-tr from-primary to-hightlight via-75% w-full h-screen"
  >
    <ForgotPassword />
  </div>

  <div class="hidden xl:flex h-screen w-screen">
    <div class="flex flex-center w-full h-full bg-gradient-to-tr from-primary to-hightlight via-75%"></div>
    <ForgotPassword class="max-w-[50%]"/>
  </div>
</template>