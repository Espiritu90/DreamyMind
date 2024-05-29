<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import AddIcon from './icons/AddIcon.vue';
import FeedIcon from './icons/FeedIcon.vue';
import JournalIcon from './icons/JournalIcon.vue';
import ProfileIcon from './icons/ProfileIcon.vue';
import ReportIcon from './icons/ReportIcon.vue';
import { computed } from 'vue';


const route = useRoute();

// Extraire la langue de l'URL
const language = computed(() => {
  const segments = route.path.split('/');
  const langSegment = segments[1]; // Le segment de langue est normalement le premier segment de l'URL
  // Vérifiez si le segment de langue correspond à 'en' ou 'fr', sinon, utilisez 'en' par défaut
  return langSegment === 'en' || langSegment === 'fr' ? langSegment : 'en';
});

// Générer le lien en utilisant la langue extraite de l'URL
const generateLink = (path: string) => {
  return `/${language.value}${path}`;
};

// Obtenir le chemin actuel de la route
const currentRoute = computed(() => route.path);
</script>

<template>
  <div class="max-w-full bg-indigo-900 flex flex-row fixed w-full bottom-0 left-0 justify-center gap-10 h-16 drop-shadow">
    <RouterLink :to="generateLink('/feed')" class="flex flex-col justify-center gap-1 w-11 items-center">
      <FeedIcon :class="currentRoute.includes('/feed') ? ' stroke-amber-100' : 'w-[30px] h-[30px] self-center'" />
      <p :class="currentRoute.includes('/feed') ? 'leading-3 text-amber-100 font-fixel font-normal text-[12px] text-center' : 'leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center'">Feed</p>
    </RouterLink>

    <RouterLink :to="generateLink('/stats')" class="flex flex-col justify-center gap-1 w-11 items-center">
      <ReportIcon 
        :width="30" 
        :height="30" 
        :strokeColor="currentRoute.includes('/stats') ? '#fef3c7' : '#C4B5FD'" 
        :fillColor="currentRoute.includes('/stats') ? '#fef3c7' : '#C4B5FD'"
      />
      <p :class="currentRoute.includes('/stats') ? 'leading-3 text-amber-100 font-fixel font-normal text-[12px] text-center' : 'leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center'">Stats</p>
    </RouterLink>

    <RouterLink :to="generateLink('/newDream')" class="flex justify-center ">
      <AddIcon class="w-[50px] h-[50px] self-center" />
    </RouterLink>

    <RouterLink :to="generateLink('/journal')" class="flex flex-col justify-center gap-1 w-11 items-center">
      <JournalIcon :class="currentRoute.includes('/journal') ? 'w-[30px] h-[30px] self-center stroke-amber-100 text-amber-100' : 'w-[30px] h-[30px] self-center'" />
      <p :class="currentRoute.includes('/journal') ? 'leading-3 text-amber-100 font-fixel font-normal text-[12px] text-center' : 'leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center'">Journal</p>
    </RouterLink>

    <RouterLink :to="generateLink('/profile')" class="flex flex-col justify-center gap-1 w-11 items-center">
      <ProfileIcon :class="currentRoute.includes('/profile') ? 'w-[30px] h-[30px] self-center stroke-amber-100 text-amber-100' : 'w-[30px] h-[30px] self-center'" />
      <p :class="currentRoute.includes('/profile') ? 'leading-3 text-amber-100 font-fixel font-normal text-[12px] text-center' : 'leading-3 text-violet-300 font-fixel font-normal text-[12px] text-center'">Profile</p>
    </RouterLink>
  </div>
</template>


