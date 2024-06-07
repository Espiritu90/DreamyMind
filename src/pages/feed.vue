<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';

</script>

<template>
<div class="wrapper wrapper-flex">
<h1>Feed</h1>
<div v-for="n in 6" :key="n">
    <PostCard variant="feed" userAvatar="/img/avatar.png" user="sleepy_user142" title="Enchanted Forest" text="As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take..." likes="1234" comments="123"/>
</div>

<!-- <PostCard variant="feed" v-for="oneDream in posts" :key="oneDream.id" v-bind="oneDream"/> -->
<!--<PostCard v-for="oneDream in allDreamsPublished" key="oneDream.id" v-bind="oneDream"-->
</div>
</template>