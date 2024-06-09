<script setup lang="ts">
import {ref} from 'vue';
import type { DreamResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { useRoute } from 'vue-router/auto';
import LikeIcon from '@/components/icons/LikeIcon.vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import Comment from '@/components/Comment.vue';

const isLiked = ref(false);

function toggleLike() {
  isLiked.value = !isLiked.value;
}

const route = useRoute('/dream/[id]')
console.log('id :', route.params.id)

const aiVisible = ref(false);

const dreamById = await pb.collection<DreamResponse>('dream').getOne(route.params.id);
</script>

<template>
    <div class="wrapper">
        <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5 flex flex-col gap-5">
            <div>
                <h1>{{ dreamById.title }}</h1>
                <p>{{ dreamById.textDream }}</p>
                <button 
                @click="aiVisible = !aiVisible"
                class=" bg-fuchsia-900 rounded-full align-middle py-3 px-6 w-full text-amber-100 font-semibold mt-2">Explain with AI</button>
            </div>
            <div v-if="aiVisible" class="block h-0.5 w-full bg-amber-100"> </div>
            <div v-if="aiVisible" class="transition-opacity duration-500">
                <h2>AI explanation</h2>
                <p>This dream symbolizes a profound sense of inner peace and spiritual connection. The garden bathed in golden light represents a sanctuary of tranquility and enlightenment. The blooming flowers and swaying trees signify growth, renewal, and the beauty of life unfolding. The inner radiance of each blossom reflects the individual's inner light and vitality. The scent of honey and sunshine evokes feelings of warmth, sweetness, and joy. Overall, the dream suggests a deep harmony with oneself and the surrounding world, as well as a sense of being uplifted by the positive energies and abundant blessings of life.</p>
            </div>
            
            <div v-if="dreamById.published">
                <div>
                    <div class="flex gap-5">
                    <div class="flex gap-1">
                        <LikeIcon class="w-7 h-auto stroke-amber-100"@click="toggleLike"
                    :class="{'fill-amber-100': isLiked}"/>
                        <p class="my-auto">{{ dreamById.likes }}</p>
                    </div>
                    <div class="flex gap-1">
                        <CommentIcon/>
                        <p>{{ dreamById.comments }}</p>
                    </div>
                    </div>
                </div>
                 <div class="w-full bg-indigo-900 p-1 flex align-middle justify-between gap-4">
                <input type="text" class="w-full rounded-full border-2 border-amber-100 my-auto pl-3" placeholder="Add a comment..."/>
                <button type="submit" class="h-fit w-auto flex align-middle my-auto">
                    <SendIcon class="h-7 w-auto"/>
                </button>
                        </div>
                <Comment v-for="n in 6" :key="n"
                userAvatar="/img/avatar.png" text="Your dream about the enchanted forest is so vivid and magical, I felt like I was right there with you!" user="sleepy_user1267" :likes="234"/>
                
                           
                        </div>
            </div>
    </div>
</template>