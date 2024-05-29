<script setup lang="ts">
import EditIcon from '@/components/icons/EditIcon.vue';
import { RouterLink } from 'vue-router';
import StarsIcon from '@/components/icons/StarsIcon.vue';
import LanguageDropdown from '@/components/LanguageDropdown.vue';
</script>

<template>
<div class="wrapper wrapper-flex !h-screen">
    <div class="flex align-middle gap-4">
        <img src="../../../public/img/avatar.png" alt="avatar" class="rounded-full w-20 h-20 border-2 bordrer-amber-100"/>
        <h2 class="my-auto">sleepy_user142</h2>
    </div>
    <div class="flex justify-around">
        <RouterLink to="/en/followers" class="font-semibold text-base text-amber-100">132 Followers</RouterLink> <!--change to {{ followers }}-->
        <RouterLink to="/en/following" class="font-semibold text-base text-amber-100">45 Following</RouterLink> <!--change to {{ following }}-->
    </div>
    <RouterLink to="/en/editProfile" class="flex justify-between bg-fuchsia-900 rounded-full align-middle py-2 px-6">
        <p class="font-semibold my-auto">Edit your profile</p>
        <EditIcon/>
    </RouterLink>

    <LanguageDropdown/>

    <RouterLink to="/en/premium" class="bg-gradient-to-tr from-[#F2EAD0] via-[#F7D977] to-[#F2EAD0] flex justify-between rounded-full align-middle py-2 px-6">
        <p class="font-semibold text-indigo-900 my-auto">Get premium</p>
        <StarsIcon class="w-8 h-8"/>
    </RouterLink>

    <div class="relative bottom-0 flex justify-between ">
        <p class="text-sm">&copy; DreamyMind 2024</p>
        <RouterLink to="/en/terms" class="text-amber-100 underline text-sm">Terms & Conditions</RouterLink>
    </div>
</div>
</template>