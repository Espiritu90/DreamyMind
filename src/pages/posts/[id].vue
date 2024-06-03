<script setup lang="ts">
import LikeIcon from '@/components/icons/LikeIcon.vue';
import CommentIcon from '@/components/icons/CommentIcon.vue';
import SendIcon from '@/components/icons/SendIcon.vue';
import Comment from '@/components/Comment.vue';
</script>

<template>
    <div class="wrapper">
        <div class="my-3 bg-indigo-900 rounded-[32px] p-5">
            <div class="flex gap-3 align-middle">
                <img src="/img/avatar.png" alt="avatar" class="rounded-full w-8 h-8 border-amber-100"/>
                <RouterLink to="/en/account" class="text-amber-100 font-semibold my-auto">sleepy_user142</RouterLink>
            </div>

            <div class="my-3">
                <h1>Enchanted Forest</h1>
                <p>As I wandered through the enchanted forest, I felt a sense of wonder and awe at the towering trees and vibrant foliage that surrounded me. Sunlight filtered through the canopy above, casting dappled shadows on the forest floor. Each step seemed to take me deeper into a world of magic and mystery, where every rustle of leaves and chirp of birdsong held the promise of adventure.</p>
            </div>

            <div>
                <div class="flex gap-5">
                <div class="flex gap-1">
                    <LikeIcon/>
                    <p>123</p>
                </div>
                <div class="flex gap-1">
                    <CommentIcon/>
                    <p>12</p>
                </div>
            </div>
            </div>

            <Comment v-for="n in 6" :key="n"
            userAvatar="/img/avatar.png" text="Your dream about the enchanted forest is so vivid and magical, I felt like I was right there with you!" user="sleepy_user1267" likes="234"/>

            <div class="w-full bg-indigo-900 p-1 flex align-middle gap-2">
            <img src="/img/avatar.png" alt="avatar" class="rounded-full w-8 h-8 border-amber-100 my-auto"/>
            <input type="text" class="w-full rounded-full border-2 border-amber-100 my-auto" placeholder="Add a comment..."/>
            <button type="submit">
                <SendIcon/>
            </button>
        </div>
    </div>
    </div>
</template>