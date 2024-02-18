<template>
  <div class="flex border-b border-gray-200 pb-2 items-center mb-4 pb-4">
    <USkeleton :ui="uiOptions" class="h-14 w-14 mr-4" />
    <div class="space-y-2 w-5/6">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
    </div>
  </div>
  <p class="text-gray-700 mb-2 text-sm space-y-2">
    <USkeleton :ui="uiOptions" class="h-3 w-full" />
    <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
    <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
    <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
  </p>
  <div v-if="simpleRow != true" class="flex border-b border-gray-200 pb-2 items-center mt-6 pb-4">
    <USkeleton :ui="uiOptions" class="h-14 w-14 mr-4" />
    <div class="space-y-2 w-5/6">
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-full" />
      <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
    </div>
  </div>
  <p v-if="simpleRow != true" class="text-gray-700 mb-2 text-sm space-y-2" dir="rtl">
    <USkeleton :ui="uiOptions" class="h-3 w-full" />
    <USkeleton :ui="uiOptions" class="h-3 w-5/6" />
    <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
    <USkeleton :ui="uiOptions" class="h-3 w-4/6" />
  </p>
</template>
<script setup lang="ts">

const uiOptions = ref({
  background: 'bg-cool-300',
  rounded: 'rounded-full'
})

const props = defineProps({
  simpleRow: {
    type: Boolean,
    required: false,
    default: false
  },
});
const { simpleRow } = props;
</script>
