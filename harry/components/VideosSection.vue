<template>
  <div class="bg-white shadow rounded-lg p-4">
    <h2 class="text-lg font-bold mb-2">{{ $t('profile.videos') }}</h2>
    <VideosDisplayer :videosLimit="9" />
  </div>
  <VideoModal :channel="'youtube'" :videoId="profileStore.viewingVideoId" v-model:isOpen="videoIsOpen" />
</template>
<script setup>
const profileStore = useProfileStore();
const videoIsOpen = computed({
  get(){
    return profileStore.isViewingVideo;
  },
  set(){
    profileStore.setVideoViewing(null);
  }
});

</script>