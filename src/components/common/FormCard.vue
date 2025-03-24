<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  name: String,
  date: Date
});

// Function to calculate the time difference
const timeEdited = computed(() => {
  if (!props.date) return "Unknown time";

  const now = new Date();
  const inputDate = new Date(props.date);
  const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 365) return `${diffInDays} days ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
});
</script>

<template>
  <div class="flex flex-col gap-3 p-2 rounded-xl border border-opacity-25 bg-white">
    <!-- Form Image -->
    <img src="" alt="" class="bg-gray-500 w-full h-full rounded-lg" />
    <div class="flex flex-col w-full h-fit gap-1">
      <p class="font-Inter font-medium text-base text-text_b text-nowrap overflow-hidden text-ellipsis">
        {{ props.name }}
      </p>
      <p class="font-Poppins font-light text-xs text-subtext">
        Edited {{ timeEdited }}
      </p>
    </div>
  </div>
</template>
