<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
    variant?: 'followers' | 'following'
    userAvatar?: string
    username?: string
}>()

const following = ref(true)
</script>

<template>
    <div class="flex gap-2 my-1">
        <img src="/img/avatar.png" alt="avatar" class="rounded-full w-8 h-8"/>
        <p class="my-auto">{{ username }}</p>
        <!--change to RouterLink-->
       
    </div>
</template>