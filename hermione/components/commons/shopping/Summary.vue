<!-- OrderSummary.vue -->
<template>
  <div>
    <h2 class="text-lg font-semibold mb-4 pb-3 border-b border-gray-300">{{ $t('shopping.order_summary') }}</h2>

    <!-- Cart items -->
    <div v-for="(item, index) in order.items" :key="index" class="flex justify-between text-sm mb-2">
      <span>{{ $t(`shopping.item${item.lang_tag}`) }} x {{ (item.qty) }}</span>
      <CommonsNumbersCurency :amount="item.price * item.qty" :currency="order.currency" />
    </div>

    <!-- Subtotal -->
    <div class="flex border-t border-gray-300 mt-4 pt-4 justify-end gap-2 gap-2 text-sm mb-2">
      <span>{{ $t('shopping.sub_total') }}:</span>
      <span><CommonsNumbersCurency :amount="shopping.subTotal" :currency="order.currency" /></span>
    </div>

    <!-- Taxes -->
    <div class="flex justify-end gap-2 text-sm mb-2">
      <span>{{ $t('shopping.taxes') }}:</span>
      <span>
        <CommonsNumbersCurency :amount="0" :currency="order.currency" />  
      </span>
    </div>

    <!-- Shipping -->
    <div class="flex justify-end gap-2 text-sm mb-2">
      <span>{{ $t('shopping.shipping_total') }}:</span>
      <span>
        <CommonsNumbersCurency :amount="order.delivery" :currency="order.currency" />  
      </span>
    </div>

    <!-- Discount -->
    <div class="flex justify-end gap-2 text-sm mb-2">
      <span>{{ $t('shopping.discount_total') }}:</span>
      <span>-<CommonsNumbersCurency :amount="shopping.totalDiscount" :currency="order.currency" /></span>
    </div>

    <!-- Total -->
    <div class="flex justify-end gap-2">
      <span class="font-semibold text-md">{{ $t('shopping.grand_total') }}:</span>
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
        :label="$t('shopping.terms_conditions')" 
        v-model="shopping.terms_conditions" 
      />
      <UButton
        :icon="buttonInfo.icon"
        size="md"
        color="primary"
        square
        @click="continueNextStep"
        :label="buttonInfo.label"
        :loading="sendingOrder"
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
const sendingOrder = ref(false);
const locale = useI18n()

const continueNextStep = async () => {
  if (shopping.viewStep === 1) {
    shopping.shoppingMovetStep(2)
  } else {
    sendingOrder.value = true;
    await shopping.sendOrder()
    sendingOrder.value = false;
  }
}

const buttonInfo = computed(() => {
  if (shopping.viewStep === 1) {
    return {
      icon: 'i-fa6-solid-circle-chevron-right',
      label: locale.t('shopping.continue_order'),
    }
  }

  return {
    icon: 'i-mdi-cart-check',
    label: locale.t('shopping.confirm_order'),
  }
}); 

const shopping = shoppingStore();

const order = computed(() => shopping.orderData);
const orderTotal = computed(() => (shopping.subTotal + shopping.order.delivery + shopping.order.tax) - shopping.totalDiscount);
</script>

<style scoped>
/* Custom styles if needed */
</style>
