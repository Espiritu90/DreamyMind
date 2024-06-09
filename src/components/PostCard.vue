<script setup lang="ts">
import LikeIcon from './icons/LikeIcon.vue';
import CommentIcon from './icons/CommentIcon.vue';
import { ref } from 'vue';
import Avatar1 from './avatars/Avatar1.vue';
import Avatar2 from './avatars/Avatar2.vue';
import Avatar3 from './avatars/Avatar3.vue';
import Avatar4 from './avatars/Avatar4.vue';
import Avatar5 from './avatars/Avatar5.vue';
import Avatar6 from './avatars/Avatar6.vue';
const isLiked = ref(false);

function toggleLike() {
  isLiked.value = !isLiked.value;
}

import type { DreamResponse } from '@/pocketbase-types';
const props = defineProps<DreamResponse>();
</script>

<template>
    <div class="my-1.5 bg-indigo-900 rounded-[32px] pt-8 p-5">

                <!--title + text-->
             <div class="px-3 pt-2">
                <h2>{{ title }}</h2>
                <p class="bg-gradient-to-t from-transparent from-[1%] via-amber-100 via-30% to-amber-100 text-transparent bg-clip-text line-clamp-6">{{textDream}}</p>
            </div>

            <!--continue reading-->
            <RouterLink :to="{
        name: '/posts/[id]',
        params: {
          id: id
        }
      }" class="text-base text-amber-100 bg-indigo-900 h-fit"><p class="font-semibold text-center">Continue reading</p></RouterLink>

<!--like+comment-->
            <div class="flex gap-5">
                <div class="flex gap-1 items-center">
                    <LikeIcon @click="toggleLike"
        :class="{'fill-amber-100': isLiked}" 
        class="w-6 h-auto cursor-pointer stroke-amber-100" />       
                    <p>{{ likes }}</p>
                </div>
                <RouterLink to="/posts/[id]" class="flex gap-1">
                    <CommentIcon class="w-6 h-auto"/>
                    <p>{{ comments }}</p>
                </RouterLink>
            </div>


    </div>
</template>