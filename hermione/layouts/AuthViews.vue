<template>
  <div id="perra" class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"></div>
    <div class="z-10 w-fit ">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img style="height:170px;" class="mx-auto w-auto" src="/logo_trans.png" alt="Logo">
      </div>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 min-h-80">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
useSeoMeta({
  title: 'Legacy Link Memorials - A tribute for our loved ones',
  ogTitle: 'Legacy Link Memorials - A tribute for our loved ones',
  description: 'Legacy link digital memorials',
  ogDescription: 'Legacy link digital memorials',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
  #perra {
    background-image: url('/web_bg.webp')
  }
</style>