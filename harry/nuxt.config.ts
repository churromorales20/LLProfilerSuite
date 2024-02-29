// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
  css: [
    '@/assets/main.css',
    'animate.css'
  ],
  tailwindcss: {
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
  },
  ui: {
    icons: ['mdi'],
  },
  serverHandlers: [
    { route: '/assets/css/:uuid/stylesheet.css', handler: '~/server/assets/stylesheet.ts' },
    { route: '/profiles/assets/:directory/:assetname', handler: '@ll-utils/profileAssets.ts' }
  ],
  alias: {
    '@ll-interfaces': path.resolve(__dirname, '../interfaces'),
    '@ll-fetchers': path.resolve(__dirname, '../fetchers'),
    '@ll-utils': path.resolve(__dirname, '../utils'),
  },
})