<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import { pb } from '@/backend';
import { ref, onMounted } from 'vue';
import type { DreamResponse, UsersResponse } from '@/pocketbase-types';
import { useRouter } from 'vue-router/auto';
const router = useRouter();

const dreamsWithUsers = ref<Array<{ dream: DreamResponse, user: UsersResponse }>>([]);

onMounted(async () => {
  if (!pb.authStore.model) {
    router.push('/');
  }
  const allDreamsPublished = await pb.collection('dream').getFullList({ filter: 'published = true', sort: "-created" });

  for (const dream of allDreamsPublished) {
    const user = await pb.collection('users').getOne(dream.user);
    dreamsWithUsers.value.push({ dream, user });
  }
});


</script>

<template>
    <div class="wrapper wrapper-flex">
        <h1>Feed</h1>
        <PostCard v-for="item in dreamsWithUsers" :key="item.dream.id" :dream="item.dream" :user="item.user"/>
    </div>
</template>
