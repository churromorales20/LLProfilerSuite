<template>
  <h5>YES</h5>
</template>
<script setup>
if (!process.client) {
  navigateTo('/login')
}

</script>