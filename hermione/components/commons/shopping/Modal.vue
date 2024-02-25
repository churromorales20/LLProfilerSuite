<template>
  <UButton 
    size="md" 
    @click="() => {
      shopping.setModalStatus(true)
    }"
    icon="i-fa6-solid-qrcode"
  >
    {{ $t('memorials.add_new') }}
  </UButton>
  <UModal 
    v-model="isOpen" 
    :ui="{
      width: 'll-card'
    }"
    :prevent-close="preventClose"
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
      <CommonsShopping :inAdmin="true"/>
    </UCard>
  </UModal>
</template>
<script setup>
const isOpen = computed({
  get() {
    return shopping.modalOpened
  },
  set() {
    shopping.setModalStatus(false)
  }
});
const shopping = shoppingStore();
const preventClose = computed(() => shopping.viewStep === 3);
</script>