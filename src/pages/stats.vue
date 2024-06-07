<script setup lang="ts">
import RadialBar from '@/components/RadialBar.vue';
import ProgressBar from '@/components/ProgressBar.vue';
</script>

<template>
<div class="wrapper">
    <h1>AI report</h1>
    <section class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col justify-center align-middle">
        <h3 class="text-center">You've had dreams</h3>
        <RadialBar :value="75" class="mx-auto"/>
        <p class="text-center">of nights</p>
    </section>
    <section class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col justify-center align-middle">
        <h3>Most of them were about</h3>
        <ProgressBar :value="75" topic="Flying"/>
        <ProgressBar :value="45" topic="Falling"/>
        <ProgressBar :value="12" topic="Being chased"/>
    </section>
    <section class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col justify-center align-middle">
        <h3>You've had nightmares</h3>
        <RadialBar :value="25" class="mx-auto"/>
        <p class="text-center">of nights</p>
    </section>
    <section class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col justify-center align-middle">
        <h3>Insignts</h3>
        <div class="border-2 border-amber-100 rounded-xl">
            <p class="px-2 py-3">Recent dreams paint a vibrant picture of your inner world! They're a thrilling mix of adventure and intrigue, hinting at your thirst for new experiences. Yet, amidst the excitement, there's a whisper of unease – recurring nightmares add depth, suggesting lingering fears. It's a dynamic journey, showcasing your evolving mindset, where curiosity battles with uncertainty, and every dream is a chapter in your personal growth story.</p>
        </div>
    </section>
</div>
</template>