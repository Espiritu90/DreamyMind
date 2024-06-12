<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router/auto';
import LogoIcon from './icons/LogoIcon.vue';
import { pb } from '@/backend';
import StarsIcon from './icons/StarsIcon.vue';

// Ensure pb.authStore.model is reactive and create a computed property
const isPremium = computed(() => pb.authStore.model?.premium);

</script>

<template>
  <div 
    class="w-full pl-4 pt-3 pb-1 top-0 left-0 drop-shadow sticky h-16 z-10 bg-indigo-900"
  >
    <RouterLink to="/home" class="w-fit flex">
      <LogoIcon />
      <StarsIcon :class="isPremium ? 'visible' : 'hidden'"  class="w-6 h-6"/>
    </RouterLink>
  </div>
</template>
