export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = userAdminStore()
  const publicRoutes = [
    '/auth/recover',
    '/auth/recover/confirm',
    '/auth/social/facebook/confirm',
    '/auth/social/google/confirm',
  ];

  if (!process.client && !publicRoutes.includes(to.path)) {

    const result = await userStore.verifyUserToken()
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