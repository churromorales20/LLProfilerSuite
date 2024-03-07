<template>
  <UTable 
    :columns="columnsDisplaying" 
    :ui="{
      wrapper: 'relative overflow-x-auto bg-white mb-4',
      tr: {
        base: 'hover:bg-slate-200 dark:hover:bg-gray-800/50 cursor-pointer',
        selected: 'bg-gray-50 dark:bg-gray-800/50',
        active: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer',
      }
    }" 
    :rows="memorialStore.list"
  >
    <template #avatar-data="{ row }">
      <UAvatar 
        :alt="`${row.first_name}${row.last_name}`" 
        :src="row.avatar ? `/profiles/assets/${row.code}/${row.avatar}` : null" 
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
      <span>
        Active
      </span>
    </template>
    <template #actions-data="{ row }">
      <div class="px-4 flex">
        <UButton @click="editMemorial(row.id)" icon="i-fa6-solid-pen-to-square" size="sm" color="llblue" square class="mr-2" />
        <UDropdown 
          :popper="{ placement: 'bottom-start' }"
          :ui="{
            item:{
              padding: 'px-1.5 py-4'
            }
          }"
          :items="[[
            {
              label: $t('memorials.share_link_fb'),
              to: 'https://www.facebook.com/sharer/sharer.php?u=example.org?code=' + row.code,
              target: '_blank',
              icon: 'i-mdi-facebook',
            },
            {
              label: $t('memorials.share_link_whatsapp'),
              to: `https://api.whatsapp.com/send?text=${whatsappMessage(row)}`,
              icon: 'i-mdi-whatsapp',
              target: '_blank',
            },
            {
              label: $t('memorials.share_link_copy'),
              click: () => {
                copyLink(row.code)
              },
              icon: 'i-mdi-content-copy',
            }
          ]]"
        >
          <UButton 
            icon="i-fa6-solid-share-nodes" 
            size="sm" 
            color="llyellow" 
            square 
            variant="solid" 
          />
        </UDropdown>
      </div>
    </template>
  </UTable>
</template>
<script setup>
import { format } from 'date-fns'

const memorialStore = memorialsStore()
const editorStore = memorialEditorStore()
const locale = useI18n()
const envStore = environmentStore();

const copyLink = (code) => {
  const link = `${envStore.profilesUrl}profile/${code}`;
  var tempTextArea = document.createElement("textarea");
  tempTextArea.value = link;
  tempTextArea.style.position = "fixed";
  tempTextArea.style.top = 0;
  tempTextArea.style.left = 0;
  tempTextArea.style.opacity = 0;
  
  document.body.appendChild(tempTextArea);

  tempTextArea.select();
  
  document.execCommand("copy");

  document.body.removeChild(tempTextArea);
}

const whatsappMessage = (row) => {
  return encodeURIComponent('htttp:///legaylink.pe/?code=' + row.code);
}

const getDateInfo = (date, place) => {
  const validPlace = !isEmpty(place);
  const validDate = !isEmpty(date);
  const dateInfo = `${validPlace ? `${place}` : ''}
                      ${validPlace && validDate ? ' - ' : ''}
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
  return (typeof value === 'string' && /^[\s\n]*$/.test(value)) || value === null || value === undefined ;
}
const viewport = useViewport()
const columnsDisplaying = computed(() => {
  console.log(viewport.breakpoint.value);
  if (viewport.breakpoint.value === 'lg') {
    const columnsInSmall = ['avatar', 'fullname', 'actions', 'relationship', 'status']
    return columns.filter((column) => columnsInSmall.includes(column.key));
  } else if (viewport.breakpoint.value === 'md') {
    const columnsInSmall = ['avatar', 'fullname', 'actions']
    return columns.filter((column) => columnsInSmall.includes(column.key));
  } else if (viewport.isLessThan('md')) {
    const columnsInSmall = ['fullname', 'actions']
    return columns.filter((column) => columnsInSmall.includes(column.key));
  }
  return columns;
})

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