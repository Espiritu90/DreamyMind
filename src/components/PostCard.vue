<script setup lang="ts">
import MoonIcon from './icons/MoonIcon.vue';
import LikeIcon from './icons/LikeIcon.vue';
import CommentIcon from './icons/CommentIcon.vue';
const props = withDefaults(
    defineProps<{
    variant?: 'home' | 'feed' | 'profile' | 'journal_private' | 'journal_public'
    userAvatar?: string
    user?: string
    title?: string
    text?: string
    likes?: number
    comments?: number
}>(),
    {
        variant: 'feed',
    }
)

const variantClass ={
    home: 'border-2 border-amber-100',
    feed: 'border-none',
    profile: 'border-none',
    journal_private: 'border-none',
    journal_public: 'border-none'
}

</script>

<template>
    <div class="my-3 bg-indigo-900 rounded-[32px] pt-8 p-5"
    :class=variantClass[props.variant]>
    <!--the dream of the week with moon icon-->
        <div class="flex justify-between" :class="props.variant === 'home'? 'visible' : 'hidden'">
            <h3>The dream of the week</h3>
            <MoonIcon class="h-max-6"/>
        </div>

        <!--separator-->
        <div class="block h-0.5 w-full rounded-full my-2 bg-amber-100" :class="props.variant === 'home'? 'visible' : 'hidden' "></div>
        <div>

<!--avatar + username-->
                <div class="flex align-middle gap-2"
                :class="props.variant === 'home' || props.variant === 'feed' ? 'visible' : 'hidden'">
                    <img :src="`${userAvatar}`" alt="avatar" class="h-8 w-max-full">
                    <p class="my-auto">{{ user }}</p>
            </div>

<!--separator-->
             <div class="block h-0.5 w-full rounded-full my-2 bg-amber-100" :class="props.variant === 'feed'? 'visible' : 'hidden'"></div>

             <!--published-->

             <div :class="props.variant==='journal_public'? 'visible' : 'hidden'" class=" w-fit  flex align-middle justify-center">
                <p class="text-indigo-900 m-auto text-sm align-middle bg-amber-100 rounded-full px-1 py-1 leading-3">Published</p>
             </div>
           
             <!--title + text-->
             <div class="px-3 pt-2">
                <h2>{{ title }}</h2>
                <p class="bg-gradient-to-t from-transparent from-[1%] via-amber-100 via-30% to-amber-100 text-transparent bg-clip-text">{{text}}</p>
            </div>

            <!--continue reading-->
            <RouterLink to="/" class="text-base text-amber-100 bg-indigo-900 h-fit"><p class="font-semibold text-center">Continue reading</p></RouterLink>

<!--like+comment-->
            <div :class="props.variant === 'journal_private' || props.variant==='home' ? 'hidden' : 'visible'" class="flex gap-5">
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