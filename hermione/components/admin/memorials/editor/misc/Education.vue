<template>
  <div>
    <div class="border-b pb-4 border-gray-300 flex justify-between items-center">
      <h4 class="lg:text-md mr-10 font-semibold">{{ $t('memorials.education_title') }}</h4>
      <div class="flex">
        <UButton 
          size="sm"
          variant="outline"
          :loading="educationStore.saving"
          @click="() => {
            educationStore.setFormState(true)
          }"
          icon="i-mdi-plus"
          :ui="{ rounded: 'rounded-full' }"
        />
        <UPopover :popper="{ placement: 'auto' }" overlay v-model:open="open">
          <span class="hidden">H</span>
          <template #panel>
            <AdminMemorialsEditorMiscEducationForm @close-btn-pressed="() => {
              educationStore.setFormState(false)
            }" />
          </template>
        </UPopover>
      </div>
    </div>
    <div v-if="educationInfo == null || (Array.isArray(educationInfo) && educationInfo.length < 1)" class="flex justify-center items-center h-40">
      <h3>{{ $t('memorials.no_education') }}</h3>
    </div>
    <div v-if="educationInfo != null && Array.isArray(educationInfo) && educationInfo.length > 0">
      <ul class="mb-4">
        <li v-for="item, index in educationInfo" :key="`_education_info_item_${index}_`">
          <AdminMemorialsEditorMiscEducationItem 
            :educationItem="item" 
            :index="index" 
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const locale = useI18n()
const educationStore = memorialEducationStore()
const open = computed({
  get(){
    return educationStore.isFormOpened
  },
  set(newVal){
    
    educationStore.setFormState(newVal)
  }
});
const editorStore = memorialEditorStore()
const educationInfo = computed(() => {
  return editorStore.educationInfo
});

</script>