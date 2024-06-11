<script setup lang="ts">
import RadialBar from '@/components/RadialBar.vue';
import { getUserActivityPercentage, getNightmarePercentage } from '@/backend';
import { pb } from '@/backend';
import {ref, onMounted} from 'vue';
// Declare a reactive variable
const userActivityPercentage = ref(0);
const userNightmarePercentage = ref(0);

// Use onMounted to handle the async function
onMounted(async () => {
  if (pb.authStore.model?.id) {
    userActivityPercentage.value = await getUserActivityPercentage(pb.authStore.model.id);
    console.log(userActivityPercentage.value);
  }
  if (pb.authStore.model?.id) {
    userNightmarePercentage.value = await getNightmarePercentage(pb.authStore.model.id);
    console.log(userNightmarePercentage.value);
  }
});


</script>

<template>
<div class="wrapper">
    <h1>AI report</h1>
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col gap-2 justify-center align-middle">
        <h3 class="text-center">You've had dreams</h3>
        <RadialBar :value="userActivityPercentage" class="mx-auto"/>
        <p class="text-center">of nights</p>
    </div>
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col gap-2 justify-center align-middle">
        <h3 class="text-center">Out of them</h3>
        <RadialBar :value="userNightmarePercentage" class="mx-auto"/>
        <p class="text-center">were nightmares</p>
    </div>
</div>
</template>