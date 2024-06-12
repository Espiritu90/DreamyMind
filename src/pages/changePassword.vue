<script setup>
import { pb } from '@/backend';
import { ref } from 'vue';
const isError = ref(false);
const isSucces = ref(false);
console.log('user id: ', pb.authStore.model?.id);
console.log('user token: ', pb.authStore.token);

const email = ref('');  
import { useRouter } from 'vue-router/auto';
const router = useRouter();
const doRequest = async () => {

  try {
    await pb.collection('users').requestPasswordReset(email.value);
    isError.value = false;
    console.log('Password reset email sent to ' + email.value);
    isSucces.value = true;
    pb.authStore.clear();
    router.push({ name: '/' });
    setTimeout(() => {
      location.reload();
    }, 500);
} catch (error) {
      console.error('Login Error:', error);
      isError.value = true;
  }
};

import { onMounted } from 'vue';
onMounted(async () => {
  if (!pb.authStore.model) {
    router.push('/');
  }
});
</script>

<template>
    <div class="wrapper !h-screen">
    <h1>Reset your password</h1>
    <div class="bg-indigo-900 px-4 py-6 rounded-[32px] mt-1">
      <div class="px-3">
        <p class="mb-3">Enter your username or email address so we can send you the recovery link.</p>
        <form class="flex flex-col px-1">
          <label for="email" class=""> Email</label>
          <input type="email" placeholder="ex.: emily@mail.com" v-model="email" id="email" name="email" required />
          <p v-if="isError" class="text-sm text-violet-300  font-light mb-2">Invalid email</p>
          <p v-if="isSucces" class="text-sm text-violet-300  font-light mb-2">Password reset email sent!</p>
          <button type="button" @click="doRequest" class="button_submit m-0">Send email</button>
        </form>
      </div>
    </div>
  </div>
</template>