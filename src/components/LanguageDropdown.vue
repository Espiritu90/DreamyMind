<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LanguageDropdown',
  setup() {
    const open = ref(false)
    const toggleDropdown = () => {
      open.value = !open.value
    }
    const selectLanguage = (language: string) => {
      open.value = false
    }
    return {
      open,
      toggleDropdown,
      selectLanguage,
    }
  },
})
</script>

<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        @click="toggleDropdown"
        type="button"
        class="inline-flex justify-between w-full rounded-full shadow-sm px-6 py-4 bg-fuchsia-900 font-semibold text-amber-100"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        Language
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div
      v-if="open"
      class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-fuchsia-900 ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        
        <RouterLink
          @click="selectLanguage('en')"
          to="/en/profile"
          class="block px-4 py-2 text-amber-100"
        :class="{ 'no-underline': $route.path === '/en/profile', 'underline': $route.path === '/fr/profile' }"
          role="menuitem"
        >
          English
        </RouterLink>

        <RouterLink
          @click="selectLanguage('fr')"
          to="/fr/profile"
          class="block px-4 py-2 text-amber-100"
          :class="{ 'no-underline': $route.path === '/fr/profile', 'underline': $route.path === '/en/profile' }"
          role="menuitem"
        >
          French
        </RouterLink>
      </div>
    </div>
  </div>
</template>