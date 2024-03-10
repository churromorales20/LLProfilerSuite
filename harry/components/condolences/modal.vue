<template>
  <UModal 
    v-model="isOpen" 
    :fullscreen="viewport.isLessThan('lg')"
    :ui="{
      width: 'll-modal-standard',
      overlay: {
        background: 'bg-black/75 dark:bg-gray-800/75',
      }
    }"
  >
    <UCard :ui="{
      ring: '',
      base: 'h-full flex lg:h-max flex-col',
      body: {
        background: 'bg-white',
        base: 'grow lg:grow-0',
        padding: 'px-4 py-3 sm:py-3 sm:px-6',
      },
      divide: 'divide-y divide-gray-100 dark:divide-gray-800'
    }">
      <template #header>
        <div class="flex justify-between border-b-2 ll-border-heading pb-2 ll-box-title-main">
          <h2 class="font-semibold text-md lg:text-lg">{{ $t('condolences.modal_title') }}</h2>
        </div>
      </template> 
      <CondolencesForm />

      <template #footer>
        <div class="flex justify-end">
          <UButton 
            icon="i-mdi-close-circle" 
            size="md"
            @click="wallStore.toggleNewEntryModal(false)"
            variant="outline"
            color="amber" 
            :label="$t('condolences.modal_cancel_btn')"
          />
          <UButton 
            class="ml-2 ll-btn-custom"
            icon="i-mdi-hand-heart-outline" 
            size="md"
            :loading="isSendingEntry"
            @click="validateAndSend"
            color="sky" 
            :label="$t('condolences.modal_send_btn')"
            />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup>
const viewport = useViewport()
const wallStore = condolencesWallStore()
const isOpen = computed({
  get() {
    return wallStore.showingNewEntryModal;
  },
  set(newVal) {
    wallStore.toggleNewEntryModal(false)
  }
});

const isSendingEntry = computed(() => wallStore.isSendingEntry);

const validateAndSend = async () => {
  const result = await wallStore.validateAndSendNewEntry();

  if (result) {
    wallStore.toggleNewEntryModal(false);
  }
}
</script>
<style>
.ll-modal-standard {
  width: 50vw;
  max-width: 620px;
}
</style>