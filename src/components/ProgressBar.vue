<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue';

const props = defineProps<{ value: number; topic: string }>();

const progress = ref(0);

onMounted(() => {
  // Animate the progress bar when the component is mounted
  requestAnimationFrame(() => {
    progress.value = props.value;
  });
});

// Update the progress bar when the value prop changes
watch(() => props.value, (newValue) => {
  progress.value = newValue;
});
</script>

<template>
  <div class="relative w-full h-8 mb-4">
    <div class="absolute inset-0 bg-indigo-600 opacity-50 rounded-full shadow-inner"></div>
    <div
      class="absolute inset-0 rounded-full transition-all duration-[2000ms] ease-out bg-purple-500"
      :style="{ width: `${progress}%` }"
    >
      <div class="relative h-full flex items-center justify-left text-yellow-100 ml-4">
        <div class="absolute w-40">{{ topic }} {{ value }}%</div>
      </div>
    </div>
  </div>
</template>
