<script setup lang="ts">
import { RouterLink } from 'vue-router/auto'
import AddIcon from './icons/AddIcon.vue';
import FeedIcon from './icons/FeedIcon.vue';
import JournalIcon from './icons/JournalIcon.vue';
import ProfileIcon from './icons/ProfileIcon.vue';
import ReportIcon from './icons/ReportIcon.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const currentRoute = route.path;
console.log(currentRoute);
</script>

<template>
  <div class="max-w-full bg-indigo-900 flex flex-row sticky bottom-0 left-0 justify-center gap-10 h-16 drop-shadow">
      <RouterLink to="/feed" class="flex flex-col justify-center gap-1" >
        <FeedIcon class="w-[30px] h-[30px] self-center" :class="currentRoute==='/feed'? 'stroke-amber-100' : ''"/>
        <p class="leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center">Feed</p>
      </RouterLink>

      <RouterLink to="/stats" class="flex flex-col justify-center gap-1">
        <ReportIcon class="w-[30px] h-[30px] self-center" :class="currentRoute==='/stats'? 'stroke-amber-100' : ''"/>
        <p class="leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center">Stats</p>
      </RouterLink>

      <RouterLink to="/newDream" class="flex justify-center">
        <AddIcon class="w-[50px] h-[50px] self-center"/>
      </RouterLink>

      <RouterLink to="/journal" class="flex flex-col justify-center gap-1">
        <JournalIcon class="w-[30px] h-[30px] self-center"/>
        <p class="leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center">Journal</p>
      </RouterLink>

      <RouterLink to="/profile" class="flex flex-col justify-center gap-1">
        <ProfileIcon class="w-[30px] h-[30px] self-center"/>
        <p class="leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center">Profile</p>
      </RouterLink>
  </div>
</template>