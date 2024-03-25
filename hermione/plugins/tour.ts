import VueJsTour from '@globalhive/vuejs-tour';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueJsTour)
})