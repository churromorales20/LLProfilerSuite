// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  serverHandlers: [
    { route: '/assets/css/:uuid/stylesheet.css', handler: '~/server/assets/stylesheet.ts' }
  ]
})