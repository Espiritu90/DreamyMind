<script setup lang="ts">
import { RouterLink } from 'vue-router/auto'
import GradientBg from '@/components/icons/GradientBg.vue';
</script>

<template>
  <div class="px-6 pt-4 pb-4 h-[calc(100vh-128px)]">
    <h1>Welcome!</h1>
    <div class="bg-indigo-900 px-4 py-6 rounded-[32px]">
      <h2 class="mb-3">Log in</h2>
        <div class="px-6">
          <form action="" class="flex flex-col px-1">
            <label for="useranme" class="pb-1">Username</label>
            <input type="text" placeholder="ex.: sleepy_user204" class="text-[14px] text-amber-100 font-normal placeholder:text-[14px] placeholder:text-amber-100 placeholder:font-light placeholder:opacity-80 bg-indigo-900 shadow-[inset_0px_0px_6px_0px_rgba(30,27,75,1)] pl-2 py-2 placeholder:mx-auto rounded-xl mb-5">
            <label for="password" class="pb-1">Password</label>
            <input type="text" placeholder="********" class="text-[14px] text-amber-100 font-normal placeholder:text-[14px] placeholder:text-amber-100 placeholder:font-light placeholder:opacity-80 bg-indigo-900 shadow-[inset_0px_0px_6px_0px_rgba(30,27,75,1)] pl-2 py-2 placeholder:mx-auto rounded-xl mb-5">
            <button type="submit" class="mx-[-24px] rounded-full bg-fuchsia-900 py-[10px] font-semibold text-amber-100 my-5">Log in</button>
          </form>
        </div>
      <p class="text-center">Not a user yet? <RouterLink to="/signUp" class="font-semibold underline">Sign up</RouterLink></p>
    </div>
  </div>
    <img src="../../public/img/gradient.png"
    class=" z-[-1] absolute top-0 left-0 h-screen object-cover opacity-70"/>
</template>
