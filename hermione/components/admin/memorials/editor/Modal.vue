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
        <div class="h-44 bg-cover relative bg-center rounded-t-md mb-16">
          <div class="z-100 bg-white rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
            <USkeleton class="h-40 w-40" :ui="{ rounded: 'rounded-full' }" />
          </div>
          <div class="border-b border-slate-200 pb-20 space-y-3 flex justify-center items-center flex-col">
            <USkeleton class="h-3 w-full" />
            <USkeleton class="h-3 w-full" />
            <USkeleton class="h-3 w-5/6" />
            <USkeleton class="h-3 w-5/6" />
            <USkeleton class="h-3 w-4/6" />
            <USkeleton class="h-3 w-3/6" />
            <USkeleton class="h-3 w-2/6" />
          </div>
        </div>
        <div class="space-y-3 mt-4">
          <USkeleton class="h-3 w-full" />
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-4/6" />
          <USkeleton class="h-3 w-3/6" />
        </div>
        <div class="space-y-3 mt-4">
          <USkeleton class="h-3 w-full" />
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-4/6" />
          <USkeleton class="h-3 w-3/6" />
        </div>
        <div class="space-y-3 mt-8" dir="rtl">
          <USkeleton class="h-3 w-full" />
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-4/6" />
          <USkeleton class="h-3 w-3/6" />
        </div>
        <div class="space-y-3 mt-4" dir="rtl">
          <USkeleton class="h-3 w-full" />
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-5/6" />
          <USkeleton class="h-3 w-4/6" />
          <USkeleton class="h-3 w-3/6" />
        </div>
      </template>
      <AdminMemorialsEditor v-else-if="!editorStore.isErrored"/>
      <template v-if="!editorStore.isWorking" #header>
          <div class="flex justify-between">
            <h2 class="font-semibold text-xl">{{ $t('memorials.profile_editor') }}</h2>
            <UButton 
              icon="i-fa6-solid-ban" 
              size="md"
              @click="closeModal"
              color="llblue" 
              :label="$t('general.close')"
            />
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

const closeModal = () => {
  editorStore.reset();
}
</script>
<style>
  .ll-card {
    min-width: 960px;
  }
  .ll-modal-editor-body{
    max-height: 85vh;
    overflow: auto;
    padding: 15px 10px !important;
  }
</style>