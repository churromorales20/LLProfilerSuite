<template>
  <div class="flex justify-center mt-4" v-if="!loadingMore && condolencesStore.totaEntriesRemaining > 0">
    <UButton 
      size="md" 
      variant="link"
      @click="loadMoreEntries"
      :label="$t('memorials.load_more_btn', { qty_more: condolencesStore.totaEntriesRemaining })" 
      block
    />
  </div>
  <div class="mt-4" v-if="loadingMore == true && condolencesStore.totaEntriesRemaining > 0">
    <AdminMemorialsEditorCondolencesListLoader :simpleRow="true" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

const condolencesStore = condolencesTabStore()

const loadMoreEntries = async () => {
  await condolencesStore.loadMoreEntries();
}

const loadingMore = computed(() => {
  return condolencesStore.isLoadingMore
});
</script>
