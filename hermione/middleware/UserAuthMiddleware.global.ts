export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = userAdminStore()
  const publicRoutes = [
    '/auth/recover',
    '/auth/signup',
    '/auth/recover/confirm',
    '/auth/social/facebook/confirm',
    '/auth/social/google/confirm',
    '/shopping',
    '/404'
  ];



  console.log('to.path');
  console.log('to.path');
  console.log(to.path);


  if (!publicRoutes.includes(to.path) && !to.path.startsWith("/website") && !to.path.startsWith("/_nuxt")) {
    const result = await userStore.verifyUserToken(process.client)

    if (to.path === '/auth/login') {
      if (result) {
        return navigateTo('/')
      }
    } else {
      if (!result && userStore.lastUserError !== 401) {
        return navigateTo('/auth/login')
      } else if (userStore.lastUserError === 401) {
        return navigateTo('/auth/login')
      }
    }
  }
})