// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: '🚀 Ricochet 360',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  
  plugins: [
    '~/plugins/laravel-echo'
  ],

  compatibilityDate: "2025-03-12",
  ssr: false,
});
