<template>
  <UModal 
    v-model="isOpen" 
    :fullscreen="viewport.isLessThan('lg')"
    :ui="{
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
      <AdminMemorialsEditorLoader v-if="editorStore.isWorking" />
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

const viewport = useViewport()
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
    min-width: 1050px;
  }
  .ll-modal-editor-body{
    max-height: 85vh;
    overflow: auto;
    padding: 15px 10px !important;
  }
</style>