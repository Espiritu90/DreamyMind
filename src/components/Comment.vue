<script setup lang="ts">
import LikeIcon from './icons/LikeIcon.vue';
import type { CommentResponse, UsersResponse } from '@/pocketbase-types';
import { defineProps } from 'vue';

// Import avatar components
import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue';
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';

// Define props for a single comment and its associated user
interface CommentProps {
  comment: CommentResponse;
  user: UsersResponse;
}

// Use the defineProps function to declare the props
const props = defineProps<CommentProps>();

import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const isLiked = ref(false);

function toggleLike() {
  isLiked.value = !isLiked.value;
  console.log(isLiked.value);
}
</script>

<template>
  <div class="bg-amber-100 rounded-xl p-3 flex flex-col gap-2 my-1">
    <RouterLink v-if="user" :to="{
        name: '/profiles/[id]',
        params: {
          id: user.id
        }
      }" class="flex gap-1">
      <!-- Conditionally render the avatar based on the user's avatar number -->
      <Avatar1 v-if="user.avatar === 1" class="rounded-full w-5 h-5 border-amber-100"/>
      <Avatar2 v-if="user.avatar === 2" class="rounded-full w-5 h-5 border-amber-100"/>
      <Avatar3 v-if="user.avatar === 3" class="rounded-full w-5 h-5 border-amber-100"/>
      <Avatar4 v-if="user.avatar === 4" class="rounded-full w-5 h-5 border-amber-100"/>
      <Avatar5 v-if="user.avatar === 5" class="rounded-full w-5 h-5 border-amber-100"/>
      <Avatar6 v-if="user.avatar === 6" class="rounded-full w-5 h-5 border-amber-100"/>
      <p class="text-sm text-indigo-900">{{ user.username }}</p>
    </RouterLink >

    <p class="text-indigo-900">{{ comment.textComment }}</p>

    <div class="flex gap-1">
      <button @click="toggleLike">
        <LikeIcon :class="isLiked? 'fill-indigo-900' : 'fill-none'" class="stroke-indigo-900 w-6 h-auto"/>
      </button>
      <p class="text-sm text-indigo-900">{{ comment.likes }}</p>
    </div>
  </div>
</template>
