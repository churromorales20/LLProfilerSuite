<template>
  <div 
    :class="gridCols"
    class="grid gap-2" 
    :id="wrapperId"
  >
    <ImageBox 
      v-for="(image, index) in images" 
      :key="index" 
      :image="image"
      :isShowMoreButton="index === images.length - 1 && remainingImages > 0"
      :remaining="remainingImages"
      :btnShowMoreAction="() => {
        if (inModal) {
          localLimit += localLimit;
          setTimeout(() => {
            bindGallery();
          }, 200);
        } else {
          profileStore.toggleImageGallery(true);
        }
      }"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

const props = defineProps({
  inModal: {
    type: Boolean,
    required: false,
    default: false
  },
  imagesLimit: {
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

const galleryObject = ref(null)
const { inModal, imagesLimit, gridCols } = props;

const localLimit = ref(imagesLimit)
const wrapperId = `_profile_${inModal ? 'modal_' : ''}gallery_images_`;
onMounted(() => {
  setTimeout(() => {
    bindGallery();
  }, 200);
});

const bindGallery = () => {
  if (galleryObject.value !== null) {
    galleryObject.value.detroy();
  }
  galleryObject.value = new PhotoSwipeLightbox({
    gallery: `#${wrapperId}`,
    children: '.image-profile',
    pswpModule: () => import('photoswipe')
  });
  galleryObject.value.init();
}

const profileStore = useProfileStore()
const images = computed(() => profileStore.profile.images.slice(0, localLimit.value));
const remainingImages = computed(() => profileStore.profile.images.length - localLimit.value);
</script>
<style>
.image-container img {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.zoomed {
  transform: scale(1.2);
  /* ajusta el valor de escala según sea necesario */
}
.show-more-images-btn {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #000;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  opacity: 0.7;
}
</style>