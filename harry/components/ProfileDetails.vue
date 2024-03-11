<template>
  <div class="text-sm xl:w-[1200px] w-screen">
    <ProfileHeader />

    <div class="xl:mx-auto px-2 flex flex-col lg:flex-row">
      <div class="lg:w-1/3 lg:px-4 px-1 py-1">
        <ProfilePersonalInfo />
        <ProfileBiography v-if="viewport.isLessThan('lg')" />
        <Obituary v-if="viewport.isLessThan('lg')" />
        <ImagesSection />
        <VideosSection />
        <Condolences v-if="viewport.isLessThan('lg')"/>
        <GraveyardSection />
      </div>

      <div class="lg:w-2/3 lg:px-4 px-1 py-1" v-if="viewport.isGreaterThan('md')">
        <Obituary />
        <ProfileBiography  />
        <Condolences/>
      </div>
    </div>
  </div>
</template>

<script setup>
const viewport = useViewport()
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
</script>