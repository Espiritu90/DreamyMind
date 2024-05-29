<script setup lang="ts">
import EditIcon from '@/components/icons/EditIcon.vue';
import { RouterLink } from 'vue-router';
import StarsIcon from '@/components/icons/StarsIcon.vue';
import LanguageDropdown from '@/components/LanguageDropdown.vue';
</script>

<template>
<div class="wrapper wrapper-flex !h-screen">
    <div class="flex align-middle gap-4">
        <img src="../../public/img/avatar.png" alt="avatar" class="rounded-full w-20 h-20 border-2 bordrer-amber-100"/>
        <h2 class="my-auto">sleepy_user142</h2>
    </div>
    <div class="flex justify-around">
        <p class="font-semibold">132 Followers</p> <!--change to {{ followers }}-->
        <p class="font-semibold">45 Following</p> <!--change to {{ following }}-->
    </div>
    <RouterLink to="/editProfile" class="flex justify-between bg-fuchsia-900 rounded-full align-middle py-2 px-6">
        <p class="font-semibold my-auto">Edit your profile</p>
        <EditIcon/>
    </RouterLink>

    <LanguageDropdown/>

    <RouterLink to="/premium" class="bg-gradient-to-tr from-[#F2EAD0] via-[#F7D977] to-[#F2EAD0] flex justify-between rounded-full align-middle py-2 px-6">
        <p class="font-semibold text-indigo-900 my-auto">Get premium</p>
        <StarsIcon class="w-8 h-8"/>
    </RouterLink>
</div>
</template>