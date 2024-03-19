<template>
  <div class="ll-main-custom h-fit min-h-screen pb-4 flex flex-col items-center">
    <NuxtPage />
    <div class="lg:w-[1200px] w-screen pt-6 px-6 font-semibold text-center flex-col flex items-center">
      <div class="">
        <UButton color="sky" class="ll-link-custom" size="xs" variant="link">{{ $t('footer.report') }}</UButton>
        <UButton color="sky" class="ll-link-custom" size="xs" variant="link">{{ $t('footer.terms_conditions') }}</UButton>
        <UButton color="sky" class="ll-link-custom" size="xs" variant="link">{{ $t('footer.legal') }}</UButton>
        <UButton color="sky" class="ll-link-custom" size="xs" variant="link">{{ $t('footer.contact') }}</UButton>
      </div>
      <h4 class="text-sm text-zinc-300 mt-2 ll-title">Powered by Legacy Link Memorials 2024</h4>
    </div>
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
        const title = `${profileStore.fullName}${profileStore.nickname ? ` - ${profileStore.nickname}` : ''} - Legacy Link Memorials`;
        useSeoMeta({
          title: title,
          ogTitle: title,
          description: profileStore.bioText,
          ogDescription: profileStore.bioText,
          ogImage: profileStore.haveSocialImage ? `${process.env.LL_PROFILES_URL}${profileStore.socialImage}` : '/image_mini.webp',
          twitterCard: 'summary_large_image',
        })
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
