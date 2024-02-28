<template>
  <transition name="fade" @after-leave="removeEntry">
    <div v-if="showByStatus" class="bg-zinc-100 border border-gray-300 p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
      <div class="flex border-b border-gray-200 pb-2 items-center mb-2">
        <UTooltip 
          :text="entry.user ? $t('memorials.condolence_user_verified') : $t('memorials.condolence_user_anonymous')"
          :popper="{ placement: 'right' }"
        >
          <UIcon :name="userInfo.icon" />
        </UTooltip>
        <h2 class="text-md font-bold ml-2">{{ userInfo.full_name }}</h2>
      </div>
      <p class="text-gray-700 mb-2 text-sm">
        {{ entry.message_text }}
      </p>
      <div class="flex justify-between items-center mt-2">
        <div class="flex items-center">
          <p class="text-gray-500 text-sm">{{ entryDate }}</p>
        </div>
        <div class="flex items-center">
          <span class="text-sm font-semibold mr-2">{{ $t('memorials.condolence_update_status') }}:</span>
          <USelect 
            :disabled="isUpdatingStatus || !isCondolencesActive"
            size="md"
            v-model="currentStatus" 
            :options="condolencesStore.statusOptions" 
            option-attribute="name" 
            class="ml-2" 
          >
            <template #trailing>
              <UIcon v-if="isUpdatingStatus" name="i-fa6-solid-circle-notch" class="animate-spin" />
              <UIcon v-else name="i-heroicons-chevron-down-20-solid" />
            </template>
          </USelect>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns'

const memorialStore = memorialEditorStore();
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const isCondolencesActive = computed(() => memorialStore.settings?.condolences_wall);

const { index } = props;
const condolencesStore = condolencesTabStore()
const isUpdatingStatus = ref(false);
const showByStatus = ref(true);

const removeEntry = () => {
  
  condolencesStore.removeEntryByIndex(index)
  showByStatus.value = true;
}

const currentStatus = computed({
  get() {
    return condolencesStore.list[index].status;
  },
  async set(newStatus) {
    isUpdatingStatus.value = true;
    await condolencesStore.updateStatus(index, newStatus);
    isUpdatingStatus.value = false;
    //showByStatus.value = checkDisplayByStatus();
  }
});

const entry = computed(() => {
  return condolencesStore.list[index]
});

const checkDisplayByStatus = () => {
  return condolencesStore.list[index].status === condolencesStore.filters.status
};

const entryDate = computed(() => {
  let dateEntry = condolencesStore.list[index].created_at;
  
  if (typeof dateEntry === 'string') {
    dateEntry = new Date(dateEntry)
  }
  return format(dateEntry, 'd MMM, yyy HH:mm')
});

const userInfo = computed(() => {
  const item = condolencesStore.list[index];
  if (!item.user) {
    return {
      full_name: `${item.user_info!.first_name} ${item.user_info!.last_name}`,
      icon: 'i-fa6-solid-user-secret'
    }
  } 

  return {
    full_name: `${item.user.first_name} ${item.user.last_name}`,
    icon: 'i-fa6-solid-user-check'
  }
});
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>