<template>
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">
      {{ $t('login.email') }}
    </label>
    <div class="mt-1">
      <UInput color="primary" v-model="userEmail" icon="i-fa6-solid-envelope" size="md" type="email" />
      <p v-if="emailErrored" class="absolute font-medium text-sm text-red-500" :class="[!isShopping ? 'mt-1' : 'mt-0']">{{ emailErrored }}</p>
    </div>
  </div>

  <div>
    <label for="password" class="block text-sm font-medium text-gray-700">
      {{ $t('login.pass') }}
    </label>
    <div class="mt-1">
      <UInput color="primary" :ui="{ icon: { trailing: { pointer: '' } } }" v-model="userPassword" icon="i-fa6-solid-lock" size="md" :type="viewPassword ? 'text' : 'password'" >
        <template #trailing>
          <UButton
            @click="() => {
              viewPassword = !viewPassword
            }"
            :padded="false"
            color="gray"
            variant="link"
            :icon="viewPassword ? 'i-fa6-solid-eye-slash' : 'i-fa6-solid-eye'"
          />
        </template>
      </UInput>
      <p v-if="passwordErrored" class="absolute font-medium text-sm text-red-500" :class="[!isShopping ? 'mt-1' : 'mt-0']">{{ passwordErrored }}</p>
    </div>
  </div>

  <div v-if="!isShopping" class="flex items-center justify-between">
    <div class="text-sm">
      <a href="#" class="ll-text-bold text-llyellow-700 hover:text-llyellow-600">
        {{ $t('login.forgot_pass') }}
      </a>
    </div>
  </div>
  <div :class="[!isShopping ? '' : 'py-2']">
    <UButton 
      @click="validateAndSignIn" 
      :loading="userStore.isWorking"
      size="md" 
      color="primary" 
      variant="solid" 
      block>
      {{ $t('login.sign_in') }}
    </UButton>
  </div>
  <div v-if="userStore.isErrored">
    <p class="font-medium text-sm text-red-500" :class="[!isShopping ? 'mt-1' : 'mt-0']">{{ errorMessage }}</p>
  </div>
  <div v-if="!isShopping">
    <p class="text-sm">{{ $t('login.terms_conditions') }}</p>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { defineEmits } from 'vue';

const emits = defineEmits(['user-logged']);

const props = defineProps({
  isShopping: {
    type: Boolean,
    required: false,
    default: false
  }
});

const { isShopping } = props;

definePageMeta({
  layout: 'auth-views'
})
const userStore = userAdminStore()
const locale = useI18n()
const userEmail = defineModel('userEmail')
const userPassword = defineModel('userPassword')
const emailErrored = defineModel('emailErrored');
const passwordErrored = defineModel('passwordErrored');
const viewPassword = defineModel('viewPassword');

emailErrored.value = null;
passwordErrored.value = null;
viewPassword.value = false;

const errorMessage = computed(() => {

  switch (userStore.lastError) {
    case 401:
      return locale.t('login.invalid_credentials');
    default:
      return locale.t('general.unexpected_error');
  }
});

const validateAndSignIn = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[^\s]{6,14}$/;
  let isValid = true;

  emailErrored.value = null;
  passwordErrored.value = null;

  if (!emailRegex.test(userEmail.value)) {
    emailErrored.value = locale.t('login.invalid_email')
    isValid = false;
  }

  if (!passwordRegex.test(userPassword.value) || userPassword.value === undefined) {
    passwordErrored.value = locale.t('login.invalid_pass')
    isValid = false;
  }

  if (isValid) {
    const loginResult = await userStore.login(userEmail.value, userPassword.value);
    
    if (loginResult) {
      emits('user-logged', {});
      if (!isShopping) {
        navigateTo('/dashboard')
      }
      
    }
  }
}
</script>