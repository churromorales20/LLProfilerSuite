<template>
  <div>
    <template v-if="profileStore.loaded == true">
      <ProfileDetails />
    </template>
    <template v-else>
      <h5>LODING</h5>
    </template>
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
</script>
