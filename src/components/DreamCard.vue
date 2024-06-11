<script setup lang="ts">
import LikeIcon from './icons/LikeIcon.vue';
import CommentIcon from './icons/CommentIcon.vue';
import { ref, onMounted } from 'vue';
import type { DreamResponse, CommentResponse, LikePostResponse } from '@/pocketbase-types';
import { pb } from '@/backend';

const isLiked = ref(false);
const likeCount = ref(0);
const dreamWithComments = ref<DreamResponse<{ comment_via_dream: CommentResponse[], likePost_via_dream: LikePostResponse[] }>>();

async function toggleLike() {
  const loggedInUserId = pb.authStore.model?.id;
  const dreamId = props.id;

  if (isLiked.value) {
    // Delete the like record
    const likeRecords = await pb.collection<LikePostResponse>('likePost').getFullList({
      filter: `user="${loggedInUserId}" && dream="${dreamId}"`,
    });
    if (likeRecords.length > 0) {
      await pb.collection('likePost').delete(likeRecords[0].id);
      likeCount.value--;
    }
  } else {
    // Create a new like record
    await pb.collection<LikePostResponse>('likePost').create({
      user: loggedInUserId,
      dream: dreamId,
    });
    likeCount.value++;
  }

  isLiked.value = !isLiked.value;
}

const props = defineProps<DreamResponse>();

onMounted(async () => {
  dreamWithComments.value = await pb.collection('dream').getOne(props.id, {
    expand: 'comment_via_dream,likePost_via_dream'
  });

  // Update the like count
  if (dreamWithComments.value?.expand?.likePost_via_dream) {
    likeCount.value = dreamWithComments.value?.expand.likePost_via_dream.length;

    // Check if the user has liked the post
    isLiked.value = dreamWithComments.value?.expand.likePost_via_dream.some(like => like.user === pb.authStore.model?.id);
  }
});
</script>

<template>
  <div class="my-1.5 bg-indigo-900 rounded-[32px] pt-8 p-5">
    <!--published and nightmare tags-->
    <div class="flex gap-2">
      <div class="w-fit flex align-middle justify-center" :class="published ? 'visible' : 'hidden'">
        <p class="text-indigo-900 m-auto text-sm align-middle bg-amber-100 rounded-full px-1.5 py-2 leading-3 font-normal">Published</p>
      </div>
      <div class="w-fit flex align-middle justify-center" :class="nightmare ? 'visible' : 'hidden'">
        <p class="text-indigo-900 m-auto text-sm align-middle bg-amber-100 rounded-full px-1.5 py-2 leading-3 font-normal">Nightmare</p>
      </div>
    </div>
    <!--title + text-->
    <div class="px-3 pt-2">
      <h2>{{ title }}</h2>
      <p class="bg-gradient-to-t from-transparent from-[1%] via-amber-100 via-30% to-amber-100 text-transparent bg-clip-text line-clamp-6">{{ textDream }}</p>
    </div>
    <!--continue reading-->
    <RouterLink :to="{ name: '/dream/[id]', params: { id: id } }" class="text-base text-amber-100 bg-indigo-900 h-fit">
      <p class="font-semibold text-center">Continue reading</p>
    </RouterLink>
    <!--like+comment-->
    <div :class="published ? 'visible' : 'hidden'" class="flex gap-5">
      <div class="flex gap-1 items-center">
        <LikeIcon @click="toggleLike" :class="{ 'fill-amber-100': isLiked }" class="w-6 h-auto cursor-pointer stroke-amber-100" />
        <p>{{ likeCount }}</p>
      </div>
      <div class="flex gap-1">
        <CommentIcon class="w-6 h-auto" />
        <p>{{ dreamWithComments?.expand?.comment_via_dream?.length || 0 }}</p>
      </div>
    </div>
  </div>
</template>
