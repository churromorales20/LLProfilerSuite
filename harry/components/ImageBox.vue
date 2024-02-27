<template>
  <a
    :href="!isShowMoreButton ? imageUrl : '#'" 
    @click.prevent="() => {
      if (isShowMoreButton) {
        btnShowMoreAction();
      }
    }"
    :data-pswp-src="imageUrl"  
    data-pswp-width="800" 
    data-pswp-height="800" 
    @mouseenter="isZoomed = true"
    @mouseleave="isZoomed = false" 
    :class="{'image-profile': !isShowMoreButton }"
    class="relative image-container w-full h-28 ll-rounded overflow-hidden"
    >
    <img 
      :src="imageUrl" 
      alt="imagen"
      class="absolute" 
      :class="{ 'zoomed': isZoomed }"
    >
    <div class="show-more-images-btn" v-if="isShowMoreButton">
      + {{ remaining }}
    </div>
  </a>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps({
  image: {
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
    default: () => {}
  },
});
const { image, remaining, isShowMoreButton, btnShowMoreAction } = toRefs(props);

const profileStore = useProfileStore()
const imageUrl = computed(() => `/profiles/assets/${profileStore.profile.code}/${image.value}`);
const isZoomed = ref(false);
</script>