<script setup lang="ts">
import { RouterLink } from 'vue-router/auto'
import { ref, computed} from 'vue';
import { pb } from '@/backend';

const password1 = ref('');
const password2 = ref('');
const message = ref('');
const passwordsMatch = ref(false);
const email = ref('');
const name = ref('');
const username = ref('');
const terms = ref(false);

const checkPasswords = () => {
  if (password1.value.length < 8) {
    message.value = '*Your password must be at least 8 characters long';
    passwordsMatch.value = false;
  } else if (password1.value !== password2.value) {
    message.value = 'Passwords do not match.';
    passwordsMatch.value = false;
  } else {
    message.value = "";
    passwordsMatch.value = true;
  }
};
const messageClass = computed(() => {
  if (password1.value.length < 8 || password2.value.length < 8) {
    return 'error';
  }
  return passwordsMatch.value ? 'success' : 'error';
});

const handleSubmit = async () => {
  if (passwordsMatch.value) {
    try {
      const userData = {
        email: email.value,
        password: password1.value,
        passwordConfirm: password2.value,
        name: name.value,
        username: username.value,
      };

      const user = await pb.collection('users').create(userData);
      message.value = 'Account created successfully! You can now log in.';
      console.log(user);
      email.value = '';
      name.value = '';
      username.value = '';
      password1.value = '';
      password2.value = '';
      terms.value = false;
      passwordsMatch.value = false;
    } catch (error) {
      message.value = 'Error creating account: ' + error.message;
      console.error(error);
    }
  }
};
</script>

<template>
    <div class="p-6 pb-4 h-full">
    <h1>Welcome!</h1>
    <div class="bg-indigo-900 px-4 py-6 rounded-[32px]">
      <h2 class="mb-3">Sign Up</h2>
        <div class="px-3">
          <form 
          @submit.prevent="handleSubmit"
          class="flex flex-col px-1">

           <label for="name" >Name</label>
            <input type="text" id="name" placeholder="ex.: Emily" required v-model="name">
            <p class="text-[12px] text-violet-300 mb-3 font-extralight -m-2">*Your name will not be displayed to other users</p>

            <label for="email">Email</label>
            <input type="email" id="email" placeholder="ex.: emily@mail.com" 
          v-model="email"
          required>

            <label for="username">Username</label>
            <input type="text" id="username" placeholder="ex.: sleepy_user204" required v-model="username">

            <label for="password1">Create a password</label>
            <input type="password"
            id="password1"
            placeholder="********"
            v-model="password1"
            @input="checkPasswords"
            required>

            <label for="password">Repeat your password</label>
            <input type="password"
            id="password2"
            placeholder="********"
            v-model="password2"
            @input="checkPasswords"
            required>

            <p class="text-[12px] text-violet-300 mb-3 font-extralight -m-2" :class="messageClass">{{ message }}</p>

            <div class="flex flex-row justify-between gap-3">
                <input type="checkbox" id="terms" required class="w-6 h-6 mb-0 fill-none" v-model="terms">
                <p class="text-[12px] font-extralight my-auto">I have read and accept <a href="#" class="underline">Terms and conditions</a></p>
            </div>

            <button
            class="button_submit"
            :disabled="!passwordsMatch">
            Sign up
          </button>
          </form>

        </div>
      <p class="text-center">Already a user? <RouterLink to="/" class="font-semibold underline">Log in</RouterLink></p>
    </div>
  </div>
   <img src="../../public/img/gradient.png"
    class="-z-20 absolute top-0 left-0 h-screen object-cover opacity-70"/>
</template>