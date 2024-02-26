<template>
  <form class="space-y-4" action="#" method="POST">
    <h2 class="text-lg font-semibold pb-3 border-b border-gray-300">{{ $t('general.login_your_account') }}</h2>
    <CommonsAuthLoginForm @user-logged="emits('user-logged', {})" :isShopping="true"/>
  </form>
</template>
<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['user-logged']);
</script>