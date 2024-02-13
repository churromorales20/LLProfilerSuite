<template>
  <div class="flex pb-2 border-b-2 border-slate-200 mb-2">
    <h3 class="font-bold text-3xl">{{ title }}</h3>
    <div class="ml-8">
      <slot name="buttons"/>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  });
  const { title } = props;
</script>