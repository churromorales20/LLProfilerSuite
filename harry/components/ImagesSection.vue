<template>
  <UModal 
    v-model="isOpen" 
    :fullscreen="viewport.isLessThan('lg')"
    :ui="{
      width: 'll-card',
      overlay: {
        background: 'bg-black/75 dark:bg-gray-800/75',
      }
    }"
  >
    <UCard :ui="{
      ring: '',
      body: {
        background: 'bg-zinc-200',
        base: 'll-modal-editor-body',
      },
      divide: 'divide-y divide-gray-100 dark:divide-gray-800'
    }">
      <template #header>
        <div class="flex justify-between">
          <h2 class="font-semibold text-xl">{{ $t('profile.images') }}</h2>
          <UButton 
            icon="i-mdi-close-circle" 
            size="md"
            color="amber" 
            label="Close"
            @click="() => {
              profileStore.toggleImageGallery(false);
            }"
          />
        </div>
      </template>
      <ImagesDisplayer 
        :inModal="true"  
        :imagesLimit="18"
        :gridCols="modalGridClass"
      />
    </UCard>
  </UModal>
  
  <div class="ll-box shadow rounded-lg p-4 mb-4 ll-box-text">
    <h2 class="text-lg border-b-2 ll-border-heading pb-2 ll-box-title-main font-bold mb-4">{{ $t('profile.images') }}</h2>
    <ImagesDisplayer :imagesLimit="profileStore.imagesDisplayerLimit"/>
  </div>
</template>
<script setup>
const viewport = useViewport()
const profileStore = useProfileStore()

const modalGridClass = computed(() => {
  let cssClass = 'grid-cols-6';

  if (viewport.isLessThan('md') && viewport.isGreaterThan('sm')) {
    cssClass = 'grid-cols-4';
  } else if (viewport.isLessThan('sm')) {
    cssClass = 'grid-cols-3';
  }
  return cssClass;
});

const isOpen = computed({
  get(){
    return profileStore.isImageGalleryOpened;
  },
  set(newVal){
    profileStore.toggleImageGallery(false)
  }
});
</script>
<style>
.ll-card {
    width: 70vw;
    max-width: 960px;
}
</style>