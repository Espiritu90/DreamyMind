<script setup lang="ts">
import { RouterLink } from 'vue-router/auto'
import LogoIcon from './icons/LogoIcon.vue';
</script>

<template>
  <div class="bg-indigo-900 w-full pl-4 pt-3 pb-1 top-0 left-0 drop-shadow sticky">
    <RouterLink to="/" class="w-[245px]">
        <LogoIcon class="max-w-full"/>
    </RouterLink>
  </div>
</template>