<template>
  <div class="bg-zinc-100 border border-gray-300 p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
    <p class="text-gray-700 mb-12 pt-4 text-sm space-y-2">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
    </p>
    <AdminMemorialsEditorCondolencesListLoader />
  </div>
</template>
<script setup lang="ts">
const uiOptions = ref({
  background: 'bg-cool-300',
  rounded: 'rounded-full'
})
</script>