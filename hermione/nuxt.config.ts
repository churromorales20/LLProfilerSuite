// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 4000
  },
  pages: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/ui',
    'dayjs-nuxt'
  ], 
  tailwindcss: {
    configPath: 'tailwindchurro.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
  ui: {
    icons: ['fa6-solid'],
  },
  css: [
    '@/assets/main.css',
  ],
  alias: {
    '@ll-interfaces': path.resolve(__dirname, '../interfaces'),
    '@ll-fetchers': path.resolve(__dirname, '../fetchers'),
    '@ll-utils': path.resolve(__dirname, '../utils'),
  },
})