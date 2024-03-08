<template>
  <UModal v-model="showCropper">
    <UCard :ui="{
      ring: '',
      body: {
          background: 'bg-white',
          base: 'll-modal-editor-body',
        },
        divide: 'divide-y divide-gray-300 dark:divide-gray-800'
      }"
    >
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
      <template #footer>
        <div class="flex justify-end">
          <UButton 
            icon="i-fa6-solid-ban" 
            size="md" 
            @click="closeModal" 
            color="orange" 
            variant="outline"
            :label="$t('general.cancel')" 
          />
          <UButton 
            icon="i-fa6-solid-floppy-disk" 
            size="md" 
            @click="cropAndSave" 
            color="llblue" 
            variant="outline"
            :label="$t('general.save')" 
            class="ml-2"
          />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup>
import { ref, computed } from 'vue'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

const editorStore = memorialEditorStore()
const imagesPicker = imagesPickerStore();

const cropAndSave = async () => {
  if (!cropper) return

  imagesPicker.setWorking(true);
  closeModal()
  const formData = new FormData();
  const blob_cropped = await cropper.getBlob();
  
  formData.append('image', blob_cropped);
  await editorStore.addImage(formData);
  imagesPicker.setWorking(false);
}

const cropperSrc =  computed(() => imagesPicker.cropperSrc);
const showCropper =  computed({
  get() {
    return imagesPicker.showCropper
  },
  set() {
    closeModal();
  }
});

const closeModal = () => {
  imagesPicker.setCropperSrc(null);
}

</script>