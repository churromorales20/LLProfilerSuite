<template>
  <transition name="fade" @after-leave="checkStep = nextStep">
    <div v-if="checkStep == 2" class="flex flex-col md:flex-row h-full">
      <!-- Main column -->
      <div class="md:w-3/5 h-4/6 p-4 overflow-y-auto" style="max-height: 80vh;">
        
        <CommonsShoppingUser v-if="!inModal" />

        <CommonsShoppingMemorialInfo />

        <CommonsShoppingShipping />

        <!-- Payment method selector and card form -->
        <CommonsShoppingPaymentMethod />
      </div>

      <!-- Order details column -->
      <div class="md:w-2/5 p-4">
        <CommonsShoppingSummary />
      </div>
    </div>
  </transition>
  <transition name="fade" @after-leave="checkStep = nextStep">
    <div :class="[inModal ? 'min-h-80' : 'h-full']" class="flex items-center justify-center" v-if="checkStep == 1">
      <UIcon name="i-fa6-solid-circle-notch" class="text-llblue-600 animate-spin text-6xl" />
    </div>
  </transition>
</template>
<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  inModal: {
    type: Boolean,
    required: false,
    default: false
  },
});

const { inModal } =  props;

const shopping = shoppingStore();
const checkStep = ref(1);
const nextStep = ref(0);

if (process.client) {
  onMounted(async () => {
    shopping.setInModal(inModal)
    await shopping.getOrCreateCart();
    
    if (inModal) {
      shopping.checkAuthuser()
    }
    moveCheckState(2);
  });
}

const moveCheckState = (index) => {
  nextStep.value = index
  checkStep.value = 0

}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>