// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-primevue",
  ],

  primevue: {
    usePrimeVue: true,
    options: {},
    importPT: { as: "Tailwind", from: "primevue/passthrough/tailwind" },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      prefix: "Prime",
      name: undefined,
      include: ["Button", "DataTable"],
      exclude: undefined,
    },
    directives: {
      prefix: "",
      name: undefined,
      include: undefined,
      exclude: undefined,
    },
    composables: {
      prefix: "",
      name: undefined,
      include: undefined,
      exclude: undefined,
    },
  },
  vite: {
    server: {
      hmr: {
        protocol: "ws",
        host: "localhost",
      },
    },
  },
  build: {
    transpile: ["vue-toastification"],
  },
  
  components: [
    {
      path: "~/components",
      pathPrefix: false, // Pasta padrão "components",
    },
  ],
});
