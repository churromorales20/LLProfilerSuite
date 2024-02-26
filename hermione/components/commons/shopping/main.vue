<template>
  <div>
    <transition name="fade" @after-leave="moveShoppingStep">
      <div class="container p-2" v-if="localCompleted">
        <div class="rounded-lg p-4">
          <div class="flex flex-col items-center mb-8">
            <UIcon name="i-fa6-solid-circle-check" class="text-green-500 text-6xl mb-4" />
            <h2 class="text-xl font-semibold mb-2">{{ $t('shopping.purchase_successful') }}</h2>
          </div>
          <div class="space-y-4">
            <p>{{ $t('shopping.purchase_successful_line_1') }}</p>
            <p>{{ $t('shopping.purchase_successful_line_2') }}</p>
            <p>{{ $t('shopping.purchase_successful_line_3') }}</p>
            <UButton
              icon="i-mdi-qrcode"
              size="md"
              variant="outline"
              color="primary"
              square
              label="Go to my memorials"
              @click="() => {
                shopping.setModalStatus(false)
              }"
            />
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade" @after-leave="moveCompleted">
      <div class="flex flex-col md:flex-row h-full" v-if="!shopping.completed">
        <div class="md:w-3/5 h-4/6 p-4 overflow-y-auto" style="max-height: 80vh;">
          <transition name="fade" @after-leave="moveShoppingStep">
            <div v-if="shopping.viewStep == 1">
              <CommonsShoppingUser v-if="!inAdmin" />

              <CommonsShoppingMemorialInfo />

              <CommonsShoppingShipping />

              <!-- Payment method selector and card form -->
              <CommonsShoppingPaymentMethod />
            </div>
          </transition>
          <transition name="fade" @after-leave="moveShoppingStep">
            <CommonsShoppingConfirmation v-if="shopping.viewStep == 2" />
          </transition>
          <transition name="fade" @after-leave="moveShoppingStep">
            <div class="flex items-center justify-center h-60vh" v-if="shopping.viewStep == 3">
              <div class="text-center">
                <UIcon name="i-fa6-solid-circle-notch" class="text-llblue-600 animate-spin text-6xl" />
                <h3 class="mt-4 text-lg font-semibold text-llblue-600">{{ $t('shopping.placing_order') }}</h3>
              </div>
            </div>
          </transition>
        </div>
        <!-- Order details column -->
        <div class="md:w-2/5 p-4">
          <CommonsShoppingSummary />
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>

const moveShoppingStep = () => {

  shopping.shoppingMoveNextStep();
}
const moveCompleted = () => {

  localCompleted.value = true;
}

const localCompleted = ref(false)
const shopping = shoppingStore();
const inAdmin = computed(() => shopping.inAdmin)
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