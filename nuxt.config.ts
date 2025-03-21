// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
    },
  },

  runtimeConfig: {
    dbDialect: process.env.DB_DIALECT,
    dbHost: process.env.DB_HOST,
    dbDatabase: process.env.DB_DATABASE,
    dbUser: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
  },

  compatibilityDate: '2025-03-20'
})