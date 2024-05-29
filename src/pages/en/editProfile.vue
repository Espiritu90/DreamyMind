<script setup lang="ts">
import { pb } from '@/backend';
import { ref, onMounted } from 'vue';
const name = ref('');
const username = ref('');
const email = ref('');
onMounted(async () => {
  try {
    const authUser = pb.authStore.model;
    if (authUser) {
      name.value = authUser.name;
        username.value = authUser.username;
        email.value = authUser.email;
    } else {
      console.warn('No authenticated user found');
    }
  } catch (error) {
    console.error('Failed to fetch user', error);
  }
});
</script>

<template>
    <div class="wrapper">
        <h1>My profile</h1>
        <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5">
            <!--change avatar-->
            <form>
                <label for="Name">Name</label>
                <input type="text" id="Name" name="Name"  :placeholder="name">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" :placeholder="username">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" :placeholder="email">
                <button type="submit" class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6">Update profile</button>
            </form>
            <RouterLink to="/en/changePassword" class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6 mt-3">Change password</RouterLink>
        </div>
    </div>
</template>