<script setup lang="ts">
const props = defineProps<{
    userAvatar?: string
    username?: string
}>()
</script>

<template>
    <div class="flex gap-2 my-1">
        <img src="../../public/img/avatar.png" alt="avatar" class="rounded-full w-8 h-8"/>
        <p class="my-auto">{{ username }}</p>
        <!--change to RouterLink-->
    </div>
</template>