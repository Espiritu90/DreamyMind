<script setup lang="ts">
import LikeIcon from '@/components/icons/LikeIcon.vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import Comment from '@/components/Comment.vue';
import { ref } from 'vue';
import type { DreamResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { useRoute } from 'vue-router/auto';

import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue';
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';

const route = useRoute('/posts/[id]');
console.log('id:', route.params.id);

const isLiked = ref(false);

function toggleLike() {
    isLiked.value = !isLiked.value;
}

const dreamById = await pb.collection<DreamResponse>('dream').getOne(route.params.id, { expand: 'user' });
console.log('dreamById:', dreamById);
</script>

<template>
    <div class="wrapper">
        <div class="my-3 bg-indigo-900 rounded-[32px] p-5">
            <div class="flex gap-3 align-middle">
                <Avatar1 v-if="dreamById.expand.user.avatar === 1" class="rounded-full w-8 h-8 border-amber-100"/>
            <Avatar2 v-if="dreamById.expand.user.avatar === 2" class="rounded-full w-8 h-8 border-amber-100"/>
            <Avatar3 v-if="dreamById.expand.user.avatar === 3" class="rounded-full w-8 h-8 border-amber-100"/>
            <Avatar4 v-if="dreamById.expand.user.avatar === 4" class="rounded-full w-8 h-8 border-amber-100"/>
            <Avatar5 v-if="dreamById.expand.user.avatar === 5" class="rounded-full w-8 h-8 border-amber-100"/>
            <Avatar6 v-if="dreamById.expand.user.avatar === 6" class="rounded-full w-8 h-8 border-amber-100"/>

                <RouterLink :to="{
                    name: '/profiles/[id]',
                    params: {
                        id: dreamById.expand.user.id
                    }
                }" class="text-amber-100 font-semibold my-auto">{{ dreamById.expand.user.username }}</RouterLink>
            </div>

            <div class="my-3">
                <h1>{{ dreamById.title }}</h1>
                <p>{{ dreamById.textDream }}</p>
            </div>

            <div>
                <div class="flex gap-5">
                    <div class="flex gap-1">
                        <LikeIcon class="w-7 h-auto stroke-amber-100" @click="toggleLike" :class="{'fill-amber-100': isLiked}" />
                        <p class="my-auto">{{ dreamById.likes }}</p>
                    </div>
                    <div class="flex gap-1">
                        <CommentIcon />
                        <p>{{ dreamById.comments }}</p>
                    </div>
                </div>
            </div>

            <div class="w-full bg-indigo-900 p-1 flex align-middle justify-between gap-4">
                <input type="text" class="w-full rounded-full border-2 border-amber-100 my-auto pl-3" placeholder="Add a comment..." />
                <button type="submit" class="h-fit w-auto flex align-middle my-auto">
                    <SendIcon class="h-7 w-auto" />
                </button>
            </div>

            <Comment v-for="n in 6" :key="n" userAvatar="/img/avatar.png" text="Your dream about the enchanted forest is so vivid and magical, I felt like I was right there with you!" user="sleepy_user1267" :likes="234" />
        </div>
    </div>
</template>
