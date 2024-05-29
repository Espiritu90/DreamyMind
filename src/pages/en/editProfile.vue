<template>
  <div class="wrapper">
    <h1>My profile</h1>
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5">
      <!-- Avatar cliquable pour changer -->
      <label for="avatarInput">
        <img :src="avatarUrl" class="mx-auto mb-12 w-40 cursor-pointer" alt="Avatar">
      </label>
      <input id="avatarInput" type="file" accept="image/*" style="display: none;" @change="handleAvatarChange">
      <!-- Reste du formulaire pour d'autres informations -->
      <label for="Name">Name</label>
      <input type="text" id="Name" name="Name" :placeholder="name">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" :placeholder="username">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" :placeholder="email">
      <button type="submit" class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6">Update profile</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pb } from '@/backend';
import { ref, onMounted } from 'vue';

const name = ref('');
const username = ref('');
const email = ref('');
const avatarUrl = ref('');

onMounted(async () => {
  try {
    const authUser = pb.authStore.model;
    if (authUser) {
      name.value = authUser.name;
      username.value = authUser.username;
      email.value = authUser.email;
      // Charge l'URL de l'avatar actuel
      avatarUrl.value = authUser.avatarUrl;
    } else {
      console.warn('No authenticated user found');
    }
  } catch (error) {
    console.error('Failed to fetch user', error);
  }
});

// Gérer le changement de l'avatar
function handleAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      // Met à jour l'URL de l'avatar avec l'image téléchargée
      avatarUrl.value = reader.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
</script>
