<template>
  <AdminTitle title="My memorials">
    <template v-slot:buttons>
      <CommonsShoppingModal />
    </template>
  </AdminTitle>
  <AdminFirstLoginModal v-if="userStore.showTourModal"/>
  <AdminLoader v-if="memorialStore.isWorking" />
  <div v-else-if="memorialStore.isErrored">
    ERORR
  </div>
  <AdminMemorialsList v-else/>
  
</template>
<script setup>
const memorialStore = memorialsStore()
const userStore = userAdminStore()
onMounted(() => {
  memorialStore.fetchList();
});
</script>