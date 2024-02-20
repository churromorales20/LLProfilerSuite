<template>
  <div class="h-40 bg-cover bg-white relative bg-center rounded-t-md mb-16 p-4">
    <div class="z-20 bg-white drop-shadow rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
      <USkeleton class="h-36 w-36" :ui="{ background: 'bg-cool-300', rounded: 'rounded-full' }" />
    </div>
    <div class="border-b border-slate-200 pb-20 space-y-3 flex justify-center items-center flex-col">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-2/6" />
    </div>
  </div>
  <div class="flex flex-col md:flex-row mb-4 mt-20 gap-4">
    <div class="w-full md:w-1/2 bg-white p-4 rounded-md space-y-3 mt-4">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
    </div>
    <div class="w-full md:w-1/2 bg-white p-4 rounded-md space-y-3 mt-4" dir="rtl">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
    </div>
  </div>
  <div class="bg-white p-4">
    <div class="space-y-3 mt-4">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
    </div>
    <div class="space-y-3 mt-4" dir="rtl">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
    </div>
    <div class="space-y-3 mt-8">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
    </div>
    <div class="space-y-3 mt-4" dir="rtl">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
      <USkeleton :ui="uiOptions" class="h-3 w-3/6" />
    </div>
  </div>
</template>

<script setup>
const uiOptions = ref({
  background: 'bg-cool-300',
  rounded: 'rounded-full'
})
</script>