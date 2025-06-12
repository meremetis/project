<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  message: String,
})

const emit = defineEmits(['hide']) 
</script>

<template>
  <div
    class="p-2.5 px-5 rounded-md text-white text-lg flex items-center justify-between min-w-[200px] bg-yellow-500"
  >
    {{ props.message }}
  </div>
</template>
