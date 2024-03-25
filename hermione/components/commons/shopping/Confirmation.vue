<template>
  <div class="max-w-lg bg-white">
    <h2 class="text-lg font-semibold mb-4 pb-3 border-b border-gray-300">Confirm Order Details</h2>
    <!-- Customer Details -->
    <div class="mb-6">
      <h3 class="text-md font-semibold mb-2" id="_order_confirm_details_title_">{{ $t('shopping.customer_details') }}:
      </h3>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.customer_name') }}:</span> {{
        orderDetails.first_name }} {{ orderDetails.last_name }}</p>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.customer_email') }}:</span> {{ orderDetails.email
        }}</p>
      <!-- Add more customer details as needed -->
    </div>

    <div class="mb-6">
      <h3 class="text-md font-semibold mb-2">{{ $t('shopping.memorial_plaque') }}:</h3>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.customer_name') }}:</span> {{
        orderDetails.memorial_first_name }}</p>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.customer_last_name') }}:</span> {{
        orderDetails.memorial_last_name }}</p>
      <!-- Add more shipping details as needed -->
    </div>

    <div class="mb-6" v-if="!shopping.isSimpleMemorial">
      <h3 class="text-md font-semibold mb-2">{{ $t('shopping.shipping_details') }}:</h3>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.address') }}:</span> {{
        shippingAddressInfo.address_line_1 }}, {{ shippingAddressInfo.city }}, {{ shippingAddressInfo.state }}, {{
        shippingAddressInfo.postal_code }}, {{ shippingAddressInfo.country }}</p>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.shipping_reference') }}:</span> {{
        shippingAddressInfo.reference }}</p>
      <!-- Add more shipping details as needed -->
    </div>

    <!-- Credit Card Details 
    <div class="mb-6">
      <h3 class="text-md font-semibold mb-2">{{ $t('shopping.payment_details') }}:</h3>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.credit_card') }}:</span> {{ maskCreditCard }}</p>
      <p class="text-sm"><span class="font-semibold">{{ $t('shopping.credit_card_holder_name') }}:</span> {{ orderDetails.cardholder_name }}</p>
    </div>-->
    <UButton icon="i-fa6-solid-pen-to-square" id="_edit_order_details_btn_" size="md" color="primary" variant="outline"
      @click="editOrderInfo" :label="$t('shopping.edit_info_btn')" />
    <VTour v-if="shopping.mustShowTour" :steps="steps" saveToLocalStorage="custom" autoStart highlight>
      <template #content="{ step }">
        <h4 class="text-lg font-semibold mb-2">Paso {{ step.currentStep + 5 }}</h4>
        <div class="px-2">
          {{ step.getCurrentStep.content }}
        </div>
      </template>
      <template #actions="{ nextStep, prevStep, endTour, step }">
        <div class="mt-4">
          <UButton icon="i-mdi-arrow-left-bold-box-outline" v-if="step.currentStep > 0" color="white" class="mr-2"
            variant="outline" @click.prevent="prevStep" label="Atras" />
          <UButton :icon="`i-mdi-${step.currentStep > 1 ? 'check-circle-outline' : 'arrow-right-bold-box-outline'}`"
            color="white" variant="outline" @click.prevent="nextStep"
            :label="step.currentStep > 1 ? 'Finalizar' : 'Siguiente'" />
        </div>
      </template>
    </VTour>
  </div>
</template>
<script setup>
import '@globalhive/vuejs-tour/dist/style.css';

const steps = [
  {
    target: '#_order_confirm_details_title_',
    content: 'Verifica que los datos sean correctos.',
    placement: 'bottom'
  },
  {
    target: '#_edit_order_details_btn_',
    content: 'Si es necesario, puedes editar la información antes de finalizar.',
    placement: 'right',
  },
  {
    target: '#_shopping_confirm_btn_',
    content: '¡Listo para crear el nuevo memorial!',
  }
];
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