<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterLink, RouterView } from 'vue-router/auto'
onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})
import HeaderPage from './components/HeaderPage.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
    <HeaderPage class="z-10" />
    <RouterView v-slot="{ Component }" class="-z-10">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </RouterView>
    <NavBar class="z-10"/>
</template>
