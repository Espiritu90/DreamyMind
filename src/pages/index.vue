<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { RouterLink } from 'vue-router/auto'
import { ref } from 'vue';
import { pb } from '@/backend';
import { useRouter } from 'vue-router';
const username = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();
const currentUser = ref();

const handleSubmit = async () => {
  try {
    const authData = await pb.collection('users').authWithPassword(username.value, password.value);
    message.value = 'Login successful!';
    console.log(authData);
    username.value = '';
    password.value = '';
    router.push('/home');
    currentUser.value = pb.authStore.model
    console.log(currentUser.value);
  } catch (error) {
    message.value = 'Error logging in: ' + (error as any).message;
    console.error(error);
  }
};
</script>

<template>
  <div class="p-6 pb-4 h-screen">
    <h1>Welcome!</h1>
    <div class="bg-indigo-900 px-4 py-6 rounded-[32px]">
      <h2 class="mb-3">Log in</h2>
        <div class="px-3">
            <form @submit.prevent="handleSubmit" class="flex flex-col px-1">
            <label for="useranme">Username</label>
            <input type="text" placeholder="ex.: sleepy_user204" v-model="username" id="username" required />
            <label for="password">Password</label>
            <input type="password" placeholder="********" v-model="password" id="password" required/>
            <button type="submit" class="button_submit">Log in</button>
            <p id="message">{{ message }}</p>
          </form>
        </div>
      <p class="text-center">Not a user yet? <RouterLink to="/signUp" class="font-semibold underline">Sign up</RouterLink></p>
      </div>
  </div>
    <img src="../../public/img/gradient.png"
    class="-z-10 absolute top-0 left-0 h-screen object-cover opacity-70"/>

    
</template>
