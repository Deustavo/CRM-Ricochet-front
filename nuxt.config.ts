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

    runtimeConfig: {
        public: {
            pusherKey: process.env.NUXT_PUBLIC_PUSHER_KEY,
            pusherHost: process.env.NUXT_PUBLIC_PUSHER_HOST,
            pusherPort: process.env.NUXT_PUBLIC_PUSHER_PORT,
            pusherCluster: process.env.NUXT_PUBLIC_PUSHER_CLUSTER,
            pusherTls: process.env.NUXT_PUBLIC_PUSHER_TLS,
        }
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
