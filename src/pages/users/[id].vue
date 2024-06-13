<script setup lang="ts">
import { RouterLink } from 'vue-router';
import StarsIcon from '@/components/icons/StarsIcon.vue';
import { pb } from '@/backend';
import { useRouter } from 'vue-router/auto';
import { ref, onMounted } from 'vue';
import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue';
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';
const router = useRouter();

const doLogout = () =>{
pb.authStore.clear();
router.push({ name: '/' });
setTimeout(() => {
    location.reload();
}, 500);
}

onMounted(async () => {
  if (!pb.authStore.model) {
    router.push('/');
  }
});
</script>

<template>
<div class="wrapper wrapper-flex !h-screen">
    <div class="flex align-middle gap-4">
        <Avatar1 v-if="pb.authStore.model?.avatar === 1" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar2 v-if="pb.authStore.model?.avatar === 2" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar3 v-if="pb.authStore.model?.avatar === 3" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar4 v-if="pb.authStore.model?.avatar === 4" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar5 v-if="pb.authStore.model?.avatar === 5" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <Avatar6 v-if="pb.authStore.model?.avatar === 6" class="rounded-full w-20 h-20 border-2 border-amber-100"/>
        <div class="flex gap-2">
            <h2 class="my-auto">{{ pb.authStore.model?.username }}</h2>
            <StarsIcon v-if="pb.authStore.model?.premium" class="w-8 h-8 my-auto"/>
        </div>
    </div>

    </div>
        <RouterLink :to="{
        name: '/edit/[id]',
        params: {
          id: pb.authStore.model?.id
        }
      }" class="flex justify-between bg-fuchsia-900 rounded-full align-middle py-4 px-6">
        <p class="font-semibold my-auto">Edit your profile</p>
    </RouterLink>

    <button @click="doLogout" class="flex justify-between bg-fuchsia-900 rounded-full align-middle px-6 font-semibold text-amber-100 py-4">
    Log out
    </button>

     <RouterLink to="/premium" class="bg-gradient-to-tr from-[#F2EAD0] via-[#F7D977] to-[#F2EAD0] flex justify-between rounded-full align-middle py-2 px-6" v-if="!pb.authStore.model.premium">
        <p class="font-semibold text-indigo-900 my-auto">Get premium</p>
        <StarsIcon class="w-8 h-8"/>
    </RouterLink>

    <div class="relative bottom-0 flex justify-between ">
        <p class="text-sm">&copy; DreamyMind 2024</p>
        <a href="https://dreamy-mind.ozone-digital.fr/terms-and-conditions-of-use/" class="underline text-amber-100 text-sm">Terms & Conditions</a>
    </div>
</div>
</template>