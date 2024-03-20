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
    class="relative image-container w-full md:h-56 sm:h-56 h-20 lg:h-24 ll-rounded overflow-hidden"
    >
    <img 
      :src="imageUrl" 
      alt="imagen"
      class="absolute" 
      :class="{ 'zoomed': isZoomed }"
    >
    <div class="bg-black/75 md:h-56 sm:h-56 h-20 lg:h-24 show-more-images-btn" v-if="isShowMoreButton">
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