<template>
  <div class="border-b border-gray-200 py-2 flex items-center justify-between">
    <div>
      <h3 class="text-sm">{{ educationItem.field_of_study }} {{ $t('profile.location_at') }} {{ educationItem.institution }}</h3>
      <h4 class="text-sm" v-if="!isEmptyString(educationItem.degree!)">
        {{ $t('profile.degree_label') }}: {{ educationItem.degree }}
      </h4>
      <h4 class="text-sm" v-if="!isEmptyString(educationItem.start_date!)">
        {{ $t('profile.date_since') }}: {{ formatDate(educationItem.start_date!) }}
        {{ !isEmptyString(educationItem.end_date!) ? ` - ${$t('profile.date_until')}: ${formatDate(educationItem.end_date!)}` : '' }}
      </h4>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IEducationInfo } from '@ll-interfaces/IMemorialMisc';
import { format, parse } from 'date-fns'

const props = defineProps({
  educationItem: {
    type: Object as () => IEducationInfo,
    required: true,
  }
});
const { educationItem } = props;

const formatDate = (dateString: string): string => {
  const dateObject = parse(`01-${dateString}`, 'dd-MM-yyyy', new Date());

  return format(dateObject, 'MMM, yyy');
}
</script>