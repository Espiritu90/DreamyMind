<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router/auto';
import LogoIcon from './icons/LogoIcon.vue';
import { pb } from '@/backend';

// Ensure pb.authStore.model is reactive and create a computed property
const isPremium = computed(() => pb.authStore.model?.premium);

</script>

<template>
  <div 
    class="w-full pl-4 pt-3 pb-1 top-0 left-0 drop-shadow sticky h-16 z-10"
    :class="isPremium ? 'bg-gradient-to-tr from-[#F2EAD0] via-[#F7D977] to-[#F2EAD0]' : 'bg-indigo-900'"
  >
    <RouterLink to="/home" class="w-[245px]">
      <LogoIcon 
        class="max-w-full"
        :strokeColour="isPremium ? '#312e81' : '#fef3c7'"
        :fillColour="isPremium ? '#312e81' : '#fef3c7'"
      />
    </RouterLink>
  </div>
</template>
