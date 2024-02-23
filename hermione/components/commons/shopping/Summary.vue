<!-- OrderSummary.vue -->
<template>
  <div>
    <h2 class="text-lg font-semibold mb-4 pb-3 border-b border-gray-300">Order Summary</h2>

    <!-- Cart items -->
    <div v-for="(item, index) in order.items" :key="index" class="flex justify-between text-sm mb-2">
      <span>{{ $t(`shopping.item${item.lang_tag}`) }}</span>
      <CommonsNumbersCurency :amount="item.price" :currency="order.currency" />
    </div>

    <!-- Subtotal -->
    <div class="flex border-t border-gray-300 mt-4 pt-4 justify-end gap-2 gap-2 text-sm mb-2">
      <span>Subtotal:</span>
      <span><CommonsNumbersCurency :amount="shopping.subTotal" :currency="order.currency" /></span>
    </div>

    <!-- Taxes -->
    <div class="flex justify-end gap-2 text-sm mb-2">
      <span>Taxes:</span>
      <span>
        <CommonsNumbersCurency :amount="0" :currency="order.currency" />  
      </span>
    </div>

    <!-- Shipping -->
    <div class="flex justify-end gap-2 text-sm mb-2">
      <span>Shipping:</span>
      <span>
        <CommonsNumbersCurency :amount="order.delivery" :currency="order.currency" />  
      </span>
    </div>

    <!-- Discount -->
    <div class="flex justify-end gap-2 text-sm mb-2">
      <span>Discount:</span>
      <span>-<CommonsNumbersCurency :amount="shopping.totalDiscount" :currency="order.currency" /></span>
    </div>

    <!-- Total -->
    <div class="flex justify-end gap-2">
      <span class="font-semibold text-md">Total:</span>
      <span class="font-semibold text-md">
        <CommonsNumbersCurency :amount="orderTotal" :currency="order.currency" />
      </span>
    </div>
    <div class="mt-2 pt-2 border-t border-gray-300">
      <UCheckbox 
        @change="() => {
          shopping.validate()
        }"
        class="mb-2" 
        color="primary" 
        label="Acepted our terms and conditions" 
        v-model="shopping.terms_conditions" 
      />
      <UButton
        icon="i-mdi-google"
        size="sm"
        color="primary"
        square
        label="Continue"
        :loading="false"
        :disabled="!shopping.isValid"
        block
      />
    </div>
    <img style="width:12rem;" class="mx-auto w-auto mt-4" src="/logo.png" alt="Logo">
    <img style="width:6rem;" class="mx-auto w-auto" src="/secure_ssl.png" alt="Logo">
  </div>
</template>

<script setup>
import { computed } from 'vue';

const shopping = shoppingStore();

const order = computed(() => shopping.orderData);
const orderTotal = computed(() => (shopping.subTotal + shopping.order.delivery + shopping.order.tax) - shopping.totalDiscount);
</script>

<style scoped>
/* Custom styles if needed */
</style>
