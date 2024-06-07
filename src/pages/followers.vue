<script setup lang="ts">
import AccountListItem from '@/components/AccountListItem.vue'
</script>

<template>
    <div class="wrapper">
        <h1>Followers</h1>
        <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col">
            <AccountListItem v-for="n in 10" :key="n" username="sleepyuser145" variant="followers"/>
        </div>
    </div>
</template>