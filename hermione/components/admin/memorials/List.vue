<template>
  <AdminMemorialsEditorModal />
  <AdminMemorialsTable />
  <div class="flex justify-end">
    <UPagination size="lg" v-model="page" :page-count="5" :total="items.length" />
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue'
  
  const editorStore = memorialEditorStore()
  const memorialStore = memorialsStore()
  const page = ref(1)
  const items = ref(Array(55))
  const isOpen = computed({
    get() {
      return editorStore.isEditing;
    },
    set() {
      editorStore.reset();
    }
  });
</script>