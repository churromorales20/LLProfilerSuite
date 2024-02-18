<template>
  <div v-if="!condolencesStore.isWorking" class="container mx-auto pb-4 pt-10 px-4 bg-white min-h-96">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-semibold">{{ $t('memorials.condolence_wall_title') }}</h3>
      <div class="flex items-center">
        <label for="filter" class="text-sm font-semibold">{{ $t('general.status') }}:</label>
        <USelect 
          size="md"
          v-model="filterStatus" 
          :options="condolencesStore.statusOptions" 
          option-attribute="name" 
          class="ml-2" 
        />
      </div>
    </div>
    <template v-if="!condolencesStore.isFiltering">
      <template 
        v-if="condolencesStore.list.length > 0"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <transition-group name="fade">
            <AdminMemorialsEditorCondolencesEntry 
              :index="index" 
              :key="`_condolence_wall_entry_${index}_`"
              v-for="(entry, index) in condolencesStore.list" 
            />
          </transition-group>
        </div>
        <AdminMemorialsEditorCondolencesLoadMore />
      </template>
      <div v-else class="flex items-center justify-center h-64 border-t border-gray-200">
        <h3 class="text-md font-semibold">{{ $t('memorials.condolence_no_records') }}</h3>
      </div>
    </template>
    <AdminMemorialsEditorCondolencesListLoader v-else />
  </div>
  <div v-else class="min-h-96">
    <AdminMemorialsEditorCondolencesLoader />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

const locale = useI18n()

const uiOptions = ref({
  background: 'bg-cool-300',
  rounded: 'rounded-full'
})

const condolencesStore = condolencesTabStore()
const memorialStore = memorialEditorStore();

const filterStatus = computed({
  get() {
    return condolencesStore.filters.status;
  },
  set(newStatus) {
    condolencesStore.setStatus(newStatus);
  }
});

onMounted(() => {
  condolencesStore.initStatuses([
    {
      name: locale.t('memorials.condolence_status_pending'),
      value: 'PENDING'
    },
    {
      name: locale.t('memorials.condolence_status_approved'),
      value: 'APPROVED',
    },
    {
      name: locale.t('memorials.condolence_status_rejected'),
      value: 'REJECTED'
    },
    {
      name: locale.t('memorials.condolence_status_all'),
      value: '*'
    }
  ]
  );
  condolencesStore.fetch(memorialStore.memorial?.code!, memorialStore.memorial?.id!);
});
</script>
