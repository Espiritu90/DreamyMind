<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { CommentResponse, DreamResponse, UsersResponse, LikePostResponse, InterpretationResponse  } from '@/pocketbase-types';
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
const likeCount = ref(0);
const commentCount = ref(0);

const route = useRoute('/dream/[id]');
console.log('id :', route.params.id);

const dreamById = await pb.collection<DreamResponse>('dream').getOne(route.params.id);
const user = ref<UsersResponse>();

const comments = ref<Array<{ comment: CommentResponse, user: UsersResponse }>>([]);

onMounted(async () => {
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

    for (const comment of dreamData.expand.comment_via_dream.reverse()) { // Reverse the comments array
      const userOfComment = await pb.collection<UsersResponse>('users').getOne(comment.user ?? '');

      // Prioritize logged-in user's comments by moving them to the beginning of the array
      if (userOfComment.id === loggedInUserId) {
        comments.value.unshift({ comment, user: userOfComment });
      } else {
        comments.value.push({ comment, user: userOfComment });
      }
    }
  }

  // Update the like count
  if (dreamData.expand?.likePost_via_dream) {
    likeCount.value = dreamData.expand.likePost_via_dream.length;

    // Check if the user has liked the post
    isLiked.value = dreamData.expand.likePost_via_dream.some(like => like.user === loggedInUserId);
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


const idUser = pb.authStore.model?.id;
const idPost = dreamById.id;

const doLikePost = async () => {
  try {
    if (isLiked.value) {
      // Find the like record to delete
      const likeRecords = await pb.collection<LikePostResponse>('likePost').getFullList({
        filter: `user="${idUser}" && dream="${idPost}"`,
      });

      if (likeRecords.length > 0) {
        await pb.collection('likePost').delete(likeRecords[0].id);
        isLiked.value = false;
        likeCount.value = Math.max(0, likeCount.value - 1);
      }
    } else {
      const data = { user: idUser, dream: idPost };
      await pb.collection<LikePostResponse>('likePost').create(data);
      isLiked.value = true;
      likeCount.value++;
    }
  } catch (error) {
    console.error('Error liking/unliking post:', error);
  }
};

const aiVisible = ref(false);

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

  // Create a new interpretation record
  const interpretation = await interpretDream(dreamId);
  console.log('Interpretation:', interpretation);

  // Fetch the interpretation record for the dream
  record.value = await interpretationByDream(dreamId);
  console.log('Interpretation record:', record.value);

  // Display the interpretation
  aiVisible.value = true;
}

// Call the interpret function when the page is loaded
onMounted(async () => {
  await interpret();
});

import StarsIcon from '@/components/icons/StarsIcon.vue';

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
          <div class="flex gap-2">
            <p class="text-amber-100 ">{{ user.username }}</p>
            <StarsIcon v-if="user.premium" class="w-4 h-4 self-start m-0"/>
        </div>
        </div>
      </RouterLink>

      <div>
        <h1>{{ dreamById.title }}</h1>
        <p>{{ dreamById.textDream }}</p>

       <button
            v-if="!aiVisible"
            @click="createInterpretation"
            class=" bg-fuchsia-900 rounded-full align-middle py-3 px-6 w-full text-amber-100 font-semibold mt-2">Explain with AI</button>
        </div>
        <div v-if="aiVisible && record" class="block h-0.5 w-full bg-amber-100 my-3"></div>
<div v-if="aiVisible && record" class="transition-opacity duration-500">
  <h2>AI explanation</h2>
  <p v-for="interpretation in record.expand?.interpretation_via_dream" :key="interpretation.id">
    {{ interpretation.textInterpretation }}
  </p>
</div>
<div v-if="user?.id === pb.authStore.model?.id">
          <div class="flex gap-3">
            <button @click="openDelete"
              class=" bg-red-700 rounded-full align-middle py-2.5 px-6 w-full text-amber-100 font-semibold mt-2">Delete dream</button>
            <RouterLink :to="{
              name: '/editDream/[id]',
              params: {
                id: dreamById.id
              }
            }"
              class=" bg-fuchsia-900 rounded-full align-middle text-center py-2.5 px-6 w-full text-amber-100 font-semibold mt-2">Edit dream</RouterLink>
          </div>
          <div v-if="deleteOpen" class="transition-opacity duration-500">
            <p class="my-2">Are you sure you want to delete this dream?</p>
            <div class="flex gap-2">
              <button @click="deleteDream"
                class=" bg-red-700 rounded-full align-middle py-2.5 px-6 w-full text-amber-100 font-semibold mt-2">Yes, delete</button>
              <button @click="openDelete"
                class=" bg-fuchsia-900 rounded-full align-middle py-2.5 px-6 w-full text-amber-100 font-semibold mt-2">Cancel</button>
            </div>
          </div>
      </div>

      <div>
        <div class="flex gap-5">
          <div class="flex gap-1">
            <LikeIcon class="w-7 h-auto stroke-amber-100" @click="doLikePost" :class="{ 'fill-amber-100': isLiked }"/>
            <p class="my-auto">{{ likeCount }}</p>
          </div>
          <div class="flex gap-1">
            <CommentIcon class="w-7 h-auto"/>
            <p class="my-auto">{{ commentCount }}</p>
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
</template>
