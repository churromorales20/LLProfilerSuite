<template>
  <div class="z-10 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
    <div class="relative" @mouseover="avatarStore.setShowImageIcon(true)"
      @mouseleave="avatarStore.setShowImageIcon(false)">
      <UAvatar 
        :ui="{
          size: {
            '3xl': 'h-32 w-32 text-4xl'
          }
        }" 
        v-if="!avatarWorking" 
        size="3xl" 
        :src="`/profiles/assets/${memorial.code}/${memorial.avatar}`"
        :alt="`${memorial.first_name} ${memorial.last_name}`" 
      />
      <div v-else>
        <div class="rounded-full bg-slate-100 flex items-center justify-center p-8">
          <UIcon name="i-fa6-solid-circle-notch" class="text-llblue-600 animate-spin text-6xl" />
        </div>
      </div>
      <AdminMemorialsEditorAvatarMenu />
    </div>
  </div>
</template>
<script setup>

import { ref, computed } from 'vue'

const editorStore = memorialEditorStore();
const avatarStore = avatarSelectorStore();

const avatarWorking = computed(() => avatarStore.avatarWorking);

const memorial = computed(() => {
  return editorStore.memorial
});

</script>