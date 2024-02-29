<template>
  <div class="bg-white shadow rounded-lg p-4 mb-4">
    <h2 class="text-xl font-bold pb-4 border-b border-gray-300">{{ $t('profile.biography') }}</h2>
    <div class="p-4 text-base  overflow-hidden" v-if="!isEmptyString(profile.bio)">
      <p class="font-light leading-6">
        {{ !viewAll ? biographyInfo.text :  profile.bio}}
        <UButton 
          v-if="biographyInfo.truncated" 
          color="sky" 
          variant="link"
          @click="viewAll = !viewAll"
          :label="viewAll ? 'View less' : 'View more'"
        />
      </p>
    </div>
    <div class="flex h-40 items-center justify-center" v-else>
      <h4 class="text-sm">Nothing have been sharee dyet</h4>
    </div>
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
const biographyInfo = computed(() => {
  const LIMIT = 450;
  
  if (profileStore.profile.bio.length >= LIMIT) {
    return {
      text: `${profileStore.profile.bio?.slice(0, LIMIT)}...`,
      truncated: true
    }
  }
  return {
    text: profileStore.profile.bio,
    truncated: false
  }
})
const viewAll = ref(false);
</script>