<template>
  <h5>Dahsboarxxxxxxd</h5>
</template>
<script setup>
  const userStore = userAdminStore()
  const headers = useRequestHeaders(['cookie'])

  if (!process.client) {
    //navigateTo('/login')
    //console.log(typeof headers.cookie);
    console.log(headers.cookie);

    const { error } = await useAsyncData(
      'profile_data',
      async () => {
        const result = await userStore.verifyUserToken('tokenString')
        console.log('result', result);
        if (!result && userStore.lastUserError !== 401) {
          navigateTo('/login')
        } else if (userStore.lastUserError === 401) {
          navigateTo('/login')
        }

      }
    )
  }
</script>