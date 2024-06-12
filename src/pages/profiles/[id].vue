<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue';
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';
import { publicDreamsOfUser } from '@/backend';
import { useRoute } from 'vue-router/auto';
import { ref, onMounted } from 'vue';

const route = useRoute('/profiles/[id]');
console.log('id:', route.params.id);

const record = ref();

onMounted(async () => {
  record.value = await publicDreamsOfUser(route.params.id);
  console.log(record.value.expand?.dream_via_user);
});

import StarsIcon from '@/components/icons/StarsIcon.vue';
</script>

<template>
  <div class="wrapper wrapper-flex" v-if="record">
    <div class="flex align-middle gap-4">
      <Avatar1 v-if="record.avatar === 1" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
      <Avatar2 v-if="record.avatar === 2" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
      <Avatar3 v-if="record.avatar === 3" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
      <Avatar4 v-if="record.avatar === 4" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
      <Avatar5 v-if="record.avatar === 5" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
      <Avatar6 v-if="record.avatar === 6" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
      <div class="flex gap-2">
            <h2 class="my-auto">{{ record.username }}</h2>
            <StarsIcon v-if="record.premium" class="w-8 h-8 my-auto"/>
        </div>
    </div>

      <PostCard v-for="oneDream in record.expand?.dream_via_user" :key="oneDream.id" :dream="oneDream" :user="record"/>

  </div>
</template>
