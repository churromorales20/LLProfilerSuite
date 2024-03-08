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
    'dayjs-nuxt',
    'nuxt-viewport',
    '@nuxtjs/color-mode'
  ],
  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },

    defaultBreakpoints: {
      desktop: 'lg',
      mobile: 'xs',
      tablet: 'md',
    },

    fallbackBreakpoint: 'lg'
  },
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
    'animate.css'
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