<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

const props = defineProps<{ value: number }>();

const progress = ref(0);
const displayProgress = ref(0);

onMounted(() => {
  let currentProgress = 0;
  const increment = props.value / 100; // Determines the speed of the increment

  const animateProgress = () => {
    if (currentProgress < props.value) {
      currentProgress += increment;
      progress.value = currentProgress;
      displayProgress.value = Math.round(currentProgress);
      requestAnimationFrame(animateProgress);
    } else {
      progress.value = props.value;
      displayProgress.value = props.value;
    }
  };

  animateProgress();
});
</script>

<template>
  <div class="relative w-32 h-32">
    <svg class="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9F7AEA" /> <!-- purple-500 -->
          <stop offset="100%" stop-color="#9F7AEA" /> <!-- purple-500 -->
        </linearGradient>
        <filter id="inset-shadow">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="3" />
          <feOffset dx="1" dy="1" result="offsetblur" />
          <feFlood flood-color="black" result="color" />
          <feComposite in2="offsetblur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>
      <path
        class="text-indigo-500"
        stroke="currentColor"
        stroke-width="3.8"
        fill="none"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
        style="filter: url(#inset-shadow);"
      />
      <path
        class="transition-all duration-[2000ms] ease-out"
        stroke="url(#gradient)"
        stroke-width="3.8"
        :stroke-dasharray="`${progress}, 100`"
        stroke-linecap="round"
        fill="none"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </svg>
    <div class="flex items-center justify-center w-full h-full">
      <span class="text-4xl font-bold text-yellow-100">{{ Math.round(displayProgress) }}%</span>
    </div>
  </div>
</template>
