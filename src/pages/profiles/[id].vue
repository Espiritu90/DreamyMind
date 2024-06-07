<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import { ref } from 'vue';

const followed = ref(false);
</script>
<template>
    <div class="wrapper">
        <div class="flex align-middle gap-4">
        <img src="/img/avatar.png" alt="avatar" class="rounded-full w-20 h-20 border-2 bordrer-amber-100"/>
        <h2 class="my-auto">sleepy_user142</h2>
    </div>
    <button
    @click="followed = !followed"
    :class="followed===true ? 'bg-transparent border-amber-100' : 'bg-fuchsia-900 border-fuchsia-900'"
    class="flex text-amber-100 font-semibold border-2 rounded-full align-middle py-2 px-6 my-2">Follow</button>
    <PostCard v-for="n in 10" :key="n"
    variant="profile" userAvatar="/img/avatar.png" user="sleepyuser23455" title="Enchanted Forest" text="As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take me deeper into a world of magic and mystery, where every rustle of leaves and chirp of birdsong held the promise of adventure." likes="1245" comments="12"/>
    </div>
</template>