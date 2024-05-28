<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';


</script>

<template>
<div class="wrapper wrapper-flex">
    <h1>Journal</h1>
    <div class="flex">
        <div class="text-base text-indigo-900 font-normal bg-amber-100 px-5 rounded-full ">All</div>
        <div></div>
    </div>
    <PostCard variant="journal_public" published userAvatar="/img/avatar.png" user="sleepy_user142" title="Enchanted Forest" text="As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take..." likes="1234" comments="123"/>
    <PostCard variant="journal_private" userAvatar="/img/avatar.png" user="sleepy_user142" title="Enchanted Forest" text="As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take..." likes="1234" comments="123"/>
</div>
</template>