<script setup lang="ts">
import AddHomeIcon from '@/components/icons/AddHomeIcon.vue';
import ReportHomeIcon from '@/components/icons/ReportHomeIcon.vue';
import StarsIcon from '@/components/icons/StarsIcon.vue';
import Button from '@/components/Button.vue';
import PostCard from '@/components/PostCard.vue';
import { RouterLink } from 'vue-router/auto';
import { pb } from '@/backend';
import { ref, onMounted } from 'vue';
import MoonIcon from '@/components/icons/MoonIcon.vue';
import { getMostLikedPostLastWeek } from '@/backend';
import type { DreamResponse, UsersResponse } from '@/pocketbase-types';

const name = ref('');
const mostLikedPost = ref<{ dream: DreamResponse, user: UsersResponse } | null>(null);

// Fetch current user data on component mount
onMounted(async () => {
  try {
    const authUser = pb.authStore.model;
    if (authUser) {
      name.value = authUser.name;
    } else {
      console.warn('No authenticated user found');
    }

    mostLikedPost.value = await getMostLikedPostLastWeek();
  } catch (error) {
    console.error('Failed to fetch user or most liked post', error);
  }
});
</script>

<template>
    <div class="wrapper wrapper-flex">
        <h1>Welcome, {{name}}!</h1>
        <Button text="Add a new dream" variant="default" size="full" url="/newDream" :icon="AddHomeIcon"/>
        <Button text="View your AI report" variant="default" size="full" url="/stats" :icon="ReportHomeIcon"/>
        <div class="flex gap-3 align-middle">
          <h2>The dream of the week</h2>
              <MoonIcon class="h-max-6 my-auto"/>
        </div>
        <div v-if="mostLikedPost">
          <PostCard :dream="mostLikedPost.dream" :user="mostLikedPost.user" />
        </div>
        <RouterLink v-if="!pb.authStore.model?.premium" to="/premium" class="bg-gradient-to-tr from-[#F2EAD0] via-[#F7D977] to-[#F2EAD0] flex justify-between gap-16 py-5 px-6 rounded-[32px]" >
            <div class="flex flex-col justify-between" >
                <h3 class="text-indigo-900">Get Premium</h3>
                <p class="text-indigo-900 ">Explore our unique features</p>
            </div>
            <StarsIcon/>
        </RouterLink>
    </div>
</template>
