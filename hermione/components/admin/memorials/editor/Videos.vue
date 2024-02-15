
import type { CommonsVideo } from '#build/components';
<template>
  <div class="w-full bg-white p-4 rounded-md mb-4">
    <div class="flex justify-between mb-4">
      <h2 class="text-neutral-950 text-2xl font-bold mb-2">Videos</h2>
      <AdminMemorialsEditorVideosBtn v-if="videos.length > 0" />
    </div>
    <UCarousel 
      v-if="videos.length > 0 && editorStore.showSliderVideo" 
      v-slot="{ item, index }" 
      :items="videos"
      class="mb-2"
      :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }"
    >
      <CommonsVideo :videoId="item" :index="index" />
    </UCarousel>
    <div v-else-if="!editorStore.showSliderVideo"  class="flex items-center justify-center top-0 right-0 w-full h-40">
        <UIcon name="i-fa6-solid-circle-notch" class="text-slate-400 animate-spin text-6xl" />
      </div>
    <div class="h-40 flex items-center justify-center" v-else>
      <AdminMemorialsEditorVideosBtn />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

const editorStore = memorialEditorStore()
const videos = computed(() => editorStore.memorial.videos);
</script>