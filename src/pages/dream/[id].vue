<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CommentResponse, DreamResponse, UsersResponse, LikePostResponse, InterpretationResponse} from '@/pocketbase-types';
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
const likes = ref(0);
const commentCount = ref(0);

const route = useRoute('/dream/[id]');
console.log('id :', route.params.id);

const dreamById = await pb.collection<DreamResponse>('dream').getOne(route.params.id);
const user = ref<UsersResponse>();

const comments = ref<Array<{ comment: CommentResponse, user: UsersResponse }>>([]);

onMounted(async () => {
  if (!pb.authStore.model) {
    router.push('/');
  }

  const loggedInUserId = pb.authStore.model?.id;

  // Fetch the user data for the dream
  user.value = await pb.collection('users').getOne(dreamById.user);

  // Fetch the likes and comments for the dream
  const dreamData = await pb.collection<DreamResponse<{ comment_via_dream: CommentResponse, likePost_via_dream: LikePostResponse, interpretation_via_dream: InterpretationResponse }>>('dream').getOne(route.params.id, {
    expand: "comment_via_dream,likePost_via_dream,interpretation_via_dream",
    sort: "expand.comment_via_dream.created"
  });

  console.log('dreamData:', dreamData);

  // Update the comment count
  if (dreamData.expand?.comment_via_dream) {
    commentCount.value = dreamData.expand.comment_via_dream.length;

    for (const comment of dreamData.expand.comment_via_dream) {
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

  // Update the like count
  if (dreamData.expand?.likePost_via_dream) {
    likes.value = dreamData.expand.likePost_via_dream.length;

    // Check if the user has liked the post
    isLiked.value = dreamData.expand.likePost_via_dream.some(like => like.user === loggedInUserId);
  }

  await interpret();
});

async function toggleLike() {
  const loggedInUserId = pb.authStore.model?.id;
  const dreamId = dreamById.id;

  if (isLiked.value) {
    // Delete the like record
    const likeRecords = await pb.collection<LikePostResponse>('likePost').getFullList({
      filter: `user="${loggedInUserId}" && dream="${dreamId}"`,
    });
    if (likeRecords.length > 0) {
      await pb.collection('likePost').delete(likeRecords[0].id);
      likes.value--;
    }
  } else {
    // Create a new like record
    await pb.collection<LikePostResponse>('likePost').create({
      user: loggedInUserId,
      dream: dreamId,
    });
    likes.value++;
  }

  isLiked.value = !isLiked.value;
}

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

const deleteOpen = ref(false);

const openDelete = () => {
  deleteOpen.value = !deleteOpen.value;
}

const deleteDream = async () => {
  console.log('Delete dream');
  try {
    await pb.collection('dream').delete(dreamById.id);
    router.push('/journal');
  } catch (error) {
    console.error('Error deleting dream:', error);
  }
}

const aiVisible = ref(false);
const aiStarted = ref(false);

import { interpretDream } from '@/backend';
import { interpretationByDream } from '@/backend';

let record = ref<DreamResponse<{ interpretation_via_dream: InterpretationResponse[] }>>();

async function interpret() {
  const dreamId = route.params.id;

  // Check if an interpretation already exists for the dream
  const interpretationRecord = await pb.collection('interpretation').getFirstListItem(`dream="${dreamId}"`);

  if (interpretationRecord) {
    // If an interpretation already exists, display it
    aiVisible.value = true;
    record.value = await interpretationByDream(dreamId);
    console.log('Interpretation record:', record.value);
    console.log('interpretation_via_dream:', record.value.expand?.interpretation_via_dream);
  } else {
    // If no interpretation exists, display the "Explain with AI" button
    aiVisible.value = false;
  }
}


async function createInterpretation() {
  const dreamId = route.params.id;
  aiStarted.value = true;

  // Create a new interpretation record
  const interpretation = await interpretDream(dreamId);
  console.log('Interpretation:', interpretation);

  // Fetch the interpretation record for the dream
  record.value = await interpretationByDream(dreamId);
  console.log('Interpretation record:', record.value);

  // Display the interpretation
  aiStarted.value = false;
  aiVisible.value = true;
}

// Call the interpret function when the page is loaded

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

        
          <button
            v-if="!aiVisible && !aiStarted"
            @click="createInterpretation"
            class=" bg-fuchsia-900 rounded-full align-middle py-3 px-6 w-full text-amber-100 font-semibold mt-2">Explain with AI</button>
        </div>
        <p v-if="!aiVisible && aiStarted" class="text-sm text-violet-300 mb-3 font-light">Please, wait for a few seconds</p>
        <div v-if="aiVisible && record && !aiStarted" class="block h-0.5 w-full bg-amber-100 my-3"></div>
<div v-if="aiVisible && record && !aiStarted" class="transition-opacity duration-500">
  <h2>AI explanation</h2>
  <p v-for="interpretation in record.expand?.interpretation_via_dream" :key="interpretation.id">
    {{ interpretation.textInterpretation }}
  </p>
</div>
<div v-if="user?.id === pb.authStore.model?.id">
          <div class="flex gap-3">
            <button @click="openDelete"
              class=" bg-red-700 rounded-full align-middle py-3 px-6 w-full mt-1 font-semibold text-amber-100">Delete dream</button>
            <RouterLink :to="{
              name: '/editDream/[id]',
              params: {
                id: dreamById.id
              }
            }"
              class=" bg-fuchsia-900 rounded-full align-middle text-center py-3 px-6 w-full text-amber-100 font-semibold mt-1">Edit dream</RouterLink>
          </div>
          <div v-if="deleteOpen" class="transition-opacity duration-500">
            <p class="my-2">Are you sure you want to delete this dream?</p>
            <div class="flex gap-2">
              <button @click="deleteDream"
                class=" bg-red-700 rounded-full align-middle py-3 px-6 w-full text-amber-100 font-semibold mt-2">Yes, delete</button>
              <button @click="openDelete"
                class=" bg-fuchsia-900 rounded-full align-middle py-3 px-6 w-full text-amber-100 font-semibold mt-2">Cancel</button>
            </div>
          </div>
      </div>
    

      <div v-if="dreamById.published">
        <div class="flex gap-5">
          <div class="flex gap-1">
            <LikeIcon class="w-7 h-auto stroke-amber-100" @click="toggleLike" :class="{ 'fill-amber-100': isLiked }"/>
            <p class="my-auto">{{ likes }}</p>
          </div>
          <div class="flex gap-1">
            <CommentIcon class="w-7 h-auto"/>
            <p class="my-auto">{{ commentCount }}</p>
          </div>
        </div>
      </div>
      <div v-if="dreamById.published" class="w-full bg-indigo-900 p-1 flex align-middle justify-between gap-4">
        <form method="post" @submit="submit" class="w-full flex gap-4">
          <textarea type="text" class="h-fit text-14px text-amber-100 font-normal resize-none bg-indigo-900 rounded-xl w-full pl-2 py-2  my-auto border-2 border-amber-100 overflow-scroll" placeholder="Add a comment..." id="textComment" name="textComment"/>
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
</template>
