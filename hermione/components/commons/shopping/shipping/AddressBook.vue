<template>
  <div class="space-y-4">
    <div 
      v-for="address in addressList" 
      class="border border-gray-300 rounded flex p-4 items-center"
    >
      <URadio
        @change="shopping.validate"
        v-model="selectedAddress"
        :ui="{
          wrapper: 'relative flex items-center',
        }"
        :value="address.value"
      >
        <template #label>
          <p class="text-md font-semibold">{{ address.address_line_1 }} - <i>{{ address.postal_code }}</i></p>
          <p class="text-md">{{ address.city }}, {{ address.state }} - {{ address.country }}</p>
        </template>
      </URadio>
    </div>
    <UButton 
      icon="i-mdi-home-plus" 
      size="md" 
      class="mt-4"
      @click="goToForm" 
      variant="outline" 
      :label="$t('shopping.new_address_btn')" 
    />
  </div>
</template>

<script setup lang="ts">

const goToForm = () => {
  shopping.shippingMovetStep(2);
}

const shopping = shoppingStore();
const addressList = computed(() => {
  
  return shopping.addressList.map((address) => {
    return {
      ...address,
      value: address.id
    }
  });
})

//const selectedAddress = ref(0);
const selectedAddress = computed({
  get(){
    return shopping.shippingSelectedAddress;
  },
  set(newValue){
    console.log(newValue);
    shopping.seletedAddress(newValue);
  }
})
</script>
