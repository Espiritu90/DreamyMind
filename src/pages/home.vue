<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import AddHomeIcon from '@/components/icons/AddHomeIcon.vue';
import ReportHomeIcon from '@/components/icons/ReportHomeIcon.vue';
import StarsIcon from '@/components/icons/StarsIcon.vue';
import MoonIcon from '@/components/icons/MoonIcon.vue';
import Button from '@/components/Button.vue';
import PostCard from '@/components/PostCard.vue';
import { RouterLink } from 'vue-router/auto';
import { pb } from '@/backend';
import { ref, onMounted } from 'vue';
const name = ref('');

// Fetch current user data on component mount
onMounted(async () => {
  try {
    const authUser = pb.authStore.model;
    if (authUser) {
      name.value = authUser.name;
    } else {
      console.warn('No authenticated user found');
    }
  } catch (error) {
    console.error('Failed to fetch user', error);
  }
});
</script>

<template>
    <div class="p-6 pb-4 h-full flex flex-col gap-5">
        <h1>Welcome, {{name}}!</h1>
        <Button text="Add a new dream" variant="default" size="full" url="/newDream" :icon="AddHomeIcon"/>
        <Button text="View your AI report" variant="default" size="full" url="/stats" :icon="ReportHomeIcon"/>
        <div class="my-3 bg-indigo-900 border-2 border-amber-100 rounded-[32px] pt-8 p-5">
            <div class="flex justify-between">
                <h3>The dream of the week</h3>
                <MoonIcon class="h-max-6"/>
            </div>
            <div class="block h-0.5 w-full rounded-full my-2 bg-amber-100"></div>
            <div>
                <div class="flex justify-between">
                    <div class="flex align-middle gap-2">
                        <img src="/img/avatar.png" alt="avatar" class="h-8 w-max-full">
                        <p class="my-auto">sleepy_user142</p>
                    </div>
                    <p class="my-auto">feb 23</p>
                </div>
                <div class="px-3 pt-2">
                    <h2>Enchanted Forest</h2>
                    <p class="bg-gradient-to-t from-transparent from-[1%] via-amber-100 via-30% to-amber-100 text-transparent bg-clip-text">As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take...</p>
                </div>
                   <RouterLink to="/" class="text-base text-amber-100 bg-indigo-900 h-fit"><p class="font-semibold text-center">Continue reading</p></RouterLink>
            </div>
        </div>
        <PostCard variant="profile" userAvatar="/img/avatar.png" user="sleepy_user142" date="feb 23" title="Enchanted Forest" text="As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take..."/>
        <RouterLink to="/" class="bg-gradient-to-tr from-[#F2EAD0] via-[#F7D977] to-[#F2EAD0] flex justify-between gap-16 py-5 px-6 rounded-[32px]">
            <div class="flex flex-col justify-between">
                <h3 class="text-indigo-900">Get Premium</h3>
                <p class="text-indigo-900 ">Explore our unique features</p>
            </div>
            <StarsIcon/>
        </RouterLink>
    </div>
    <img src="../../public/img/gradient.png"
    class="absolute top-0 left-0 h-screen object-cover object-right-top opacity-70 -z-20"/>
</template>