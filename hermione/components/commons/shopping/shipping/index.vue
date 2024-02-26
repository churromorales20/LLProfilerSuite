<template>
  <div class="mt-6">
    <h2 class="text-lg font-semibold pb-3 mb-4 border-b border-gray-300">
      {{ shopping.shippingViewStep == 3 ?$t('addresses.select_shipping_address') :$t('addresses.shipping_address_title') }}
    </h2>
    <transition name="fade" @after-leave="red">
      <CommonsShoppingShippingForm v-if="shopping.shippingViewStep == 2"/>
    </transition>
    <transition name="fade" @after-leave="red">
      <CommonsShoppingShippingAddressBook v-if="shopping.shippingViewStep == 3" />
    </transition>
    <transition name="fade" @after-leave="red">
      <CommonsShoppingShippingLoader v-if="shopping.shippingViewStep == 1"/>
    </transition>
  </div>
</template>

<script setup lang="ts">

const shopping = shoppingStore();
const red = () => {
  
  shopping.shippingMoveNextStep();
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
