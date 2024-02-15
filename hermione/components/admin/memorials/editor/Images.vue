<template>
  <div class="w-full bg-white p-4 rounded-md mb-4">
    <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" class="hidden"/>
    <div class="flex justify-between mb-4">
      <h2 class="text-neutral-950 text-2xl font-bold mb-2">Images</h2>
      <UButton 
        v-if="images.length > 0"
        size="md"
        variant="outline"
        @click="pickFile"
        :loading="isUploading"
        label="Add images" 
        icon="i-fa6-solid-file-circle-plus" 
      />
    </div>
    <UCarousel 
      v-if="images.length > 0 && editorStore.showSlider" 
      v-slot="{ item, index }" 
      indicators 
      class="rounded-lg overflow-hidden mb-2" :items="images"
      :ui="{ item: 'md:w-fit lg:w-fit' }"
    >
      <CommonsImage :imageUrl="item" :index="index" />
    </UCarousel>
    <div v-else-if="!editorStore.showSlider"  class="flex items-center justify-center top-0 right-0 w-full h-40">
      <UIcon name="i-fa6-solid-circle-notch" class="text-slate-400 animate-spin text-6xl" />
    </div>
    <div class="h-40 flex items-center justify-center" v-else>
      <UButton 
        size="md"
        variant="outline"
        :loading="isUploading"
        @click="pickFile"
        label="Add images" 
        icon="i-fa6-solid-file-circle-plus" 
      />
    </div>
  </div>
</template>
<script setup>
import { format } from 'date-fns'
import { ref, computed } from 'vue'

const fileInput = ref(null);
const isUploading = ref(false);
const editorStore = memorialEditorStore()
const images = computed(() => {
  return editorStore.memorial.images
});

const pickFile = () => {
  fileInput.value.click();
}

const handleFileChange = () => {
  if (fileInput.value && fileInput.value.files && fileInput.value.files.length > 0) {
    uploadFile(fileInput.value.files[0]);
  }
};

const uploadFile = async (selectedFile) => {
  if (!selectedFile) return;

  isUploading.value = true;
  const formData = new FormData();
  formData.append('image', selectedFile);
  await editorStore.addImage(formData);
  isUploading.value = false;
};
</script>