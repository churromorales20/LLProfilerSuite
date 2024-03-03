<template>
  <div class="flex pb-2 justify-between items-center border-b-2 border-slate-200 mb-2 lg:justify-start">
    <h3 class="font-bold text-base lg:text-3xl">{{ title }}</h3>
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