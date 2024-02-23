<template>
  <div>
    <div class="text-gray-700 mb-6 text-sm space-y-2">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
    </div>
    <div class="text-gray-700 mb-6 text-sm space-y-2">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
    </div>
    <div class="text-gray-700 mb-6 text-sm space-y-2">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
    </div>
    <div class="text-gray-700 mb-6 text-sm space-y-2">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
    </div>
  </div>
</template>
<script setup>

const uiOptions = ref({
  background: 'bg-cool-300',
  rounded: 'rounded-full'
})
</script>