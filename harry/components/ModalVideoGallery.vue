<template>
  <UModal 
    v-model="isGalleryOpen" 
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
          <h2 class="font-semibold text-xl">Videos</h2>
          <UButton 
            icon="i-fa6-solid-ban" 
            size="md"
            color="amber" 
            label="Close"
          />
        </div>
      </template>
      <VideosDisplayer 
        :videosLimit="18"
        :inModal="true"
        gridCols="grid-cols-6"
      />
    </UCard>
  </UModal>
</template>
<script setup>
const profileStore = useProfileStore()
const isGalleryOpen = computed({
  get() {
    return profileStore.isVideoGalleryOpened;
  },
  set() {
    profileStore.toggleVideoGallery(false);
  }
});
</script>