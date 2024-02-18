<template>
  <VuePictureCropper 
    :boxStyle="{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }" 
    :img="cropperSrc"
    :options="{
      viewMode: 1,
      dragMode: 'crop',
      aspectRatio: 16 / 16,
    }" 
  />
</template>
<script setup>
import { ref, computed } from 'vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

const editorStore = memorialEditorStore()
const imagesPickerStore = avatarSelectorStore();

const cropAndSave = async () => {
  if (!cropper) return

  imagesPickerStore.setWorking(true);
  closeModal()
  const formData = new FormData();
  const blob_cropped = await cropper.getBlob();
  formData.append('avatar', blob_cropped);
  await editorStore.setAvatar(formData);
  imagesPickerStore.setWorking(false);
}

const cropperSrc =  computed(() => imagesPickerStore.cropperSrc);
const showCropper =  computed({
  get() {
    return imagesPickerStore.showCropper
  },
  set() {
    closeModal();
  }
});

const closeModal = () => {
  imagesPickerStore.setCropperSrc(null);
}

</script>