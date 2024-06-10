<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CommentResponse, DreamResponse, UsersResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { useRoute } from 'vue-router/auto';
import LikeIcon from '@/components/icons/LikeIcon.vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import Comment from '@/components/Comment.vue';

const isLiked = ref(false);

function toggleLike() {
  isLiked.value = !isLiked.value;
}

const route = useRoute('/dream/[id]');
console.log('id :', route.params.id);

const aiVisible = ref(false);

const dreamById = await pb.collection<DreamResponse>('dream').getOne(route.params.id);

const comments = ref<Array<{ comment: CommentResponse, user: UsersResponse }>>([]);

onMounted(async () => {
  const commentsToDream = await pb.collection<DreamResponse<{ comment_via_dream: CommentResponse }>>('dream').getOne(route.params.id, {
    expand: "comment_via_dream",
    sort: "expand.comment_via_dream.created"
  });

  if (commentsToDream.expand?.comment_via_dream) {
    for (const comment of commentsToDream.expand.comment_via_dream) {
      const userOfComment = await pb.collection<UsersResponse>('users').getOne(comment.user ?? '');
      comments.value.push({ comment, user: userOfComment });
    }
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col gap-5">
      <div>
        <h1>{{ dreamById.title }}</h1>
        <p>{{ dreamById.textDream }}</p>
        <button 
          @click="aiVisible = !aiVisible"
          class=" bg-fuchsia-900 rounded-full align-middle py-3 px-6 w-full text-amber-100 font-semibold mt-2">Explain with AI</button>
      </div>
      <div v-if="aiVisible" class="block h-0.5 w-full bg-amber-100"> </div>
      <div v-if="aiVisible" class="transition-opacity duration-500">
        <h2>AI explanation</h2>
        <p>This dream symbolizes a profound sense of inner peace and spiritual connection. The garden bathed in golden light represents a sanctuary of tranquility and enlightenment. The blooming flowers and swaying trees signify growth, renewal, and the beauty of life unfolding. The inner radiance of each blossom reflects the individual's inner light and vitality. The scent of honey and sunshine evokes feelings of warmth, sweetness, and joy. Overall, the dream suggests a deep harmony with oneself and the surrounding world, as well as a sense of being uplifted by the positive energies and abundant blessings of life.</p>
      </div>
      
      <div v-if="dreamById.published">
        <div>
          <div class="flex gap-5">
            <div class="flex gap-1">
              <LikeIcon class="w-7 h-auto stroke-amber-100" @click="toggleLike" :class="{ 'fill-amber-100': isLiked }"/>
              <p class="my-auto">{{ dreamById.likes }}</p>
            </div>
            <div class="flex gap-1">
              <CommentIcon/>
              <p>{{ dreamById.comments }}</p>
            </div>
          </div>
        </div>
        <div class="w-full bg-indigo-900 p-1 flex align-middle justify-between gap-4">
          <input type="text" class="w-full rounded-full border-2 border-amber-100 my-auto pl-3" placeholder="Add a comment..."/>
          <button type="submit" class="h-fit w-auto flex align-middle my-auto">
            <SendIcon class="h-7 w-auto"/>
          </button>
        </div>
        <div v-for="commentData in comments" :key="commentData.comment.id">
          <Comment :comment="commentData.comment" :user="commentData.user"/>
        </div>
      </div>
    </div>
  </div>
</template>
