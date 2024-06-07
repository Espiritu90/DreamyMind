<script setup lang="ts">
import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue';
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';
import { pb } from '@/backend';
</script>

<template>
  <div class="wrapper">
    <h1>My profile</h1>
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5">
        <div class="flex justify-around">
            <div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="1" name="avatar" value="1" class="w-fit">
                    <label for="1">
                        <Avatar1 />
                    </label>
                </div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="2" name="avatar" value="2" class="w-fit">
                    <label for="2">
                        <Avatar2 />
                    </label>
                </div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="3" name="avatar" value="3" class="w-fit">
                    <label for="3">
                        <Avatar3 />
                    </label>
                </div>
            </div>

            <div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="4" name="avatar" value="4" class="w-fit">
                    <label for="4">
                        <Avatar4 />
                    </label>
                </div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="5" name="avatar" value="5" class="w-fit">
                    <label for="5">
                        <Avatar5 />
                    </label>
                </div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="6" name="avatar" value="6" class="w-fit">
                    <label for="6">
                        <Avatar6 />
                    </label>
                </div>
            </div>
        </div>
      <label for="Name">Name</label>
      <input type="text" id="Name" name="Name" :value="pb.authStore.model.name">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" :value="pb.authStore.model.username">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" :value="pb.authStore.model.email">
      <button type="submit" class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6">Update profile</button>
    </div>
  </div>
</template>