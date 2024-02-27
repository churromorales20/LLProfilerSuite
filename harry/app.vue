<template>
  <div class="ll-main-custom h-screen flex justify-center">
    <NuxtPage />
  </div>
</template>
<script setup>
if (!process.client) {
  const route = useRoute();
  const profileStore = useProfileStore();
  profileStore.setIsSubdomain(route.name !== 'profile-uuid');

  if (profileStore.isSubdomain && process.env.NODE_ENV === 'production') {
    //profileStore.fetchCodeByUname(route.href);
  } else {
    const { error } = await useAsyncData(
      'profile_data',
      async () => {
        const response = await profileStore.fetchByCode(profileStore.isSubdomain ? process.env.LL_DEV_PROFILE : route.params?.uuid);
        if (!response) {
          throw new Error('Hubo un error al obtener los datos');
        }
      }
    )
    if (error.value) {
      navigateTo('/404')
    }
  }
  useHead({
    link: [
      { rel: 'stylesheet', href: `/assets/css/${profileStore.code}/stylesheet.css`, crossorigin: 'anonymous' }
    ]
  })
}
</script>
