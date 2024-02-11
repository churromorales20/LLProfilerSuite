<template>
  <div>
    <!--<div v-show="socialStore.isWorking || !inited">-->
    <div v-show="socialStore.isWorking || !inited">
      <h2 class="mb-8 text-center">Please wait authenticating with {{ type === 'Facebook' ? 'Facebook' : 'Google'}}...</h2>
      <div class="flex items-center space-x-4">
        <USkeleton class="h-16 w-16" :ui="{ rounded: 'rounded-full' }" />
        <div class="space-y-2">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
      <UProgress class="mt-8" animation="carousel" />
    </div>

    <!--<div v-show="!socialStore.isWorking && socialStore.isErrored">-->
    <div v-show="!socialStore.isWorking && socialStore.isErrored" class="text-center">
      <UIcon name="i-fa6-solid-triangle-exclamation text-llyellow-700" class="confirm-data-icon" />
      <h2 class="mt-4 text-center font-semibold">Invalid confirmation data.</h2>
      <UButton @click="backToLogin" size="md" class="mt-4" color="primary" variant="solid" block>
        Back to login
      </UButton>
    </div>
    <!--<div v-show="!socialStore.isWorking && !socialStore.isErrored && inited">-->
    <div v-show="!socialStore.isWorking && !socialStore.isErrored && inited" class="text-center">
      <UIcon name="i-fa6-solid-circle-check text-green-600" class="confirm-data-icon" />
      <h2 class="mt-4 text-center font-semibold">Success redirecting</h2>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});
const { type } = props;
const socialStore = socialAuthStore()
const inited = defineModel('inited')
inited.value = false;
const route = useRoute()
const backToLogin = () => {
  navigateTo('/auth/login')
}
if (process.client) {
  const { error } = await useAsyncData(
    'auth_facebook_confirmation',
    async () => {
      console.log('SIGNN', route.query.sign);
      const result = await socialStore.confirmAuth(type, type === 'google' ? route.query.sign : null)
      inited.value = true;
      if (result) {
        navigateTo('/dashboard')
      }

    }
  )
}
</script>
<style scoped>
.confirm-data-icon {
  font-size: 5rem
}
</style>