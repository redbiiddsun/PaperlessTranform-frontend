<template>
  <div class="w-full h-full flex items-center justify-center bg-gradient-to-tr from-primary to-hightlight via-75%">
    <div class="flex flex-col items-center justify-center space-y-4 p-6 rounded-lg bg-white bg-opacity-20 shadow-lg backdrop-blur-md">
      <div class="font-Poppins text-5xl font-extrabold text-white animate-pulse">
        LOADING<span class="loading-dots"></span>
      </div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>

<style scoped>
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #1a74e2; /* primary color */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 1.5s linear infinite;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Add animated loading dots */
.loading-dots::after {
  content: "";
  display: inline-block;
  animation: dots 2s steps(4, end) infinite;
}

@keyframes dots {
  0%, 20% {
    content: "";
  }
  40% {
    content: ".";
  }
  60% {
    content: "..";
  }
  80%, 100% {
    content: "...";
  }
}

/* Text animation for pulse effect */
@keyframes pulseText {
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}

.text-5xl {
  animation: pulseText 1.5s ease-in-out infinite;
}
</style>
