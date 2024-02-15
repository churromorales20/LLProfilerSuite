<template>
  <UTable :columns="columns" :ui="{
    wrapper: 'relative overflow-x-auto bg-white mb-4',
    tr: {
      base: 'hover:bg-slate-200 dark:hover:bg-gray-800/50 cursor-pointer',
      selected: 'bg-gray-50 dark:bg-gray-800/50',
      active: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer',
    }
  }" :rows="memorialStore.list">
    <template #avatar-data="{ row }">
      <UAvatar 
        :alt="`${row.first_name}${row.last_name}`" 
        :src="`/profiles/assets/${row.code}/${row.avatar}`" 
        size="md" 
      />
    </template>
    <template #fullname-data="{ row }">
      <span>{{ `${row.first_name} ${row.last_name}` }}</span>
    </template>
    <template #relationship-data="{ row }">
      <span>{{ `${!isEmpty(row?.relationship) ? row?.relationship : '-'}` }}</span>
    </template>
    <template #death-data="{ row }">
      <span>{{ getDateInfo(row.death_date, row.death_place) }}</span>
    </template>
    <template #borninfo-data="{ row }">
      <span>{{ getDateInfo(row.born_date, row.born_place) }}</span>
    </template>
    <template #status-data="{ row }">
      <span>Active</span>
    </template>
    <template #actions-data="{ row }">
      <div class="px-4">
        <UButton @click="editMemorial(row.id)" icon="i-fa6-solid-pen-to-square" size="sm" color="llblue" square class="mr-2" />
        <UButton icon="i-fa6-solid-share-nodes" size="sm" color="llyellow" square variant="solid" />
      </div>
    </template>
  </UTable>
</template>
<script setup>
import { onMounted } from 'vue';
import { format } from 'date-fns'

const memorialStore = memorialsStore()
const editorStore = memorialEditorStore()
const locale = useI18n()

const getDateInfo = (date, place) => {
  const validPlace = !isEmpty(place);
  const validDate = !isEmpty(date);
  const dateInfo = `${validPlace ? `${place}` : ''}
                      ${validPlace && validDate ? ', ' : ''}
                      ${validDate ? dateFormatter(date) : ''}`;

  return !isEmpty(dateInfo) ? dateInfo : '-';
}

const dateFormatter = (date) => {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return format(date, 'd MMM, yyy')
}

const editMemorial = (id) => {
  editorStore.fetch(id)
}

const isEmpty = (value) => {
  console.log('typeof value', typeof value);
  return (typeof value === 'string' && /^[\s\n]*$/.test(value)) || value === null || value === undefined ;
}

const columns = [
  {
    key: 'avatar',
    class: 'w-14'
  },
  {
    key: 'fullname',
    label: locale.t('memorials.full_name'),
  },
  {
    key: 'relationship',
    label: locale.t('memorials.relationship')
  },
  {
    key: 'borninfo',
    label: locale.t('memorials.born')
  },
  {
    key: 'death',
    label: locale.t('memorials.death')
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'actions',
    class: 'w-28'
  },

];
</script>