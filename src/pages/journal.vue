<script setup lang="ts">
import DreamCard from '@/components/DreamCard.vue';
import { ref } from 'vue';

const all = ref(true);

import { pb } from '@/backend';
import { dreamsOfUser } from '@/backend';

const record = await dreamsOfUser(pb.authStore.model?.id);
console.log(record.expand?.dream_via_user);
</script>

<template>
<div class="wrapper wrapper-flex">
    <h1>Journal</h1>
    <div class="flex gap-3">
        <button
        :class="all? 'text-base text-indigo-900 font-bold bg-amber-100 border-2 border-amber-100 px-5 rounded-full align-middle' : 'bg-transparent border-2 border-amber-100 px-5 rounded-full font-bold my-auto align-middle text-amber-100'"
        class="transition-all duration-300 ease-in-out"
        @pointerdown="all = true" 
        >All</button>
        <button 
        @pointerdown="all = false"
        :class="all===false? 'text-base text-indigo-900 font-bold bg-amber-100 border-2 border-amber-100 px-5 rounded-full align-middle' : 'bg-transparent border-2 border-amber-100 px-5 rounded-full font-bold my-auto align-middle text-amber-100'"
        class="transition-all duration-300 ease-in-out">Published</button>
        <div></div>
    </div>
    <DreamCard v-for="oneDream in record.expand?.dream_via_user" :key="oneDream.id" v-bind="oneDream" :class="!oneDream.published && !all? 'hidden' : 'visible'"/>
</div>
</template>