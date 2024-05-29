<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import { ref } from 'vue';

const all = ref(true);
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
    <PostCard 
    published userAvatar="/img/avatar.png" user="sleepy_user142" title="Enchanted Forest" text="As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take..." likes="1234" comments="123" class="transition-opacity duration-300 ease-in-out"/>

    <PostCard 
    :class="all? 'visible' : 'hidden'"
    userAvatar="/img/avatar.png" user="sleepy_user142" title="Enchanted Forest" text="As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take..." likes="1234" comments="123" class="transition-opacity duration-300 ease-in-out"/>
</div>
</template>