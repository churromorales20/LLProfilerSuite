<template>
  <ProfileView />
</template>

<script setup>
  const profileStore = useProfileStore()
  if (!process.client) {
    const { error } = await useAsyncData(
      'profile_data',
      async () => {
        const response = await profileStore.fetch()
        console.log('response', response);
        if (!response) {
          throw new Error('Hubo un error al obtener los datos');
        }
      }
    )
    if (error.value) {
      navigateTo('/404')
    }
  }
  
  definePageMeta({
    validate: async (route) => {
      return /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(route.params.uuid)
    }
  })
</script>
