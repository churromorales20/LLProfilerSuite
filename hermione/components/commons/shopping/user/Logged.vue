<template>
  <div class="bg-white rounded-md shadow-md">
    <div class="mb-2 pb-3 border-b border-gray-300 flex justify-between">
      <h2 class="text-lg font-semibold">{{ $t('general.identified_as') }}</h2>
      <UButton 
        color="primary" 
        size="xs" 
        variant="link"
        @click="changeUser"
      >{{ $t('general.change_user') }}</UButton>
    </div>
    <div class="p-2">
      <div class="flex items-center mb-4">
        <UAvatar :alt="shopping.userWholeName" size="xl" />
        <div class="ml-2">
          <h4 class="text-sm">
            {{ shopping.userWholeName }}
          </h4>
          <h4 class="text-sm">
            {{ shopping.userEmail }}
          </h4>
        </div>
      </div>
      <p class="mb-4 text-sm">{{ $t('general.user_welcome_line_1') }}</p>
      <p class="text-sm">{{ $t('general.user_welcome_line_2') }},</p>
      <p class="text-sm font-semibold">Legacy Link Staff</p>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['user-changed']);
const shopping = shoppingStore();
const changeUser = () => {
  shopping.changeUser();
  emits('user-changed', {});
}
</script>
