<template>
  <AdminTitle title="My memorials">
    <template v-slot:buttons>
      <CommonsShoppingModal />
    </template>
  </AdminTitle>
  <AdminLoader v-if="memorialStore.isWorking" />
  <div v-else-if="memorialStore.isErrored">
    ERORR
  </div>
  <AdminMemorialsList v-else />
</template>
<script setup>
import { onMounted } from 'vue';

const showShoppingModal = ref(false);
const memorialStore = memorialsStore()
onMounted(() => {
  memorialStore.fetchList();
});
</script>