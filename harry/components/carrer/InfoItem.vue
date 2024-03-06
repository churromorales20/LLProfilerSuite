<template>
  <div class="border-b border-gray-200 py-2 flex items-center justify-between">
    <div>
      <h3 class="text-sm">{{ carrerItem.position }} {{ $t('profile.location_at') }} {{ carrerItem.company }}</h3>
      <h4 class="text-sm" v-if="!isEmptyString(carrerItem.start_date!)">
        {{ $t('profile.date_since') }}: {{ formatDate(carrerItem.start_date!) }}
        {{ !isEmptyString(carrerItem.end_date!) ? ` - ${$t('profile.date_until')}: ${formatDate(carrerItem.end_date!)}` : '' }}
      </h4>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IEmploymentInfo } from '@ll-interfaces/IMemorialMisc';
import { format, parse } from 'date-fns'

const props = defineProps({
  carrerItem: {
    type: Object as () => IEmploymentInfo,
    required: true,
  }
});
const { carrerItem } = props;

const formatDate = (dateString: string): string => {
  const dateObject = parse(`01-${dateString}`, 'dd-MM-yyyy', new Date());

  return format(dateObject, 'MMM, yyy');
}
</script>