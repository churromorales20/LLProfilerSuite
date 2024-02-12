<template>
  <form class="space-y-6" action="#" method="POST">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        {{ $t('login.email') }}
      </label>
      <div class="mt-1">
        <UInput color="primary" v-model="userEmail" icon="i-fa6-solid-envelope" size="md" type="email" />
        <p v-if="emailErrored" class="absolute font-medium text-sm text-red-500 mt-1">{{ emailErrored }}</p>
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
              :icon="`i-fa6-solid-eye${viewPassword ? '-slash' : ''}`"
            />
          </template>
        </UInput>
        <p v-if="passwordErrored" class="absolute font-medium text-sm text-red-500 mt-1">{{ passwordErrored }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="text-sm">
        <a href="#" class="ll-text-bold text-llyellow-700 hover:text-llyellow-600">
          {{ $t('login.forgot_pass') }}
        </a>
      </div>
    </div>
    <div>
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
      <p class="font-medium text-sm text-red-500 mt-1">{{ errorMessage }}</p>
    </div>
    <div>
      <p class="text-sm">{{ $t('login.terms_conditions') }}</p>
    </div>
    <div>
      <p class="text-center text-sm text-gray-600">
        {{ $t('login.or_sign_in') }}
      </p>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <LoginFacebookButton />
      <LoginGoogleButton />
    </div>

    <div>
      <p class="text-center text-sm text-gray-600">
        {{ $t('login.dont_have_account') }}
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          {{ $t('login.sign_up') }}
        </a>
      </p>
    </div>
  </form>
</template>
<script setup>
  import { computed } from 'vue';
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

  const Miverga = () => {
    console.log('COND');
  }

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
        navigateTo('/dashboard')
      }
    }
  }
</script>