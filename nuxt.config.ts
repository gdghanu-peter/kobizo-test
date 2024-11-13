import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@hebilicious/vue-query-nuxt",
    "@nuxtjs/tailwindcss",
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || "none",
        },
      },
    },
  },
});
