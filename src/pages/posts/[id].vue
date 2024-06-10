<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CommentResponse, DreamResponse, UsersResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { useRoute } from 'vue-router/auto';
import LikeIcon from '@/components/icons/LikeIcon.vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import Comment from '@/components/Comment.vue';
import { useRouter } from 'vue-router/auto';

// Import avatar components
import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue';
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';

const router = useRouter();

const isLiked = ref(false);
const commentCount = ref(0);

function toggleLike() {
  isLiked.value = !isLiked.value;
}

const route = useRoute('/dream/[id]');
console.log('id :', route.params.id);

const dreamById = await pb.collection<DreamResponse>('dream').getOne(route.params.id);
const user = ref<UsersResponse>();

const comments = ref<Array<{ comment: CommentResponse, user: UsersResponse }>>([]);

onMounted(async () => {
  const loggedInUserId = pb.authStore.model.id;

  // Fetch the user data for the dream
  user.value = await pb.collection('users').getOne(dreamById.user);

  const commentsToDream = await pb.collection<DreamResponse<{ comment_via_dream: CommentResponse }>>('dream').getOne(route.params.id, {
    expand: "comment_via_dream",
    sort: "expand.comment_via_dream.created"
  });

  if (commentsToDream.expand?.comment_via_dream) {
    commentCount.value = commentsToDream.expand.comment_via_dream.length;

    for (const comment of commentsToDream.expand.comment_via_dream) {
      const userOfComment = await pb.collection<UsersResponse>('users').getOne(comment.user ?? '');

      // Prioritize logged-in user's comments by moving them to the beginning of the array
      if (userOfComment.id === loggedInUserId) {
        comments.value.unshift({ comment, user: userOfComment });
      } else {
        comments.value.push({ comment, user: userOfComment });
      }
    }

    // Sort comments by the number of likes in descending order
    comments.value.sort((a, b) => b.comment.likes - a.comment.likes);
  }
});

const submit = async (event: Event) => {
  console.log('Form submitted');
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  try {
    const newComment = await pb.collection('comment').create(formData);
    console.log('Comment created:', newComment);
    setTimeout(() => {
        location.reload();
    }, 500);
    // Optionally, update the comments list or reset the form here
  } catch (error) {
    console.error('Error creating comment:', error);
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col gap-5">
      <!-- Display user data -->
      <RouterLink v-if="user" :to="{
        name: '/profiles/[id]',
        params: {
          id: user.id
        }
      }">
        <div class="flex items-center gap-2">
          <div v-if="user.avatar === 1"><Avatar1 class="w-8 h-8 rounded-full" /></div>
          <div v-if="user.avatar === 2"><Avatar2 class="w-8 h-8 rounded-full" /></div>
          <div v-if="user.avatar === 3"><Avatar3 class="w-8 h-8 rounded-full" /></div>
          <div v-if="user.avatar === 4"><Avatar4 class="w-8 h-8 rounded-full" /></div>
          <div v-if="user.avatar === 5"><Avatar5 class="w-8 h-8 rounded-full" /></div>
          <div v-if="user.avatar === 6"><Avatar6 class="w-8 h-8 rounded-full" /></div>
          <p class="text-sm text-amber-100">{{ user.username }}</p>
        </div>
      </RouterLink>

      <div>
        <h1>{{ dreamById.title }}</h1>
        <p>{{ dreamById.textDream }}</p>

        <div>
          <div class="flex gap-5">
            <div class="flex gap-1">
              <LikeIcon class="w-7 h-auto stroke-amber-100" @click="toggleLike" :class="{ 'fill-amber-100': isLiked }"/>
              <p class="my-auto">{{ dreamById.likes }}</p>
            </div>
            <div class="flex gap-1">
              <CommentIcon/>
              <p>{{ commentCount }}</p>
            </div>
          </div>
        </div>
        <div class="w-full bg-indigo-900 p-1 flex align-middle justify-between gap-4">
          <form method="post" @submit="submit" class="w-full flex gap-4">
            <input type="text" class="w-full rounded-full border-2 border-amber-100 my-auto pl-3" placeholder="Add a comment..." id="textComment" name="textComment"/>
            <input type="text" name="dream" :value="dreamById.id" class="hidden"/>
            <input type="text" name="user" :value="pb.authStore.model?.id" class="hidden"/>
            <button type="submit" class="h-fit w-auto flex align-middle my-auto">
              <SendIcon class="h-7 w-auto"/>
            </button>
          </form>
        </div>
        <div v-for="commentData in comments" :key="commentData.comment.id">
          <Comment :comment="commentData.comment" :user="commentData.user"/>
        </div>
      </div>
    </div>
  </div>
</template>
