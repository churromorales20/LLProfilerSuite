<template>
  {{ locale.name }}
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
<script setup>
const { locale, locales, setLocale } = useI18n()
setLocale("es")
</script>
