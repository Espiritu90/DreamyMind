<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import AddIcon from './icons/AddIcon.vue';
import FeedIcon from './icons/FeedIcon.vue';
import JournalIcon from './icons/JournalIcon.vue';
import ProfileIcon from './icons/ProfileIcon.vue';
import ReportIcon from './icons/ReportIcon.vue';
import { pb } from '@/backend';
const route = useRoute();
</script>

<template>
  <div class="max-w-full bg-indigo-900 flex flex-row z-10 fixed w-full bottom-0 left-0 justify-center gap-10 h-16 drop-shadow">
    <RouterLink to="/feed" class="flex flex-col justify-center gap-1 w-11 items-center">
      <FeedIcon :class="route.path==='/feed' ? ' stroke-amber-100' : 'w-[30px] h-[30px] self-center'" />
      <p :class="route.path==='/feed' ? 'leading-3 text-amber-100 font-fixel font-normal text-[12px] text-center' : 'leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center'">Feed</p>
    </RouterLink>

    <RouterLink to="/stats" class="flex flex-col justify-center gap-1 w-11 items-center">
      <ReportIcon 
        :width="30" 
        :height="30" 
        :strokeColor="route.path==='/stats' ? '#fef3c7' : '#C4B5FD'" 
        :fillColor="route.path==='/stats' ? '#fef3c7' : '#C4B5FD'"
      />
      <p :class="route.path==='/stats' ? 'leading-3 text-amber-100 font-fixel font-normal text-[12px] text-center' : 'leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center'">Stats</p>
    </RouterLink>

    <RouterLink to="/newDream" class="flex justify-center ">
      <AddIcon class="w-[50px] h-[50px] self-center"
      />
    </RouterLink>

    <RouterLink to="/journal" class="flex flex-col justify-center gap-1 w-11 items-center">
      <JournalIcon :class="route.path==='/journal' ? 'w-[30px] h-[30px] self-center stroke-amber-100 text-amber-100' : 'w-[30px] h-[30px] self-center'" />
      <p :class="route.path==='/journal' ? 'leading-3 text-amber-100 font-fixel font-normal text-[12px] text-center' : 'leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center'">Journal</p>
    </RouterLink>

    <RouterLink  :to="{
        name: '/users/[id]',
        params: {
          id: pb.authStore.model.id
        }
      }" class="flex flex-col justify-center gap-1 w-11 items-center">
      <ProfileIcon :class="route.path.startsWith('/users/') ? 'w-[30px] h-[30px] self-center stroke-amber-100 text-amber-100' : 'w-[30px] h-[30px] self-center'" />
      <p :class="route.path.startsWith('/users/') ? 'leading-3 text-amber-100 font-fixel font-normal text-[12px] text-center' : 'leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center'">Profile</p>
        </RouterLink>
  </div>
</template>


