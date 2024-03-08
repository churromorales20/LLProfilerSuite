<template>
  <ProfileView />
</template>

<script setup>
definePageMeta({
  validate: async (route) => {
    return /^[a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(route.params.uuid)
  },
  colorMode: 'light'
});
</script>
