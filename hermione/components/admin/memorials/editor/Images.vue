<template>
  <div class="w-full bg-white p-4 rounded-md mb-4">
    <div class="flex justify-between">
      <h2 class="text-neutral-950 text-2xl font-bold mb-2">Images</h2>
    </div>
    <UCarousel v-if="images.length > 0" v-slot="{ item }" indicators class="rounded-lg overflow-hidden" :items="images"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/5' }">
      <img :src="item" class="w-full" draggable="false">
    </UCarousel>
    <div class="h-40 flex items-center justify-center" v-else>
      <UPopover>
        <UButton 
          size="md"
          label="Add images" 
          icon="i-fa6-solid-file-circle-plus" 
        />

        <template #panel>
          <div class="p-4">
            <Placeholder class="h-20 w-48" />
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>
<script setup>
import { format } from 'date-fns'
import { ref, computed } from 'vue'

const editorStore = memorialEditorStore()

const images = computed(() => {
  return editorStore.memorial.images
});
</script>