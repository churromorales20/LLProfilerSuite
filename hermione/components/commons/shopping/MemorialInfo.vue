<template>
  <div :class="[shopping.inAdmin ? '' : 'mt-6']">
    <form class="space-y-4" action="#" method="POST">
      <h2 class="text-lg font-semibold pb-3 border-b border-gray-300">{{ $t('shopping.memorial_info') }}</h2>
      <div>
        <label for="address" class="block text-sm font-medium text-gray-700">
          {{ $t('shopping.customer_name') }}
        </label>
        <div class="mt-1">
          <UInput 
            size="md" 
            color="primary" 
            @blur="shopping.validate()"
            v-model="memorialInfo.first_name" 
            icon="i-mdi-account-heart"
            :placeholder="$t('shopping.memorial_first_name')" 
          />
        </div>
      </div>
      <div>
        <label for="country" class="block text-sm font-medium text-gray-700">
          {{ $t('shopping.customer_last_name') }}
        </label>
        <div class="mt-1">
          <UInput 
            size="md" 
            color="primary" 
            @blur="shopping.validate()"
            v-model="memorialInfo.last_name" 
            icon="i-mdi-account-heart"
            :placeholder="$t('shopping.memorial_last_name')" 
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const shopping = shoppingStore();
const memorialInfo = computed(() => shopping.memorialInfo);
</script>

<style scoped>
/* Custom styles if needed */
</style>
