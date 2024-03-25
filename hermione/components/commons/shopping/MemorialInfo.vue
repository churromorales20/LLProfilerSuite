<template>
  <div :class="[shopping.inAdmin ? '' : 'mt-6']">
    <form class="space-y-4" action="#" method="POST">
      <h2 class="lg:text-lg font-semibold pb-3 border-b border-gray-300">{{ $t('shopping.memorial_info') }}</h2>
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">
          {{ $t('shopping.customer_name') }}
        </label>
        <div class="mt-1">
          <UInput id="_memorial_input_name_" size="md" color="primary" @blur="() => {
              if (!isEmptyString(memorialInfo.first_name!)) {
                tour.nextStep();
              }
              shopping.validate()
            }" v-model="memorialInfo.first_name" icon="i-mdi-account-heart"
            :placeholder="$t('shopping.memorial_first_name')" />
        </div>
      </div>
      <div>
        <label for="country" class="block text-sm font-medium text-gray-700">
          {{ $t('shopping.customer_last_name') }}
        </label>
        <div class="mt-1">
          <UInput id="_memorial_input_lastname_" size="md" color="primary" @blur="() => {
              if (!isEmptyString(memorialInfo.last_name!)) {
                tour.nextStep();
              }
              shopping.validate()
            }" v-model="memorialInfo.last_name" icon="i-mdi-account-heart"
            :placeholder="$t('shopping.memorial_last_name')" />
        </div>
      </div>
    </form>
    <VTour 
      v-if="shopping.mustShowTour" 
      :steps="steps" 
      saveToLocalStorage="custom" 
      ref="tour" 
      autoStart 
      highlight
    >
      <template #content="{ step }">
        <h4 class="text-lg font-semibold mb-2">Paso {{ step.currentStep + 1 }}</h4>
        <div class="px-2">
          {{ step.getCurrentStep.content }}
        </div>
      </template>
      <template #actions="{ nextStep, prevStep, endTour, step }">
        <div class="mt-4">
          <UButton icon="i-mdi-arrow-left-bold-box-outline" v-if="step.currentStep > 0" color="white" class="mr-2"
            variant="outline" @click.prevent="prevStep" label="Atras" />
          <UButton icon="i-mdi-arrow-right-bold-box-outline" color="white" variant="outline" @click.prevent="nextStep"
            label="Siguiente" v-if="step.currentStep < 3" />
        </div>
      </template>
    </VTour>
  </div>
</template>

<script setup lang="ts">
import '@globalhive/vuejs-tour/dist/style.css';

const tour = ref(null);
const steps = [
  {
    target: '#_memorial_input_name_',
    content: 'Ingrese el nombre de su ser querido.',
    placement: 'bottom',
    onShow: () => {
      document.getElementById('_memorial_input_name_')?.focus()
    }
  },
  {
    target: '#_memorial_input_lastname_',
    content: 'Ahora, ingrese el apellido.',
    placement: 'bottom',
    onShow: () => {
      document.getElementById('_memorial_input_lastname_')?.focus()
    }
  },
  {
    target: '#_shopping_check_terms_conditions_',
    content: 'Por favor, acepte y lea nuestros términos y condiciones.',
  },
  {
    target: '#_shopping_confirm_btn_',
    content: 'Una vez completados todos los campos, puede continuar con la orden.',
  }
];
const shopping = shoppingStore();
const memorialInfo = computed(() => shopping.memorialInfo);
onMounted(() => {
  document.getElementById('_memorial_input_name_')?.focus()
});
</script>

<style>
#vjt-tooltip{
  background-color: #001685;
  font-size: 1rem;
  border: 1px solid #01126b;
  box-shadow: 3px 3px 9px #00000063;
  padding: 0.5rem 1rem;
}
#vjt-arrow::before{
  background-color: #001685 !important;
}
.vjt-actions button:hover{
  background-color: #d9c667;
  color: #001685;
  border-color: #b8a855;
}
.vjt-highlight{
  outline: 1px solid #b8a855;
}
</style>
