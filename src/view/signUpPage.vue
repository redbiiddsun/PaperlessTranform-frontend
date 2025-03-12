<script setup lang="ts">
import SignupComp from '@/components/SignUpForm.vue'
</script>

<template>
  <!-- Mobile View -->
   <div class="md:hidden">
    <SignupComp />
   </div>

  <!-- Tablet -->
  <div
    class="hidden md:flex xl:hidden flex-row px-16 justify-center items-center bg-gradient-to-tr from-primary to-hightlight via-75% w-full h-screen"
  >
    <SignupComp />
  </div>

  <div class="hidden xl:flex h-screen w-screen">
    <div class="flex flex-col w-full h-full bg-gradient-to-tr from-primary to-hightlight via-75%"></div>
    <SignupComp class="max-w-[50%]"/>
  </div>
</template>
