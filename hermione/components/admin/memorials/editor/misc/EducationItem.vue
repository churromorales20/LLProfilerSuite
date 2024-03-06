<template>
  <div class="border-b border-gray-200 h-20 flex items-center justify-between">
    <div class="pr-2">
      <h3 class="text-base">{{ educationItem.field_of_study }} at {{ educationItem.institution }}</h3>
      <h4 class="text-sm" v-if="!isEmptyString(educationItem.degree!)">
        Degree: {{ educationItem.degree }}
      </h4>
      <h4 class="text-sm" v-if="!isEmptyString(educationItem.start_date!)">
        Since: {{ formatDate(educationItem.start_date!) }}
        {{ !isEmptyString(educationItem.end_date!) ? ` - Until: ${formatDate(educationItem.end_date!)}` : '' }}
      </h4>
    </div>
    <div class="flex">
      <UButton 
        size="sm"
        variant="outline"
        :loading="working || educationStore.itemUpdating == index"
        @click="() => {
          educationStore.editItem(educationItem, index)
        }"
        class="mr-2"
        icon="i-mdi-text-box-edit"
      />
      <UPopover :popper="{ placement: 'auto' }" v-model:open="open">
        <UButton 
          size="sm"
          color="red"
          variant="outline"
          :loading="working || educationStore.itemUpdating == index"
          icon="i-mdi-delete"
        />
        <template #panel>
          <UCard
            :ui="{
              body: {
                padding: 'p-4 sm:py-2 sm:px-4',
              },
            }"
          >
            <template #header>
              <h3 class="text-md font-semibold">Attention</h3>
            </template>
            <h3 class="text-sm py-8">Please confirm you to delete the education at {{ educationItem.institution }}</h3>
            <template #footer>
              <div class="flex justify-end">
                <UButton
                  label="Cancel"
                  size="sm"
                  class="mr-2"
                  variant="outline"
                  color="amber"
                  @click="() => {
                    open = false;
                  }"
                  icon="i-mdi-plus"
                />
                <UButton 
                  label="Save"
                  size="sm"
                  @click="() => {
                    deleteConfirmed();
                  }"
                  icon="i-mdi-content-save"
                />
              </div>
            </template>
          </UCard>
        </template>
      </UPopover>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IEducationInfo } from '@ll-interfaces/IMemorialMisc';
import { format, parse } from 'date-fns'

const educationStore = memorialEducationStore()
const open = ref(false);
const props = defineProps({
  educationItem: {
    type: Object as () => IEducationInfo,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const { educationItem, index } = toRefs(props);
const editorStore = memorialEditorStore()
const working = ref(false)
const deleteConfirmed = async () => {
  working.value = true;
  open.value = false;
  editorStore.deleteEducationInfo(index.value)
  working.value = false;

}

const formatDate = (dateString: string): string => {
  const dateObject = parse(`01-${dateString}`, 'dd-MM-yyyy', new Date());

  return format(dateObject, 'MMM, yyy');
}
</script>