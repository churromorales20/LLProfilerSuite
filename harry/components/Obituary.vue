<template>
  <div 
    v-if="!isEmptyString(profile.obituary)" 
      class="ll-box shadow rounded-lg p-4 mb-4">
    <div>
      <h2 class="text-lg border-b-2 ll-border-heading pb-2 ll-box-title-main font-bold mb-4">{{ $t('profile.obituary') }}</h2>
      <p class="leading-6">{{ profile.obituary }}</p>
    </div>
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
</script>