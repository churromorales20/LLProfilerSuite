<template>
  <h2 class="lg:text-lg font-semibold mt-6 pb-3 border-b border-gray-300">{{ $t('shopping.payment_info') }}</h2>
  <CommonsCreditCard @card-updated="updateCard" />
  <img src="/credit_cards.png" />
</template>

<script setup>
const shopping = shoppingStore();
const updateCard = (cardInfo) => {
  shopping.updateCardInfo(cardInfo);
  if (shopping.validateCreditCard()) {
    shopping.validate(true)
  } else {
    shopping.setInvalid();
  }
}
</script>