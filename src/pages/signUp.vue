<script setup lang="ts">
import { pb } from '@/backend';
import { useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue'; 
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';

const router = useRouter();
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const currentUser = ref();
const name = ref("");
const username = ref("");
const terms = ref(false);
const message = ref("");
const passwordsMatch = ref(false);
const avatar = ref(1);
const isError = ref(false);
const usernameMessage = ref("");

if (currentUser.value) {
  router.push('/home');
}

const validateUsername = () => {
  // Regex: only letters and numbers, minimum 3 characters, maximum 20 characters
  const regex = /^[a-zA-Z0-9]{3,20}$/;
  if (!regex.test(username.value)) {
    usernameMessage.value = 'Username must be 3-20 characters long and contain only letters and numbers.';
  } else {
    usernameMessage.value = '';
  }
};

const doSignUp = async () => {
  validateUsername(); // Ensure username is valid before proceeding
  if (usernameMessage.value) {
    isError.value = true;
    return;
  }

  if (terms.value === true) {
    const data = {
      username: username.value,
      email: email.value,
      emailVisibility: true,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      name: name.value,
      avatar: avatar.value
    };

    try {
      const record = await pb.collection('users').create(data);
      console.log(pb.authStore.model);
      await pb.collection('users').requestVerification(email.value);
      await doLogin();
    } catch (error) {
      console.error(error);
      isError.value = true;

      if (error.data && error.data.code === "username_conflict") {
        message.value = 'The username is already taken. Please choose a different username.';
      } else if (error.data && error.data.code === "email_conflict") {
        message.value = 'The email is already registered. Please use a different email or log in.';
      } else {
        message.value = 'Error signing up. Please verify that all fields are filled correctly.';
      }
    }
  }
};

const doLogin = async () => {
  const authData = await pb.collection('users').authWithPassword(email.value, password.value);
  console.log(pb.authStore.isValid);
  console.log(pb.authStore.token);
  console.log(pb.authStore.model);
  if (pb.authStore.model) {
    router.push({ name: '/home', params: { id: pb.authStore.model.id } });
  }
  setTimeout(() => {
    location.reload();
  }, 500);
};

// Function to check if passwords match
const checkPasswords = () => {
  if (password.value.length < 8) {
    message.value = '*Your password must be at least 8 characters long';
    passwordsMatch.value = false;
  } else if (password.value !== passwordConfirm.value) {
    message.value = 'Passwords do not match.';
    passwordsMatch.value = false;
  } else {
    message.value = "";
    passwordsMatch.value = true;
  }
};

// Watch the username input and validate on change
watch(username, validateUsername);

// Computed property to determine the CSS class for the message
const messageClass = computed(() => {
  if (password.value.length < 8 || passwordConfirm.value.length < 8) {
    return 'error';
  }
  return passwordsMatch.value ? 'success' : 'error';
});
</script>

<template>
  <div class="wrapper">
    <h1>Welcome!</h1>
    <div class="bg-indigo-900 px-4 py-6 rounded-[32px]">
      <h2 class="mb-3">Sign Up</h2>
      <div class="px-3">
        <form class="flex flex-col px-1">

          <!-- Name input -->
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="ex.: Emily" required v-model="name">
          <p class="text-sm text-violet-300 mb-3 font-light -m-2">*Your name will not be displayed to other users</p>

          <!-- Email input -->
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="ex.: emily@mail.com" v-model="email" required>

          <!-- Username input -->
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="ex.: sleepy_user204" required v-model="username">
          <p class="text-sm text-violet-300 mb-3 font-light -m-2" v-if="usernameMessage">{{ usernameMessage }}</p>

          <!-- Avatar selection -->
          <label>Pick your avatar</label>
          <div class="flex justify-around">
            
            <div>
              <div class="flex align-middle gap-4">
                <input type="radio" id="1" name="avatar" value="1" class="w-fit" v-model="avatar">
                <label for="1">
                  <Avatar1 />
                </label>
              </div>
              <div class="flex align-middle gap-4">
                <input type="radio" id="2" name="avatar" value="2" class="w-fit" v-model="avatar">
                <label for="2">
                  <Avatar2 />
                </label>
              </div>
              <div class="flex align-middle gap-4">
                <input type="radio" id="3" name="avatar" value="3" class="w-fit" v-model="avatar">
                <label for="3">
                  <Avatar3 />
                </label>
              </div>
            </div>

            <div>
              <div class="flex align-middle gap-4">
                <input type="radio" id="4" name="avatar" value="4" class="w-fit" v-model="avatar">
                <label for="4">
                  <Avatar4 />
                </label>
              </div>
              <div class="flex align-middle gap-4">
                <input type="radio" id="5" name="avatar" value="5" class="w-fit" v-model="avatar">
                <label for="5">
                  <Avatar5 />
                </label>
              </div>
              <div class="flex align-middle gap-4">
                <input type="radio" id="6" name="avatar" value="6" class="w-fit" v-model="avatar">
                <label for="6">
                  <Avatar6 />
                </label>
              </div>
            </div>
          </div>

          <!-- Password input -->
          <label for="password1">Create a password</label>
          <input type="password" id="password1" placeholder="********" v-model="password" @input="checkPasswords" required>

          <!-- Confirm password input -->
          <label for="password">Repeat your password</label>
          <input type="password" id="password2" placeholder="********" v-model="passwordConfirm" @input="checkPasswords" required>

          <!-- Password message -->
          <p class="text-sm text-violet-300 mb-3 font-light -m-2" :class="messageClass">{{ message }}</p>

          <!-- Terms and conditions checkbox -->
          <div class="flex flex-row justify-between gap-3">
            <input type="checkbox" id="terms" v-model="terms" required class="hidden" />
            <label for="terms" class="flex items-center cursor-pointer">
              <span class="w-6 h-6 bg-transparent border-2 border-gray-300 rounded-md flex items-center justify-center">
                <svg v-if="terms" class="w-4 h-4 text-violet-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
            </label>
            <p class="text-sm font-light my-auto">I have read and accept <a href="https://dreamy-mind.ozone-digital.fr/terms-and-conditions-of-use/" class="underline">Terms and conditions</a></p>
          </div>

          <p v-if="isError" class="text-sm text-violet-300 m-3 mb-4 font-light">Error signing up. Please verify that all fields are filled correctly.</p>
          <!-- Submit button -->
          <button class="button_submit" :disabled="!passwordsMatch" @click="doSignUp" type="button">Sign up</button>
        </form>
      </div>
      <p class="text-center">Already a user? <RouterLink to="/" class="font-semibold underline">Log in</RouterLink></p>
    </div>
  </div>
</template>
