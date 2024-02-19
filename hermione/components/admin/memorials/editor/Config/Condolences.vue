<template>
  <div class="container mx-auto mt-4 mb-6">
    <div class="flex mb-4">
      <div>
        <label class="block text-gray-700 font-bold mb-2" for="condolencesWall">{{ $t('memorials.condolences_wall_tab') }}</label>
        <div class="flex items-center">
          <UToggle 
            size="lg" 
            v-model="wallStatus" 
            on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid" 
          />
          <label class="block ml-4 text-gray-700 font-bold ext-sm">
            {{ wallStatus ? 'Active' : 'Inactive' }}
          </label>
        </div>
      </div>
      <div class="ml-8">
        <label class="block text-gray-700 font-bold mb-2" for="condolencesWall">{{ $t('memorials.config_condolences_require') }}</label>
        <div class="flex items-center">
          <UToggle size="lg" v-model="condolenceRequireApproval" on-icon="i-heroicons-check-20-solid"
            off-icon="i-heroicons-x-mark-20-solid" />
          <label class="block ml-4 text-gray-700 font-bold ext-sm">
            {{ condolenceRequireApproval ? 'Approval required' : 'Open' }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const memorialStore = memorialEditorStore();
const memorialSettings = computed(() => memorialStore.settings);

const condolenceRequireApproval = computed({
  get() {
    return memorialStore.settings.condolences_wall_default_status === 'PENDING'
  },
  set(newVal) {
    const newStatus = newVal === true ? 'PENDING' : 'APPROVED';

    memorialStore.updateMemorialItem('condolences_wall_default_status', newStatus)
    memorialStore.updateConfigurations('condolences_wall_default_status', newStatus);
  }
});
const wallStatus = computed({
  get() {
    return memorialStore.settings.condolences_wall
  },
  set(newVal) {

    memorialStore.updateMemorialItem('condolences_wall', newVal as string)
    memorialStore.updateConfigurations('condolences_wall', newVal as string);
  }
});
</script>