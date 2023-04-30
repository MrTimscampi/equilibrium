// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['nuxt-quasar-ui'],
    quasar: {
        extras: {
            fontIcons: ['mdi-v7'],
        },
        config: {
          dark: true,
        },
    },
});
