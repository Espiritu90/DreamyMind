<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterView } from 'vue-router/auto'
onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})
import HeaderPage from './components/HeaderPage.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
    <HeaderPage  />
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component :is="Component" class="-z-10" />
      </Suspense>
    </RouterView>
    <NavBar/>
</template>
