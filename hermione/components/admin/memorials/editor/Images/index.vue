<template>
  <div class="w-full bg-white p-4 rounded-md mb-4">
    <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" class="hidden" />
    <div class="flex justify-between mb-4">
      <h2 class="text-neutral-950 text-2xl font-bold mb-2">Images</h2>
      <UButton v-if="images.length > 0" size="md" variant="outline" @click="pickFile" :loading="isUploading"
        label="Add images" icon="i-fa6-solid-file-circle-plus" />
    </div>
    <!--<UCarousel 
      id="_profile_gallery_images_"
      v-if="images.length > 0 && editorStore.showSlider" 
      v-slot="{ item, index }" 
      indicators
      class="rounded-lg overflow-hidden mb-2" 
      :items="images" 
      
      :ui="{ item: 'md:w-fit lg:w-fit' }"
    >
      <CommonsImage :imageUrl="item" :index="index" />
    </UCarousel>
    <div v-if="images.length > 0 && editorStore.showSlider" id="_profile_gallery_images_">
      <CommonsImage v-for="item, index in images" :imageUrl="item" :index="index" />
    </div>-->
    <UCarousel
      class="rounded-lg overflow-hidden mb-2" 
      id="_profile_gallery_images_"
      v-if="images.length > 0 && editorStore.showSlider"  
      v-slot="{ item, index }" 
      :items="images"
      :ui="{ item: 'md:w-fit lg:w-fit' }"
    >
      <CommonsImage :imageUrl="item" :index="index" />
    </UCarousel>
    <div v-else-if="!editorStore.showSlider" class="flex items-center justify-center top-0 right-0 w-full h-40">
      <UIcon name="i-fa6-solid-circle-notch" class="text-slate-400 animate-spin text-6xl" />
    </div>
    <div class="h-40 flex items-center justify-center" v-else>
      <UButton size="md" variant="outline" :loading="isUploading" @click="pickFile" label="Add images"
        icon="i-fa6-solid-file-circle-plus" />
    </div>
  </div>
  <AdminMemorialsEditorImagesCropper v-if="imagesPicker.showCropper" />
</template>
<script setup>

import { ref, computed } from 'vue'
import { onMounted } from 'vue';


const imagesGallery = imagesGalleryStore();

onMounted(() => {
  imagesGallery.init();
});

const fileInput = ref(null);
const editorStore = memorialEditorStore()
const imagesPicker = imagesPickerStore();

const isUploading = computed(() => imagesPicker.imageWorking);

const images = computed(() => {
  return editorStore.memorial.images
});

const items = [
  'https://picsum.photos/600/800?random=1',
  'https://picsum.photos/600/800?random=2',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/800?random=4',
  'https://picsum.photos/600/800?random=5',
  'https://picsum.photos/600/800?random=6'
]


const pickFile = () => {
  fileInput.value.click();
}

const handleFileChange = () => {
  if (fileInput.value && fileInput.value.files && fileInput.value.files.length > 0) {
    showCropperDialog(fileInput.value.files[0]);
  }
};

const showCropperDialog = (file) => {
  const reader = new FileReader();
  reader.onload = e => {
    imagesPicker.setCropperSrc(String(e.target.result));
  };
  reader.readAsDataURL(file);
}
</script>