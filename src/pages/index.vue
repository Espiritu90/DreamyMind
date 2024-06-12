<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router/auto';
import { ref } from 'vue';
import { pb } from '@/backend';
import { onMounted } from 'vue';

// Define reactive variables
const username = ref('');
const password = ref('');
const router = useRouter();
const currentUser = ref();
const isError = ref(false);

onMounted(() => {
  pb.authStore.onChange(() => {
    currentUser.value = pb.authStore.model;
  }, true);
  if (currentUser.value) {
  router.push('/home');
}
});

// Log in
const doLogin = async () => {
  try {
    const authData = await pb.collection('users').authWithPassword(username.value, password.value);
    console.log('Auth Data:', authData);

    console.log('Is Valid:', pb.authStore.isValid);
    console.log('Token:', pb.authStore.token);
    console.log('Model:', pb.authStore.model);

    if (pb.authStore.model) {
      router.push('/home');
      setTimeout(() => {
    location.reload();
}, 500);
    }
  } catch (error) {
      console.error('Login Error:', error);
      isError.value = true;
  }
};


</script>

<template>
  <div class="p-6 pb-4 h-screen">
    <h1>Welcome!</h1>
    <div class="bg-indigo-900 px-4 py-6 rounded-[32px]">
      <h2 class="mb-3">Log in</h2>
      <div class="px-3">
        <form class="flex flex-col px-1">
          <label for="username">Username</label>
          <input type="text" placeholder="ex.: sleepy_user204" v-model="username" id="username" name="username" required />
          <label for="password">Password</label>
          <input type="password" placeholder="********" v-model="password" id="password" name="password" required />
          <p v-if="isError" class="text-sm text-violet-300  font-light ">Invalid username or password</p>
          <button type="button" @click="doLogin" class="button_submit">Log in</button>
        </form>
      </div>
      <p class="text-center">Not a user yet? <RouterLink to="/signUp" class="font-semibold underline">Sign up</RouterLink></p>
    </div>
  </div>
</template>
