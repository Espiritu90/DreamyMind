<script setup lang="ts">
import LikeIcon from './icons/LikeIcon.vue';
const props = defineProps<{
    userAvatar: string
    user: string
    text: string
    likes: number
    
}>()
</script>

<template>
    <div class="bg-amber-100 rounded-xl p-3 flex flex-col gap-2 my-1">
        <div class="flex gap-1">
            <img :src="`${userAvatar}`" alt="avatar" class="h-5 w-5"/>
            <p class="text-sm text-indigo-900">{{user}}</p> <!--change to dynamic-->
        </div>

        <p class="text-indigo-900">{{text}}</p>
<div class="flex gap-1">
    
            <LikeIcon class="fill-none stroke-indigo-900 w-6 h-auto"/>
            <p class="text-sm text-indigo-900">{{ likes }}</p>
</div>
    </div>
</template>