<template>
  <transition name="fade" @after-leave="checkStep = nextStep">
    <CommonsShoppingMain v-if="checkStep == 2" />
  </transition>
  <transition name="fade" @after-leave="checkStep = nextStep">
    <div :class="[inAdmin ? 'h-60vh' : 'h-full']" class="flex items-center justify-center" v-if="checkStep == 1">
      <UIcon name="i-fa6-solid-circle-notch" class="text-llblue-600 animate-spin text-6xl" />
    </div>
  </transition>
</template>
<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  inAdmin: {
    type: Boolean,
    required: false,
    default: false
  },
});

const { inAdmin } =  props;

const shopping = shoppingStore();
const checkStep = ref(1);
const nextStep = ref(0);

if (process.client) {
  onMounted(async () => {
    shopping.setInAdmin(inAdmin)
    await shopping.getOrCreateCart();
    
    if (inAdmin) {
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
.h-60vh {
  height: 60vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>