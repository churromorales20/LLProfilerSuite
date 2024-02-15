<template>
  <AdminTitle title="My memorials">
    <template v-slot:buttons>
      <UButton icon="i-fa6-solid-qrcode">{{ $t('memorials.add_new') }}</UButton>
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
  const memorialStore = memorialsStore()
  onMounted(() => {
    memorialStore.fetchList();
  });
</script>