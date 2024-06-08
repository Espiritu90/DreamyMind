<script setup lang="ts">
import LikeIcon from './icons/LikeIcon.vue';
import CommentIcon from './icons/CommentIcon.vue';
import { ref } from 'vue';

const isLiked = ref(false);

function toggleLike() {
  isLiked.value = !isLiked.value;
}

const props=defineProps<{
    title?: string
    text?: string
    likes?: number
    comments?: number
    published?: boolean
}>();
</script>

<template>
    <div class="my-1.5 bg-indigo-900 rounded-[32px] pt-8 p-5">
        <!--published-->
        <div class=" w-fit  flex align-middle justify-center" :class="published? 'visible' : 'hidden'">
            <p class="text-indigo-900 m-auto text-sm align-middle bg-amber-100 rounded-full px-1 py-1.5 leading-3 font-normal">Published</p>
        </div>
        <!--title + text-->
        <div class="px-3 pt-2">
            <h2>{{ title }}</h2>
            <p class="bg-gradient-to-t from-transparent from-[1%] via-amber-100 via-30% to-amber-100 text-transparent bg-clip-text line-clamp-6">{{text}}</p>
        </div>
        <!--like+comment-->
        <div :class="published? 'visible' : 'hidden'" class="flex gap-5">
            <div class="flex gap-1 items-center">
                <LikeIcon @click="toggleLike"
                :class="{'fill-amber-100': isLiked}" 
                class="w-6 h-auto cursor-pointer stroke-amber-100" />       
                <p>{{ likes }}</p>
            </div>
            <div class="flex gap-1">
                <CommentIcon class="w-6 h-auto"/>
                <p>{{ comments }}</p>
            </div>
        </div>
    </div>
</template>