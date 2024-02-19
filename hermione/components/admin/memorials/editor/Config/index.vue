<template>
  <div class="container mx-auto pb-4 pt-4 px-4 bg-white min-h-96">
    <UAccordion 
      multiple
      :items="items" 
      :ui="{ wrapper: 'flex flex-col w-full' }"
    >
      <template #default="{ item, index, open }">
        <UButton 
          variant="link" 
          class="border-b border-gray-200 dark:border-gray-700"
          :ui="{ 
            rounded: 'rounded-none', 
            padding: { sm: 'px-0 py-3' } 
          }"
        >
          <template #leading>
            <div class="w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 flex items-center justify-center -my-1">
              <UIcon :name="item.icon" class="w-4 h-4 text-white dark:text-gray-900" />
            </div>
          </template>

          <span class="truncate">{{ item.label }}</span>

          <template #trailing>
            <UIcon name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']" />
          </template>
        </UButton>
      </template>
      <template #general>
        <AdminMemorialsEditorConfigGeneralTab />
      </template>
      <template #condolences-wall>
        <AdminMemorialsEditorConfigCondolences />
      </template>
      <template #uiconfig>
        UIS
      </template>
    </UAccordion>
  </div>
</template>

<script setup lang="ts">
const locale = useI18n()

const items = [
  {
    label: locale.t('general.general'),
    icon: 'i-fa6-solid-gear',
    defaultOpen: true,
    slot: 'general'
  }, 
  {
    label: locale.t('memorials.condolences_wall_tab'),
    icon: 'i-fa6-solid-gear',
    slot: 'condolences-wall'
  }, 
  /*{
    label: 'Colors/Fonts configurations',
    icon: 'i-fa6-solid-paintbrush',
    slot: 'uiconfig'
   }*/
];
</script>

