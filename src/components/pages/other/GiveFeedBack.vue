<!-- GiveFeedback.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const feedback = ref('')
const handleSubmit = () => {
  if (!feedback.value.trim()) {
    alert('Please write some feedback before submitting.')
    return
  }
  alert('Thank you for your feedback!')
  feedback.value = ''
}
</script>

<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-presurface">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-text_b mb-4">Give Us Your Feedback</h2>
      <p class="text-subtext mb-4">We’d love to hear your thoughts to improve our service!</p>
      <textarea
        v-model="feedback"
        rows="6"
        placeholder="Write your feedback here..."
        class="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-primary resize-none"
      ></textarea>
      <button
        @click="handleSubmit"
        class="mt-4 w-full py-2 bg-primary text-white rounded-full hover:bg-opacity-80 transition"
      >
        Submit Feedback
      </button>
    </div>
  </div>
</template>
