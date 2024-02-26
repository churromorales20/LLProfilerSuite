<template>
  <div class="space-y-4">
    <div>
      <label for="address" class="block text-sm font-medium text-gray-700">
        {{ $t('addresses.line_1') }}
      </label>
      <div class="mt-1">
        <UInput 
          size="md" 
          color="primary" 
          @blur="shopping.validate()" 
          v-model="shippingAddress.address_line_1"
          icon="i-mdi-home-plus" 
          :placeholder="$t('addresses.line_1_placeholder')" 
        />
      </div>
    </div>
    <div>
      <label for="address" class="block text-sm font-medium text-gray-700">
        {{ $t('addresses.reference') }}
      </label>
      <div class="mt-1">
        <UInput 
          size="md" 
          color="primary" 
          v-model="shippingAddress.reference" 
          icon="i-mdi-map-marker-path"
          :placeholder="$t('addresses.reference_placeholder')" 
        />
      </div>
    </div>
    <div>
      <label for="country" class="block text-sm font-medium text-gray-700">
        {{ $t('addresses.country') }}
      </label>
      <div class="mt-1">
        <USelect 
          size="md" 
          color="primary" 
          @blur="shopping.validate()" 
          icon="i-mdi-earth"
          :placeholder="$t('addresses.country_placeholder')"
          v-model="shippingAddress.country" 
          :options="countries" 
          option-attribute="name" 
        />
      </div>
    </div>
    <div>
      <label for="state" class="block text-sm font-medium text-gray-700">
        {{ $t('addresses.state') }}
      </label>
      <div class="mt-1">
        <UInput 
          size="md" 
          color="primary" 
          @blur="shopping.validate()" 
          v-model="shippingAddress.state"
          icon="i-fa6-solid-flag" 
          :placeholder="$t('addresses.state_placeholder')"
        />
      </div>
    </div>
    <div>
      <label for="city" class="block text-sm font-medium text-gray-700">
        {{ $t('addresses.city') }}
      </label>
      <div class="mt-1">
        <UInput 
          size="md" 
          color="primary" 
          @blur="shopping.validate()" 
          v-model="shippingAddress.city"
          icon="i-fa6-solid-city" 
          :placeholder="$t('addresses.city_placeholder')"
        />
      </div>
    </div>
    <div>
      <label for="zip" class="block text-sm font-medium text-gray-700">
        {{ $t('addresses.zip_code') }}
      </label>
      <div class="mt-1">
        <UInput 
          size="md" 
          color="primary" 
          @blur="shopping.validate()" 
          v-model="shippingAddress.postal_code"
          icon="i-mdi-mailbox" 
          :placeholder="$t('addresses.zip_code_placeholder')"
        />
      </div>
    </div>
    <UButton 
      v-if="shopping.addressList.length > 0"
      icon="i-mdi-home-plus"
      size="md" 
      @click="goToBook" 
      variant="outline" 
      :label="$t('addresses.select_address_btn')" 
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const goToBook = () => {
  shopping.shippingMovetStep(3);
}
const shopping = shoppingStore();
const shippingAddress = computed(() => shopping.shippingAddress);
const countries = [
  { "name": "Argentina", "value": "AR" },
  { "name": "Bolivia", "value": "BO" },
  { "name": "Brazil", "value": "BR" },
  { "name": "Chile", "value": "CL" },
  { "name": "Colombia", "value": "CO" },
  { "name": "Ecuador", "value": "EC" },
  { "name": "Guyana", "value": "GY" },
  { "name": "Paraguay", "value": "PY" },
  { "name": "Peru", "value": "PE" },
  { "name": "Suriname", "value": "SR" },
  { "name": "Uruguay", "value": "UY" },
  { "name": "Venezuela", "value": "VE" },
  { "name": "Costa Rica", "value": "CR" },
  { "name": "El Salvador", "value": "SV" },
  { "name": "Guatemala", "value": "GT" },
  { "name": "Honduras", "value": "HN" },
  { "name": "Nicaragua", "value": "NI" },
  { "name": "Panama", "value": "PA" },
  { "name": "USA", "value": "US" }
]
</script>

<style scoped>
/* Custom styles if needed */
</style>
