<script setup lang="ts">
import LikeIcon from './icons/LikeIcon.vue';
import CommentIcon from './icons/CommentIcon.vue';
import { ref, onMounted } from 'vue';
import type { DreamResponse, UsersResponse, CommentResponse, LikePostResponse } from '@/pocketbase-types';
import { pb } from '@/backend';

// Import avatar components
import Avatar1 from './avatars/Avatar1.vue';
import Avatar2 from './avatars/Avatar2.vue';
import Avatar3 from './avatars/Avatar3.vue';
import Avatar4 from './avatars/Avatar4.vue';
import Avatar5 from './avatars/Avatar5.vue';
import Avatar6 from './avatars/Avatar6.vue';

const isLiked = ref(false);
const likeCount = ref(0);
const dreamWithComments = ref<DreamResponse<{ comment_via_dream: CommentResponse[], likePost_via_dream: LikePostResponse[] }>>();

async function toggleLike() {
  const loggedInUserId = pb.authStore.model.id;
  const dreamId = props.dream.id;

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

// Define props for the user
interface PostProps {
  dream: DreamResponse;
  user: UsersResponse;
}

// Use the defineProps function to declare the props
const props = defineProps<PostProps>();

onMounted(async () => {
  dreamWithComments.value = await pb.collection('dream').getOne(props.dream.id, {
    expand: 'comment_via_dream,likePost_via_dream'
  });

  // Update the like count
  if (dreamWithComments.value.expand?.likePost_via_dream) {
    likeCount.value = dreamWithComments.value.expand.likePost_via_dream.length;

    // Check if the user has liked the post
    isLiked.value = dreamWithComments.value.expand.likePost_via_dream.some(like => like.user === pb.authStore.model.id);
  }
});
</script>

<template>
    <div class="my-1.5 bg-indigo-900 rounded-[32px] pt-2 p-5">

        <!-- Display user avatar -->
        <RouterLink :to="{
        name: '/profiles/[id]',
        params: {
          id: user.id
        }
      }">
            <div v-if="user" class="flex items-center gap-2 mt-4">
                <div v-if="user.avatar === 1"><Avatar1 class="w-8 h-8 rounded-full" /></div>
                <div v-if="user.avatar === 2"><Avatar2 class="w-8 h-8 rounded-full" /></div>
                <div v-if="user.avatar === 3"><Avatar3 class="w-8 h-8 rounded-full" /></div>
                <div v-if="user.avatar === 4"><Avatar4 class="w-8 h-8 rounded-full" /></div>
                <div v-if="user.avatar === 5"><Avatar5 class="w-8 h-8 rounded-full" /></div>
                <div v-if="user.avatar === 6"><Avatar6 class="w-8 h-8 rounded-full" /></div>
                <p class="text-sm text-amber-100">{{ user.username }}</p>
            </div>
        </RouterLink>

        <!-- Title + Text -->
        <div class="px-3 pt-2">
            <h2>{{ dream?.title }}</h2>
            <p class="bg-gradient-to-t from-transparent from-[1%] via-amber-100 via-30% to-amber-100 text-transparent bg-clip-text line-clamp-6">{{ dream?.textDream }}</p>
        </div>

        <!-- Continue reading -->
        <RouterLink :to="`/posts/${dream?.id}`" class="text-base text-amber-100 bg-indigo-900 h-fit">
            <p class="font-semibold text-center">Continue reading</p>
        </RouterLink>

        <!-- Like + Comment -->
        <div class="flex gap-5">
            <div class="flex gap-1 items-center">
                <LikeIcon @click="toggleLike" :class="{ 'fill-amber-100': isLiked }" class="w-6 h-auto cursor-pointer stroke-amber-100" />
                <p>{{ likeCount }}</p>
            </div>
            <RouterLink :to="`/posts/${dream?.id}`" class="flex gap-1">
                <CommentIcon class="w-6 h-auto" />
                <p>{{ dreamWithComments?.expand?.comment_via_dream?.length || 0 }}</p>
            </RouterLink>
        </div>

    </div>
</template>
