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

const props=defineProps<{
    avatar?: number
    user?: string
    title?: string
    text?: string
    likes?: number
    comments?: number
}>();
</script>

<template>
    <div class="my-1.5 bg-indigo-900 rounded-[32px] pt-8 p-5">

        <!--avatar + username-->
        <RouterLink to="/profiles/[id]" class="flex align-middle gap-2">
            <Avatar1 v-if="props.avatar === 1" class="w-8 h-8"/>
            <Avatar2 v-if="props.avatar === 2" class="w-8 h-8"/>
            <Avatar3 v-if="props.avatar === 3" class="w-8 h-8"/>
            <Avatar4 v-if="props.avatar === 4" class="w-8 h-8"/>
            <Avatar5 v-if="props.avatar === 5" class="w-8 h-8"/>
            <Avatar6 v-if="props.avatar === 6" class="w-8 h-8"/>
            <p class="my-auto">{{ user }}</p>
        </RouterLink>

        <!--separator-->
        <div class="block h-0.5 w-full rounded-full my-2 bg-amber-100"></div>

                     <!--title + text-->
             <div class="px-3 pt-2">
                <h2>{{ title }}</h2>
                <p class="bg-gradient-to-t from-transparent from-[1%] via-amber-100 via-30% to-amber-100 text-transparent bg-clip-text line-clamp-6">{{text}}</p>
            </div>

            <!--continue reading-->
            <RouterLink to="/posts/[id]" class="text-base text-amber-100 bg-indigo-900 h-fit"><p class="font-semibold text-center">Continue reading</p></RouterLink>

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