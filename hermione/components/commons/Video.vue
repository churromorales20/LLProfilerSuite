<template>
  <div class="relative" @mouseover="showDeleteIcon = true" @mouseleave="showDeleteIcon = false">
    <iframe 
      :src="`https://www.youtube.com/embed/${videoId}`" 
      class="w-auto h-60" 
      frameborder="0"
      allowfullscreen>
    </iframe>

    <UPopover v-model:open="isDeleteConfirmOpen" class="absolute bottom-0 right-0 mb-2 mr-2" overlay>
      <UButton 
        v-show="showDeleteIcon" 
        color="red" 
        class="absolute bottom-0 right-0 mb-2 mr-2"
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

            <h3>You're about to delete this video, this action cannot be undone.</h3>
            <h3>Please confirm you want to continue.</h3>
            <template #footer>
              <div class="flex justify-between">
                <UButton 
                  icon="i-fa6-solid-ban" 
                  size="md" 
                  @click="() => {
                    isDeleteConfirmOpen = false;
                  }" 
                  color="orange" 
                  variant="solid" 
                  :label="$t('general.cancel')"  
                />
                <UButton 
                  icon="i-fa6-solid-check" 
                  size="md" 
                  @click="deleteVideo" 
                  variant="solid" 
                  :label="$t('general.confirm')"  
                />
              </div>
          
            </template>
        </UCard>
      </template>
    </UPopover>
  </div>
</template>
<script setup>
const editorStore = memorialEditorStore()
const showDeleteIcon = ref(false);
const isDeleteConfirmOpen = ref(false);
const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const { videoId, index } = props;
const deleteVideo = async () => {
  editorStore.removeVideo(index);
}
</script>