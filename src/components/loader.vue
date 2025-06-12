<script setup></script>

<template>
  <span
    class="loader w-12 h-12 border-4 border-white border-b-transparent rounded-full inline-block box-border animate-spin"
  ></span>
</template>

<style scoped>
.loader {
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
