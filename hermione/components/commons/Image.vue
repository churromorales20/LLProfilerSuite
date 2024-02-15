<template>
  <div 
    class="relative"  
    @mouseover="showDeleteIcon = true" 
    @mouseleave="showDeleteIcon = false"
  >
    <a
      class="image-profile"
      :href="`/profiles/assets/${memorialCode}/${imageUrl}`"
      :data-pswp-src="`/profiles/assets/${memorialCode}/${imageUrl}`" 
      data-pswp-width="800" 
      data-pswp-height="800" 
    >
      <img 
        class="w-40"
        v-show="loaded && !errorLoadingImage" 
        :src="`/profiles/assets/${memorialCode}/${imageUrl}`" 
        @error="onImageError"
        @load="onImageLoad"
      />
    </a>
    <div v-show="errorLoadingImage" class="w-40 rounded border border-slate-100 flex h-full items-center justify-center">
      <UIcon name="i-fa6-solid-image" class="text-6xl text-slate-200"/>
    </div>
    <UPopover v-model:open="isDeleteConfirmOpen" class="absolute top-0 right-0 mt-2 mr-2" overlay>
      <UButton 
        v-show="showDeleteIcon && !isDeleting" 
        color="red" 
        class="absolute top-0 right-0 mt-2 mr-2"
        variant="solid" 
        icon="i-fa6-solid-trash"
      />
      <template #panel>
        <UCard
          :ui="{
            base: 'w-96',
            body: {
              padding: 'px-0 py-3 sm:p-6',
            },
            header: {
              padding: 'px-0 py-3 sm:px-6',
            },
            footer: {
              padding: 'px-0 py-3 sm:px-6',
            },
            ring: '',
            shadow: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800'
          }"
          >
            <template #header>
              <h2 class="text-xl font-semibold">Attention</h2>
            </template>

            You're about to delete this image 
            <img :src="imageUrl" class="my-4 w-20 h-auto rounded">
            This action cannot be undone.

            <template #footer>
              <div class="flex justify-between">
                <UButton icon="i-fa6-solid-ban" size="md" @click="() => {
                  isDeleteConfirmOpen = false;
                }" color="orange" variant="solid" label="Cancel" />
                <UButton icon="i-fa6-solid-check" size="md" @click="deleteImage" variant="solid" label="Confirm" />
              </div>
            
            </template>
        </UCard>
      </template>
    </UPopover>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const { imageUrl, index } = props;
const editorStore = memorialEditorStore()
const loaded = ref(false);
const showDeleteIcon = ref(false);
const isDeleting = ref(false);
const isDeleteConfirmOpen = ref(false);
const errorLoadingImage = ref(false);

const onImageLoad = () => {
  loaded.value = true;
};

const memorialCode = computed(() => editorStore.memorial.code);

const deleteImage = async () => {
  isDeleting.value =  true;
  await editorStore.removeImage(index, imageUrl)
  isDeleting.value = false;
};

const onImageError = () => {
  errorLoadingImage.value = true;
};

</script>