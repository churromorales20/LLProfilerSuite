<template>
  <div class="ll-box shadow rounded-lg p-4" v-if="profileStore.profile.videos.length > 0">
    <h2 class="text-md lg:text-lg ll-box-title-main font-bold mb-4 border-b-2 ll-border-heading pb-2">{{ $t('profile.videos') }}</h2>
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