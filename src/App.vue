<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped>
.fade-enter-active {
  transition: opacity 1s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>
