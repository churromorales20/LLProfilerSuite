<template>
  <UModal 
    v-model="isOpen" 
    :ui="{
      width: 'll-modal-standard',
      overlay: {
        background: 'bg-black/75 dark:bg-gray-800/75',
      }
    }"
  >
    <UCard :ui="{
      ring: '',
      body: {
        background: 'bg-white',
        base: 'll-modal-editor-body',
        padding: 'px-4 py-3 sm:py-3 sm:px-6',
      },
      divide: 'divide-y divide-gray-100 dark:divide-gray-800'
    }">
      <template #header>
        <div class="flex justify-between">
          <h2 class="font-semibold text-xl">Leave an entry</h2>
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
            label="Cancel"
          />
          <UButton 
            class="ml-2"
            icon="i-mdi-hand-heart-outline" 
            size="md"
            :loading="isSendingEntry"
            @click="validateAndSend"
            color="sky" 
            label="Send"
            />
        </div>
      </template>
    </UCard>
  </UModal>
</template>
<script setup>
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