<script setup lang="ts">
import MoonIcon from './icons/MoonIcon.vue';
import LikeIcon from './icons/LikeIcon.vue';
import CommentIcon from './icons/CommentIcon.vue';
import type { DreamResponse } from '@/pocketbase-types';
defineProps<DreamResponse>();

</script>

<template>
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5"
   >
    <!--the dream of the week with moon icon-->
        <div class="flex justify-between" >
            <h3>The dream of the week</h3>
            <MoonIcon class="h-max-6"/>
        </div>

        <!--separator-->
        <div class="block h-0.5 w-full rounded-full my-2 bg-amber-100" ></div>
        <div>

<!--avatar + username-->
                <div class="flex align-middle gap-2"
                >
                    <img src="../../public/img/avatar.png" alt="avatar" class="h-8 w-max-full"> <!--change to if avatar=n src=****-->
                    <p class="my-auto">{{ user }}</p>
            </div>

<!--separator-->
             <div class="block h-0.5 w-full rounded-full my-2 bg-amber-100" :class="variant === 'feed'? 'visible' : 'hidden'"></div>

             <!--published-->

             <div>
                <p class="text-indigo-900 m-auto text-sm align-middle bg-amber-100 rounded-full px-1 py-1.5 leading-3 font-normal">Published</p>
             </div>
           
             <!--title + text-->
             <div class="px-3 pt-2">
                <h2>{{ title }}</h2>
                <p class="bg-gradient-to-t from-transparent from-[1%] via-amber-100 via-30% to-amber-100 text-transparent bg-clip-text line-clamp-6">{{textDream}}</p>
            </div>

            <!--continue reading-->
            <RouterLink to="/posts/[id]" class="text-base text-amber-100 bg-indigo-900 h-fit"><p class="font-semibold text-center">Continue reading</p></RouterLink>

<!--like+comment-->
            <div >
                <div class="flex gap-1">
                    <LikeIcon/>
                    <p>{{ likes }}</p>
                </div>
                <div class="flex gap-1">
                    <CommentIcon/>
                    <p>{{ comments }}</p>
                </div>
            </div>
        </div>
    </div>
</template>