<template>
  <div class="border-b border-gray-200 h-20 flex items-center justify-between">
    <div>
      <h3 class="text-base">{{ workItem.position }} at {{ workItem.company }}</h3>
      <h4 class="text-sm" v-if="!isEmptyString(workItem.start_date!)">
        Since: {{ formatDate(workItem.start_date!) }}
        {{ !isEmptyString(workItem.end_date!) ? ` - Until: ${formatDate(workItem.end_date!)}` : '' }}
      </h4>
    </div>
    <div class="flex">
      <UButton 
        size="sm"
        variant="outline"
        :loading="working || workStore.itemUpdating == index"
        @click="() => {
          workStore.editItem(workItem, index)
        }"
        class="mr-2"
        icon="i-mdi-text-box-edit"
      />
      <UPopover :popper="{ placement: 'auto' }" v-model:open="open">
        <UButton 
          size="sm"
          color="red"
          variant="outline"
          :loading="working || workStore.itemUpdating == index"
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
            <h3 class="text-sm py-8">Please confirm you to delete the work experience at {{ workItem.company }}</h3>
            <template #footer>
              <div class="flex justify-end">
                <UButton
                  :label="$t('general.cancel')" 
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
                  :label="$t('general.save')" 
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
import type { IEmploymentInfo } from '@ll-interfaces/IMemorialMisc';
import { format, parse } from 'date-fns'

const workStore = memorialWorkStore()
const open = ref(false);
const props = defineProps({
  workItem: {
    type: Object as () => IEmploymentInfo,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
const { workItem, index } = toRefs(props);
const editorStore = memorialEditorStore()
const working = ref(false)
const deleteConfirmed = async () => {
  working.value = true;
  editorStore.deleteWorkInfo(index.value)
  working.value = false;

}

const formatDate = (dateString: string): string => {
  const dateObject = parse(`01-${dateString}`, 'dd-MM-yyyy', new Date());

  return format(dateObject, 'MMM, yyy');
}
</script>