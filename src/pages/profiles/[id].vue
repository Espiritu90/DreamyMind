<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue';
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';
import { dreamsOfUser } from '@/backend';
import { useRoute } from 'vue-router/auto';

const route = useRoute('/posts/[id]');
console.log('id:', route.params.id);

 const record = await dreamsOfUser(route.params.id);
    console.log(record.expand?.dream_via_user);
</script>
<template>
    <div class="wrapper">
        <div class="flex align-middle gap-4">
        <Avatar1 v-if="record.avatar === 1" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar2 v-if="record.avatar === 2" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar3 v-if="record.avatar === 3" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar4 v-if="record.avatar === 4" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar5 v-if="record.avatar === 5" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar6 v-if="record.avatar === 6" class="rounded-full w-20 h-20 border-2 border-amber-100"/>

        <h2 class="my-auto">{{record.username}}</h2>
    </div>


    <PostCard v-for="oneDream in record.expand?.dream_via_user" :key="oneDream.id" v-bind="oneDream"/>
    </div>
</template>