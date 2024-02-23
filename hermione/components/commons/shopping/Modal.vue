<template>
  <UButton 
    size="md" 
    @click="isOpen = true"
    icon="i-fa6-solid-qrcode"
  >
    {{ $t('memorials.add_new') }}
  </UButton>
  <UModal 
    v-model="isOpen" 
    :ui="{
      width: 'll-card'
    }"
  >
    <UCard 
      :ui="{ 
        ring: '', 
        body: {
          background: 'bg-white',
          base: 'll-modal-editor-body',
        },
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }"
    >
      <CommonsShopping :inModal="true"/>
    </UCard>
  </UModal>
</template>
<script setup>
const isOpen = ref(false)

</script>