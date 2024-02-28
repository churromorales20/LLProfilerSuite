<template>
  <a 
    href="#" 
    @click.prevent="() => {
      if (isShowMoreButton) {
        btnShowMoreAction();
      } else {
        profileStore.setVideoViewing(videoId)
      }
    }" 
    @mouseenter="isZoomed = true"
    @mouseleave="isZoomed = false" 
    :class="{ 'image-profile': !isShowMoreButton }"
    class="relative image-container w-full h-20  ll-rounded overflow-hidden"
  >
    <img :src="imageUrl" alt="imagen" class="absolute" :class="{ 'zoomed': isZoomed }">
    <div class="bg-black/75 show-more-images-btn" v-if="isShowMoreButton">
      + {{ remaining }}
    </div>
  </a>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  remaining: {
    type: Number,
    required: false,
  },
  isShowMoreButton: {
    type: Boolean,
    required: false,
  },
  btnShowMoreAction: {
    type: Function,
    required: false,
    default: () => { }
  },
});
const { videoId, remaining, isShowMoreButton, btnShowMoreAction } = toRefs(props);

const profileStore = useProfileStore()

const imageUrl = computed(() => `https://img.youtube.com/vi/${videoId.value}/0.jpg`);
const isZoomed = ref(false);
</script>