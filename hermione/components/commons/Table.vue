<template>
  <UTable :columns="columns" :rows="items">
    <slot />
  </UTable>
  <UPagination size="lg" v-model="page" :page-count="5" :total="items.length" />
</template>
<script setup lang="ts">
import type { ITableComponentProps } from '@ll-interfaces/ITableComponentsProps';
const props = defineProps({
  options: {
    type: Object as () => ITableComponentProps,
    required: true,
  }
});
const { items, columns } = props.options;
</script>