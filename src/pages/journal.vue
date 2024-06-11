<script setup lang="ts">
import DreamCard from '@/components/DreamCard.vue';
import { ref, computed } from 'vue';

const all = ref(true);
const showNightmares = ref(false); // State for nightmares filter
const showPublished = ref(false); // State for published filter

import { pb } from '@/backend';
import { dreamsOfUser } from '@/backend';

const record = await dreamsOfUser(pb.authStore.model?.id);
console.log(record.expand?.dream_via_user);

const sortedDreams = computed(() => {
  if (record.expand?.dream_via_user) {
    let dreams = record.expand.dream_via_user.slice().sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });

    if (showNightmares.value) {
      dreams = dreams.filter(dream => dream.nightmare); // Filter nightmares
    } else if (showPublished.value) {
      dreams = dreams.filter(dream => dream.published); // Filter published
    }

    return dreams;
  }
  return [];
});
</script>

<template>
  <div class="wrapper wrapper-flex">
    <h1>Journal</h1>
    <div class="flex gap-3">
      <button
        :class="all ? 'text-base text-indigo-900 font-bold bg-amber-100 border-2 border-amber-100 px-5 rounded-full align-middle' : 'bg-transparent border-2 border-amber-100 px-5 rounded-full font-bold my-auto align-middle text-amber-100'"
        class="transition-all duration-300 ease-in-out"
        @pointerdown="all = true; showNightmares = false; showPublished = false;"
      >All</button>
      <button
        @pointerdown="all = false; showNightmares = true; showPublished = false;"
        :class="showNightmares ? 'text-base text-indigo-900 font-bold bg-amber-100 border-2 border-amber-100 px-5 rounded-full align-middle' : 'bg-transparent border-2 border-amber-100 px-5 rounded-full font-bold my-auto align-middle text-amber-100'"
        class="transition-all duration-300 ease-in-out"
      >Nightmares</button>
      <button
        @pointerdown="all = false; showNightmares = false; showPublished = true;"
        :class="showPublished ? 'text-base text-indigo-900 font-bold bg-amber-100 border-2 border-amber-100 px-5 rounded-full align-middle' : 'bg-transparent border-2 border-amber-100 px-5 rounded-full font-bold my-auto align-middle text-amber-100'"
        class="transition-all duration-300 ease-in-out"
      >Published</button>
      <div></div>
    </div>
    <DreamCard v-for="oneDream in sortedDreams" :key="oneDream.id" v-bind="oneDream"/>
  </div>
</template>
