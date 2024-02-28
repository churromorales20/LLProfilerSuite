<template>
  <div 
    :class="gridCols"
    class="grid gap-2" 
    :id="wrapperId"
  >
    <YoutubeBox
      v-for="(video, index) in videos" 
      :key="`_video_gallery_${inModal ? 'inmodal_' : ''}index_${index}`" 
      :videoId="video"
      :isShowMoreButton="index === videos.length - 1 && remainingVideos > 0"
      :remaining="remainingVideos"
      :btnShowMoreAction="() => {
        localLimit += localLimit;
      }"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  inModal: {
    type: Boolean,
    required: false,
    default: false
  },
  videosLimit: {
    type: Number,
    required: false,
    default: 6
  },
  gridCols: {
    type: String,
    required: false,
    default: 'grid-cols-3'
  }
});

const { inModal, videosLimit, gridCols } = props;

const localLimit = ref(videosLimit)
const wrapperId = `_profile_${inModal ? 'modal_' : ''}gallery_videos_`;

const profileStore = useProfileStore()
const videos = computed(() => profileStore.profile.videos.slice(0, localLimit.value));
const remainingVideos = computed(() => profileStore.profile.videos.length - localLimit.value);
</script>