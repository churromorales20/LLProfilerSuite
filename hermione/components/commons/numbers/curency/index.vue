<template>
  <CommonsNumbersCurencyComponent 
    :nullValue="currencyOptions.nullValue"
    :reverseFill="currencyOptions.reverseFill"
    :prefill="currencyOptions.prefill"
    :precision="currencyOptions.precision"
    :minimumFractionDigits="currencyOptions.minimumFractionDigits"
    :decimal="currencyOptions.decimal"
    :min="currencyOptions.min"
    :max="currencyOptions.max"
    :separator="currencyOptions.separator"
    :prefix="currencyOptions.prefix"
    :modelValue="amount" 
  />
  
</template>
<script setup lang="ts">
import type { IcurencyInfo } from '@ll-interfaces/IcurencyInfo';
import type { IcurencyDisplayProps } from '@ll-interfaces/IcurencyDisplayProps';
import { computed } from 'vue';

const props = defineProps({
  amount: {
    type: [String, Number],
    required: true
  },
  currency: {
    type: Object as () => IcurencyInfo,
  },
});

const {
  amount,
  currency
} = props;

const currencyOptions = computed((): IcurencyDisplayProps => {
  let decimal = '.'
  let separator = ' '
  if (currency.code === 'PEN') {
    decimal = ','
    separator = '.'
  }

  return {
    nullValue: '',
    reverseFill: false,
    prefill: true,
    precision: 3,
    minimumFractionDigits: 2,
    decimal: decimal,
    min: 2,
    max: 2,
    separator: '',
    prefix: `${currency.symbol} `,
    suffix: '',
  } as IcurencyDisplayProps;
});
</script>