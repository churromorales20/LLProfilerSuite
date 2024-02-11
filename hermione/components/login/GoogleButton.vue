<template>
  <div>
    <!--<a href="#" @click="getGoogleAuthUrl" class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
    -->
    <UButton :loading="socialStore.isWorking" @click="getGoogleAuthUrl" color="llyellow" size="md" block
      variant="outline">
      Google
    </UButton>
  </div>
</template>
<script setup>
const socialStore = socialAuthStore()

const getGoogleAuthUrl = async () => {
  const result = await socialStore.fetchSocialUrlAuth('google');

  if (result) {
    window.location.href = socialStore.url;
  }

}

</script>