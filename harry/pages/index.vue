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
        if (!response) {
          throw new Error('Hubo un error al obtener los datos');
        }
      }
    )
    if (error.value) {
      navigateTo('/404')
    }
  }
  
</script>