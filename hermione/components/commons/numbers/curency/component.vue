<template>
  <span>{{ maskedInputValue }}</span>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { cloneDeep } from './core'
import type { Input } from './core'
import NumberFormat from './number-format'
import defaultOptions from './options'
import type { Options } from './options'

const options = cloneDeep(defaultOptions)

export default defineComponent({
  name: 'VueNumber',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    nullValue: {
      type: [Number, String],
      default: options.nullValue
    },
    reverseFill: {
      type: Boolean,
      default: options.reverseFill
    },
    prefill: {
      type: Boolean,
      default: options.prefill
    },
    precision: {
      type: Number,
      default: () => options.precision
    },
    minimumFractionDigits: {
      type: Number,
      default: () => options.minimumFractionDigits
    },
    decimal: {
      type: String,
      default: () => options.decimal
    },
    min: {
      type: Number,
      default: () => options.min
    },
    max: {
      type: Number,
      default: () => options.max
    },
    separator: {
      type: String,
      default: () => options.separator
    },
    prefix: {
      type: String,
      default: () => options.prefix
    },
    suffix: {
      type: String,
      default: () => options.suffix
    }
  },
  setup(props, { emit }) {
    const maskedValue = ref(props.modelValue)
    const config = computed(() => ({ ...props }))
    const formatNumber = new NumberFormat(config.value as Options)

    const maskedInputValue = computed(() => {
      return formatNumber.format(maskedValue.value)
    })

    watch(
      () => props.modelValue,
      (newValue) => {
        maskedValue.value = newValue
      }
    )

    return {
      config,
      maskedValue,
      maskedInputValue
    }
  }
})
</script>