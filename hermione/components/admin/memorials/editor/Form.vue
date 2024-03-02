<template>
  <div v-if="editorStore.showForm">
    <AdminMemorialsEditorFormGeneral />
    <AdminMemorialsEditorBiography />
    <div class="flex flex-col md:flex-row mb-4 mt-2 gap-4">
      <div class="w-full md:w-1/2 bg-white p-4 rounded-md">
        <div class="border-b min-h-11 border-gray-300 pb-2 mb-4 flex justify-between">
          <label for="obituary" class="text-neutral-950 text-lg font-bold block">{{ $t('memorials.obituary') }}</label>
          <UButton 
            v-if="originalMemorial.obituary !== memorial.obituary" 
            size="sm"
            variant="outline"
            :loading="editorStore.updatingAttr === 'obituary'"
            @click="() => {
              updateAttribute('obituary', memorial.obituary, true)
            }"
            icon="i-fa6-solid-floppy-disk"
            :label="$t('general.update')" 
          />
        </div>
        <UTextarea 
          :ui="{
            form: 'form-textarea min-h-112',
          }"
          v-model="memorial.obituary"
          size="xl" 
          id="obituary" 
          :placeholder="$t('memorials.enter_obituary')"
        />
      </div>
      <div class="w-full md:w-1/2 bg-white p-4 rounded-md">
        <AdminMemorialsEditorGraveyardInfo />
      </div>
    </div>
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