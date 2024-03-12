<template>
  <div>
    <div class="border-b pb-4 border-gray-300 flex justify-between items-center">
      <h4 class="lg:text-md mr-10 font-semibold">{{ $t('memorials.carrer_title') }}</h4>
      <div class="flex">
        <UButton 
          size="sm"
          variant="outline"
          :loading="workStore.saving"
          @click="() => {
            workStore.setFormState(true)
          }"
          icon="i-mdi-plus"
          :ui="{ rounded: 'rounded-full' }"
        />
        <UPopover :popper="{ placement: 'auto' }" overlay v-model:open="open">
          <span class="hidden">H</span>
          <template #panel>
            <AdminMemorialsEditorMiscWorkForm @close-btn-pressed="() => {
              workStore.setFormState(false)
            }" />
          </template>
        </UPopover>
      </div>
    </div>
    <div v-if="workInfo == null || (Array.isArray(workInfo) && workInfo.length < 1)" class="flex justify-center items-center h-40">
      <h3>{{ $t('memorials.no_carrer') }}</h3>
    </div>
    <div v-if="workInfo != null && Array.isArray(workInfo) && workInfo.length > 0">
      <ul class="mb-4">
        <li v-for="work, index in workInfo" :key="`_workinfo_item_${index}_`">
          <AdminMemorialsEditorMiscWorkItem 
            :workItem="work" 
            :index="index" 
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const locale = useI18n()
const workStore = memorialWorkStore()
const open = computed({
  get(){
    return workStore.isFormOpened
  },
  set(newVal){
    workStore.setFormState(newVal)
  }
});
const editorStore = memorialEditorStore()
const workInfo = computed(() => {
  return editorStore.workInfo
});

</script>