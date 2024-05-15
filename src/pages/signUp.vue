<script setup lang="ts">
import { RouterLink } from 'vue-router/auto'
</script>

<template>
    <div class="px-6 pt-4 pb-4 h-[calc(100vh-128px)]">
    <h1>Welcome!</h1>
    <div class="bg-indigo-900 px-4 py-6 rounded-[32px]">
      <h2 class="mb-3">Sign Up</h2>
        <div class="px-6">
          <form action="" class="flex flex-col px-1">
            <label for="useranme" class="pb-1">Name</label>
            <input type="text" placeholder="ex.: Emily" class="text-[14px] text-amber-100 font-normal placeholder:text-[14px] placeholder:text-amber-100 placeholder:font-light opacity-80 bg-indigo-900 shadow-[inset_0px_0px_6px_0px_rgba(30,27,75,1)] pl-2 py-2 placeholder:mx-auto rounded-xl mb-2">
            <p class="text-[12px] text-violet-300 mb-3 font-extralight">*Your name will not be displayed to other users</p>
            <label for="useranme" class="pb-1">Username</label>
            <input type="text" placeholder="ex.: sleepy_user204" class="text-[14px] text-amber-100 font-normal placeholder:text-[14px] placeholder:text-amber-100 placeholder:font-light opacity-80 bg-indigo-900 shadow-[inset_0px_0px_6px_0px_rgba(30,27,75,1)] pl-2 py-2 placeholder:mx-auto rounded-xl mb-5">
            <label for="password" class="pb-1">Create a password</label>
            <input type="text" placeholder="********" class="text-[14px] text-amber-100 font-normal placeholder:text-[14px] placeholder:text-amber-100 placeholder:font-light opacity-80 bg-indigo-900 shadow-[inset_0px_0px_6px_0px_rgba(30,27,75,1)] pl-2 py-2 placeholder:mx-auto rounded-xl mb-5">
            <label for="password" class="pb-1">Repeat your password</label>
            <input type="text" placeholder="********" class="text-[14px] text-amber-100 font-normal placeholder:text-[14px] placeholder:text-amber-100 placeholder:font-light opacity-80 bg-indigo-900 shadow-[inset_0px_0px_6px_0px_rgba(30,27,75,1)] pl-2 py-2 placeholder:mx-auto rounded-xl mb-5">
            <p class="text-[12px] text-violet-300 mb-3 font-extralight">*Your password must be at least 8 characters long</p>
            <div class="flex flex-row justify-between">
                <input type="checkbox">
                <p>I have read and accept <a href="#" class="underline">Terms and conditions</a></p>
            </div>
            <button type="submit" class="mx-[-24px] rounded-full bg-fuchsia-900 py-[10px] font-semibold text-amber-100 my-5">Sign up</button>
          </form>
        </div>
      <p class="text-center">Already a user? <RouterLink to="/" class="font-semibold underline">Log in</RouterLink></p>
    </div>
  </div>
    <img src="../../public/img/gradient.png"
    class=" z-[-1] absolute top-0 left-0 h-screen object-cover opacity-70"/>
</template>