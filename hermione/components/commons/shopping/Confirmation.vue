<template>
  <div class="max-w-lg bg-white">
    <h2 class="text-lg font-semibold mb-4 pb-3 border-b border-gray-300">Confirm Order Details</h2>
    <!-- Customer Details -->
    <div class="mb-6">
      <h3 class="text-md font-semibold mb-2">{{ $t('shopping.customer_details') }}:</h3>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.customer_name') }}:</span> {{ orderDetails.first_name }} {{ orderDetails.last_name }}</p>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.customer_email') }}:</span> {{ orderDetails.email }}</p>
      <!-- Add more customer details as needed -->
    </div>
    
    <div class="mb-6">
      <h3 class="text-md font-semibold mb-2">{{ $t('shopping.memorial_plaque') }}:</h3>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.customer_name') }}:</span> {{ orderDetails.memorial_first_name }}</p>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.customer_last_name') }}:</span> {{ orderDetails.memorial_last_name }}</p>
      <!-- Add more shipping details as needed -->
    </div>

    <div class="mb-6">
      <h3 class="text-md font-semibold mb-2">{{ $t('shopping.shipping_details') }}:</h3>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.address') }}:</span> {{ shippingAddressInfo.address_line_1 }}, {{ shippingAddressInfo.city }}, {{ shippingAddressInfo.state }}, {{ shippingAddressInfo.postal_code }}, {{ shippingAddressInfo.country }}</p>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.shipping_reference') }}:</span> {{ shippingAddressInfo.reference }}</p>
      <!-- Add more shipping details as needed -->
    </div>

    <!-- Credit Card Details 
    <div class="mb-6">
      <h3 class="text-md font-semibold mb-2">{{ $t('shopping.payment_details') }}:</h3>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.credit_card') }}:</span> {{ maskCreditCard }}</p>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.credit_card_holder_name') }}:</span> {{ orderDetails.cardholder_name }}</p>
    </div>-->
     <UButton
        icon="i-fa6-solid-pen-to-square"
        size="md"
        color="primary"
        variant="outline"
        @click="editOrderInfo"
        :label="$t('shopping.edit_info_btn')"
      />
  </div>
</template>
<script setup>
const shopping = shoppingStore();
const orderDetails = computed(() => shopping.orderDetails);

const shippingAddressInfo = computed(() => shopping.shippingAddressInfo);

/* const maskCreditCard = computed(() => {
  // Remove any existing spaces and non-digit characters
  const cardNumber = shopping.orderDetails.card_number.replace(/\D/g, '');
  // Divide the number into groups of four digits
  let groups = cardNumber.match(/.{1,4}/g);
  // Leave the last group unmasked
  let lastGroup = groups.pop();
  // Mask all groups except the last one
  let maskedGroups = groups.map(group => '*'.repeat(4)).join(' ');
  // Concatenate the masked groups with the last group
  let maskedCardNumber = maskedGroups + ' ' + '*' + lastGroup.slice(-3);

  return maskedCardNumber;
});*/


const editOrderInfo = () => {
  shopping.shoppingMovetStep(1);
}
</script>