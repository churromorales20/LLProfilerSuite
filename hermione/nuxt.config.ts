// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 4000
  },
  /*routeRules: {
    '/profiles/images/**': { proxy: '/home/cecilio/projects/LegacyLink/LLDocker/LLProfilerSuite/hermione/resources/**' },
  },*/
  serverHandlers: [
    { route: '/profiles/assets/:directory/:assetname', handler: '~/server/assets/profileAssets.ts' }
  ],
  //plugins: [{ src: "~/plugins/vue-paycard.js", mode: "client" }],
  pages: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    'dayjs-nuxt'
  ],
  tailwindcss: {
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    viewer: true,
  },
  ui: {
    icons: ['fa6-solid', 'mdi'],
  },
  css: [
    '@/assets/main.css',
  ],
  alias: {
    '@ll-interfaces': path.resolve(__dirname, '../interfaces'),
    '@ll-fetchers': path.resolve(__dirname, '../fetchers'),
    '@ll-utils': path.resolve(__dirname, '../utils'),
  },
  vite:{
    build: {
      rollupOptions: {
        external: [
          "sharp"
        ]
      }
    }
  }
})