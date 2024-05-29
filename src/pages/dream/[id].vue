<script setup lang="ts">
import {ref} from 'vue';
const aiVisible = ref(false);
</script>

<template>
    <div class="wrapper">
        <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col gap-5">
            <div>
                <h1>Garden of light</h1>
                <p>Amidst a garden bathed in golden light, I found solace in the tranquil beauty of blooming flowers and swaying trees. Each blossom seemed to glow with an inner radiance, filling the air with the scent of honey and sunshine. With each breath, I felt the warmth of the sun on my skin, as if the very garden itself were alive with the light of a thousand suns.</p>
                <button 
                @click="aiVisible = !aiVisible"
                class=" bg-fuchsia-900 rounded-full align-middle py-3 px-6 w-full text-amber-100 font-semibold mt-2">Explain with AI</button>
            </div>
            <div class="block h-0.5 w-full bg-amber-100"> </div>
            <div :class="aiVisible? 'visible' : 'hidden'" class="transition-opacity duration-500">
                <h2>AI explanation</h2>
                <p>This dream symbolizes a profound sense of inner peace and spiritual connection. The garden bathed in golden light represents a sanctuary of tranquility and enlightenment. The blooming flowers and swaying trees signify growth, renewal, and the beauty of life unfolding. The inner radiance of each blossom reflects the individual's inner light and vitality. The scent of honey and sunshine evokes feelings of warmth, sweetness, and joy. Overall, the dream suggests a deep harmony with oneself and the surrounding world, as well as a sense of being uplifted by the positive energies and abundant blessings of life.</p>
            </div>
        </div>
    </div>
</template>