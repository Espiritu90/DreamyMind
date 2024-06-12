<script setup lang="ts">
import Avatar1 from '@/components/avatars/Avatar1.vue';
import Avatar2 from '@/components/avatars/Avatar2.vue';
import Avatar3 from '@/components/avatars/Avatar3.vue';
import Avatar4 from '@/components/avatars/Avatar4.vue';
import Avatar5 from '@/components/avatars/Avatar5.vue';
import Avatar6 from '@/components/avatars/Avatar6.vue';
import { pb } from '@/backend';
import { useRouter } from 'vue-router/auto';
import { ref } from 'vue';

const deleteOpen = ref(false)
const cancelOpen = ref(false)

const router = useRouter()
const submit = async (event: Event) => {
  event.preventDefault()
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const editedUser = await pb.collection('users').update(pb.authStore.model?.id, formData)
  router.push({ name: '/users/[id]', params: { id: editedUser.id } })}

const deleteAccount = async () => {
  try {

    // Delete user's records from 'dream' collection
    const dreams = await pb.collection('dream').getFullList({
      filter: `user = '${pb.authStore.model.id}'`
    });
    for (const dream of dreams) {
      await pb.collection('dream').delete(dream.id);
    }

    // Delete user's records from 'comment' collection
    const comments = await pb.collection('comment').getFullList({
      filter: `user = '${pb.authStore.model.id}'`
    });
    for (const comment of comments) {
      await pb.collection('comment').delete(comment.id);
    }

    // Delete user account
    await pb.collection('users').delete(pb.authStore.model.id);
    router.push({ name: '/' });
    // Log out the user
    pb.authStore.clear();
    console.log("User account and associated records deleted successfully");
  } catch (error) {
    console.error("Error deleting user account:", error);
  }
};

const cancelPremium = async () => {
  try {
    await pb.collection('users').update(pb.authStore.model.id, { premium: false });
    console.log("User premium subscription cancelled successfully");
    router.push({ name: '/home' });
    setTimeout(() => {
      location.reload();
    }, 500);
  } catch (error) {
    console.error("Error cancelling user premium subscription:", error);
  }
};
</script>

<template>
  <div class="wrapper">
    <h1>My profile</h1>
    <form class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5" method="post" @submit="submit">
        <div class="flex justify-around">
            <div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="1" name="avatar" value="1" class="w-fit" :checked="pb.authStore.model ? pb.authStore.model.avatar === 1 : false">
                    <label for="1">
                        <Avatar1 />
                    </label>
                </div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="2" name="avatar" value="2" class="w-fit" :checked="pb.authStore.model ? pb.authStore.model.avatar === 2 : false">
                    <label for="2">
                        <Avatar2 />
                    </label>
                </div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="3" name="avatar" value="3" class="w-fit" :checked="pb.authStore.model ? pb.authStore.model.avatar === 3 : false">
                    <label for="3">
                        <Avatar3 />
                    </label>
                </div>
                </div>

                <div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="4" name="avatar" value="4" class="w-fit" :checked="pb.authStore.model ? pb.authStore.model.avatar === 4 : false">
                    <label for="4">
                        <Avatar4 />
                    </label>
                </div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="5" name="avatar" value="5" class="w-fit" :checked="pb.authStore.model ? pb.authStore.model.avatar === 5 : false">
                    <label for="5">
                        <Avatar5 />
                    </label>
                </div>
                <div class="flex align-middle gap-4">
                    <input type="radio" id="6" name="avatar" value="6" class="w-fit" :checked="pb.authStore.model ? pb.authStore.model.avatar === 6 : false">
                    <label for="6">
                        <Avatar6 />
                    </label>
                </div>
            </div>
        </div>
      <label for="Name">Name</label>
      <input type="text" id="Name" name="Name" :value="pb.authStore.model?.name">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" :value="pb.authStore.model?.username">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" :value="pb.authStore.model?.email">
      <button type="submit" class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6">Update profile</button>
    </form>
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5">
        <div class="flex flex-col gap-4">
            <RouterLink to="/changePassword" class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6">Change password</RouterLink >
            <button type="submit" class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6" @click="cancelOpen=true" v-if="pb.authStore.model?.premium">Cancel premium subscription</button>
            <div v-show="cancelOpen">
                <p>By canceling your premium subscription, you will lose access to exclusive features and content. Are you sure you want to proceed?</p>
                <div class="flex justify-between gap-4 mt-3">
                    <button class="flex text-amber-100 font-semibold w-full justify-center bg-red-700 rounded-full align-middle py-2 px-6" @click="cancelPremium">
                        Yes
                    </button>
                    <button class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6" @click="cancelOpen=false">
                        No
                    </button>
                </div>
            </div>
            <button type="submit" class="flex text-amber-100 font-semibold w-full justify-center bg-red-700 rounded-full align-middle py-2 px-6" @click="deleteOpen=true">Delete profile</button>
            <div v-show="deleteOpen">
                <p>Doing this will delete your profile along with all your recorder dreams. This action is irreversible. Do you wish to proceed?</p>
                <div class="flex justify-between gap-4 mt-3">
                    <button class="flex text-amber-100 font-semibold w-full justify-center bg-red-700 rounded-full align-middle py-2 px-6" @click="deleteAccount">
                        Yes
                    </button>
                    <button class="flex text-amber-100 font-semibold w-full justify-center bg-fuchsia-900 rounded-full align-middle py-2 px-6" @click="deleteOpen=false">
                        No
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>