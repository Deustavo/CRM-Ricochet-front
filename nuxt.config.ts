// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  
  plugins: [
    '~/plugins/laravel-echo'
  ],

  compatibilityDate: "2025-03-12",
  ssr: false,
});
