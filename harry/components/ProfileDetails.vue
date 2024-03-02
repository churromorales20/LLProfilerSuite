<template>
  <div class="text-sm main-width">
    <ProfileHeader />

    <div class="container mx-auto px-2 flex flex-col lg:flex-row">
      <div class="lg:w-1/3 px-4 py-1">
        <ProfilePersonalInfo />
        
        <ImagesSection />
        <VideosSection />
        <GraveyardSection />
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
        <ProfileBiography />
        <Condolences />
      </div>
    </div>
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
</script>