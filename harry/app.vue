<template>
  <div class="ll-main-custom">
    <NuxtPage />
  </div>
</template>
<script setup>
  if (!process.client) {
    const route = useRoute();
    const profileStore = useProfileStore();
    const isSubDomainProfile = route.name !== 'profile-uuid';
    profileStore.setIsSubdomain(isSubDomainProfile);
    if (isSubDomainProfile && process.env.NODE_ENV === 'production') {
      //profileStore.fetchCodeByUname(route.href);
    } else {
      profileStore.setCode(isSubDomainProfile ? process.env.LL_DEV_PROFILE : route.params?.uuid);
    }
    useHead({
      link: [
        { rel: 'stylesheet', href: `/assets/css/${profileStore.code}/stylesheet.css`, crossorigin: 'anonymous' }
      ]
    })
  }
  
</script>
