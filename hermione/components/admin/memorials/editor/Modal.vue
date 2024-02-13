<template>
  <UModal v-model="isOpen" :ui="{
    width: 'll-card'
  }">
    <UCard :ui="{ 
      ring: '', 
      body: {
        background: 'bg-zinc-200',
        base: 'll-modal-editor-body',
      },
      divide: 'divide-y divide-gray-100 dark:divide-gray-800' 
    }">
      <template v-if="editorStore.isWorking">
        <div class="flex items-center space-x-4">
          <USkeleton class="h-20 w-20" :ui="{ rounded: 'rounded-full' }" />
          <div class="space-y-2">
            <USkeleton class="h-3 w-96" />
            <USkeleton class="h-3 w-80" />
            <USkeleton class="h-3 w-72" />
          </div>
        </div>
        <div class="space-y-3 mt-4">
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-4/6" />
          <USkeleton class="h-3 w-3/6" />
        </div>
      </template>
      <AdminMemorialsEditor v-else/>
      <template #header>
          <div v-if="!editorStore.isWorking">
            Mis COjonessss
          </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup>
import { computed } from 'vue'

const editorStore = memorialEditorStore()
const isOpen = computed({
  get() {
    return editorStore.isEditing;
  },
  set() {
    editorStore.reset();
  }
});
</script>
<style>
  .ll-card {
    min-width: 960px;
  }
  .ll-modal-editor-body{
    max-height: 85vh;
    overflow: auto;
  }
</style>