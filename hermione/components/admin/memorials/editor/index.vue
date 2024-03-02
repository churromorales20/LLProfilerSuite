<template>
  <div class="relative h-40 mb-12">
    <AdminMemorialsEditorHeader />
  </div>
  <UTabs 
    :items="tabs" 
    :default-index="0"
    :ui="{
      wrapper: 'relative space-y-0',
      list:{
        tab:{
          size: 'text-md',
        }
      }
    }"
  >
    <template #general_info="{ item }">
      <AdminMemorialsEditorForm />
    </template>
    <template #condolences="{ item }">
      <AdminMemorialsEditorCondolences />
    </template>
    <template #multimedia="{ item }">
      <div class="mt-2">
        <AdminMemorialsEditorImages />
        <AdminMemorialsEditorVideos />
      </div>
    </template>
    <template #configurations="{ item }">
      <AdminMemorialsEditorConfig />
    </template>
    <template #default="{ item, index, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UIcon :name="item.icon" class="w-4 h-4 flex-shrink-0" />

        <span class="truncate">{{ item.label }}</span>

        <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
      </div>
    </template>
  </UTabs>
</template>
<script setup lang="ts">
const locale = useI18n()
const tabs = [
  {
    slot: 'general_info',
    label: locale.t('memorials.gen_info_tab'),
    icon: 'i-fa6-solid-user-pen',
  }, 
  {
    slot: 'multimedia',
    label: 'Media',
    icon: 'i-fa6-solid-photo-film',
  },
  {
    slot: 'condolences',
    label: locale.t('memorials.condolences_wall_tab'),
    icon: 'i-fa6-solid-handshake-simple',
  },
  {
    slot: 'configurations',
    label: locale.t('memorials.config_tab'),
    icon: 'i-fa6-solid-gears',
  }
]
</script>