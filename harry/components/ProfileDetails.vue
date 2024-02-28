<template>
  <div class="text-sm unacosita">
    <ProfileHeader />

    <div class="container mx-auto px-2 flex flex-col lg:flex-row">
      <div class="lg:w-1/3 px-4 py-1">
        <ProfilePersonalInfo />
        
        <ImagesSection />
        <VideosSection />
      </div>

      <div class="lg:w-2/3 px-4 py-1">
        <div 
          v-if="!isEmptyString(profile.obituary)" 
            class="bg-white shadow rounded-lg p-4 mb-4">
          <!-- Obituario -->
          <div>
            <h2 class="text-xl font-bold mb-2">{{ $t('profile.obituary') }}</h2>
            <p>{{ profile.obituary }}</p>
          </div>
        </div>
        <!-- Biografía -->
        <div class="bg-white shadow rounded-lg p-4 mb-4">
          <h2 class="text-xl font-bold mb-2">{{ $t('profile.biography') }}</h2>
          <div class="p-4 text-base  overflow-hidden" v-if="!isEmptyString(profile.bio)">
            <p class="text-ellipsis h-96 overflow-hidden font-light leading-6">{{ profile.bio }}</p>
          </div>
          <div class="flex h-40 items-center justify-center" v-else>
            <h4 class="text-sm">Nothing have been sharee dyet</h4>
          </div>
        </div>
        <Condolences />
      </div>
    </div>
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
</script>
<style scoped>
.unacosita {
  width:1200px;
  max-width: 1200px;
  min-width: 1200px;
}
</style>