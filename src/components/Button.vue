<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
    variant?: 'default' | 'outlined'
    size?: 'full' | 'fit'
    url?: string
    text?: string
    icon?: 'string' | 'object' | 'undefined'

}>(),
    {
        variant: 'default',
        size: 'fit'
    }
)

const variantClass ={
    default: 'bg-fuchsia-900 text-amber-100 ',
    outlined: 'bg-none border-2 border-amber-100'
}

const sizeClass ={
    full: 'w-full',
    fit: 'w-fit'
}
</script>

<template>
    <RouterLink :to="`${url}`"
    class="inline-flex flex-row justify-between px-5 py-2 rounded-full align-middle text-base font-medium"
    :class="[variantClass[props.variant], sizeClass[props.size]]">
            <p class="my-auto">{{props.text}} </p>
            <component :is="props.icon"/>
        </RouterLink>
</template>