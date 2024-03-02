<template>
  <div class="w-full bg-white p-4 rounded-md mb-4">
    <div class="mb-2 min-h-12 pb-2 border-b border-gray-300 flex justify-between items-center">
      <label for="biography" class="text-neutral-950 text-lg font-bold block">{{ $t('memorials.biography') }}</label>
      <UButton 
        v-if="originalMemorial.bio !== memorial.bio" 
        size="md" 
        variant="outline"
        :loading="editorStore.updatingAttr === 'bio'" 
        @click="() => {
          updateAttribute('bio', memorial.bio, true)
        }" 
        icon="i-fa6-solid-floppy-disk" 
        :label="$t('general.update')" 
      />
    </div>
    <AdminMemorialsEditorMarkDownEditor v-model="memorial.bio" />
  </div>
</template>
<script setup>


const locale = useI18n()
const editorStore = memorialEditorStore()

const updateAttribute = (attribute, value, now) => {

  editorStore.updateMemorial(attribute, value, now === true);
}

const memorial = computed(() => {
  return editorStore.memorial
});



const originalMemorial = computed(() => {
  return editorStore.originalMemorial
});

</script>