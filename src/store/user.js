import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    language: 'en', // Valeur par défaut
  }),
  actions: {
    setLanguage(lang) {
      this.language = lang;
    },
  },
});