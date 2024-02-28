<template>
  <div class="border border-gray-300 mb-2 p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
    <div class="flex border-b border-gray-200 justify-between pb-2 items-center mb-2">
      <div class="flex items-center">
        <UTooltip 
          :text="entry.user ? $t('memorials.condolence_user_verified') : $t('memorials.condolence_user_anonymous')"
          :popper="{ placement: 'right' }"
        >
          <UIcon :name="userInfo.icon" />
        </UTooltip>
        <h2 class="text-md font-bold ml-2">{{ userInfo.full_name }}</h2>
      </div>
      <p class="text-gray-500 text-sm">{{ entryDate }}</p>
    </div>
    <p class="max-w-3xl text-gray-700 text-sm">
      {{ entry.message_text }}
    </p>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
import { format } from 'date-fns'
import type { ICondolenceEntry } from '@ll-interfaces/ICondolenceEntry';

const props = defineProps({
  entry: {
    type: Object as () => ICondolenceEntry,
    required: true,
  },
});

const { entry } = toRefs(props);
const wallStore = condolencesWallStore()

//const entry = computed(() => wallStore.entries[index.value]);

const userInfo = computed(() => {
  const item = entry.value;
  if (!item.user) {
    return {
      full_name: `${item.user_info!.first_name} ${item.user_info!.last_name}`,
      icon: 'i-mdi-incognito'
    }
  }

  return {
    full_name: `${item.user.first_name} ${item.user.last_name}`,
    icon: 'i-mdi-account-check'
  }
});

const entryDate = computed(() => {
  let dateEntry = entry.value.created_at;

  if (typeof dateEntry === 'string') {
    dateEntry = new Date(dateEntry)
  }
  return format(dateEntry, 'd MMM, yyy HH:mm')
});
</script>