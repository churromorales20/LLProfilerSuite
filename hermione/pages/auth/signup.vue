<template>
  <transition name="fade" @after-leave="currentlyShowing = 'DONE'">
    <form class="space-y-6" v-if="currentlyShowing == 'FORM'" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          {{ $t('login.first_name') }}
        </label>
        <div class="mt-1">
          <UInput 
            color="primary" 
            v-model="firstName" 
            icon="i-fa6-solid-user" 
            size="md"
            :placeholder="$t('login.first_name_placeholder')"
          />
          <p v-if="firstNameErrored" class="absolute font-medium text-sm text-red-500 mt-1">{{ firstNameErrored }}</p>
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          {{ $t('login.last_name') }}
        </label>
        <div class="mt-1">
          <UInput 
            color="primary" 
            v-model="lastName" 
            icon="i-fa6-solid-user" 
            size="md" 
            :placeholder="$t('login.last_name_placeholder')"
          />
          <p v-if="lastNameErrored" class="absolute font-medium text-sm text-red-500 mt-1">{{ lastNameErrored }}</p>
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          {{ $t('login.email') }}
        </label>
        <div class="mt-1">
          <UInput 
            color="primary"
            :loading="checkingEmail" 
            :disabled="checkingEmail" 
            @blur="checkEmail"
            v-model="userEmail" 
            icon="i-fa6-solid-envelope" 
            size="md" 
            type="email" 
            :placeholder="$t('login.email')"
          />
          <p v-if="emailErrored" class="absolute font-medium text-sm text-red-500 mt-1">{{ emailErrored }}</p>
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          {{ $t('login.pass') }}
        </label>
        <div class="mt-1">
          <UInput 
            color="primary" 
            :ui="{ icon: { trailing: { pointer: '' } } }" 
            v-model="userPassword"
            icon="i-fa6-solid-lock" 
            size="md"
            :type="viewPassword ? 'text' : 'password'"
            :placeholder="$t('login.pass_placeholder')"
          >
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
          <p v-if="passwordErrored" class="absolute font-medium text-sm text-red-500 mt-1">{{ passwordErrored }}</p>
        </div>
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          {{ $t('login.confirm_pass') }}
        </label>
        <div class="mt-1">
          <UInput 
            color="primary" 
            icon="i-fa6-solid-lock"
            type="password"
            :ui="{ icon: { trailing: { pointer: '' } } }" 
            v-model="userPasswordConfirm" 
            :placeholder="$t('login.pass_confirm_placeholder')"
          />
        </div>
      </div>
      <div>
        <UButton 
          @click="validateAndSignup" 
          :loading="sendingRequest" 
          size="md" 
          color="primary" 
          variant="solid" 
          block
        >
          {{ $t('login.sign_up') }}
        </UButton>
      </div>
      <div v-if="userStore.signUpIsErrored">
        <p class="font-medium text-sm text-red-500 mt-1">{{ errorMessage }}</p>
      </div>
      <div>
        <p class="text-center text-sm text-gray-600">
          {{ $t('login.sign_up_with') }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <LoginFacebookButton />
        <LoginGoogleButton />
      </div>

      <div>
        <p class="text-center text-sm text-gray-600">
          {{ $t('login.already_account') }}
          <ULink
            to="/auth/login"
            active-class="font-medium text-indigo-600 hover:text-indigo-500"
            inactive-class="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {{ $t('login.back_to_login') }}
          </ULink>
        </p>
      </div>
    </form>
  </transition>
  <transition name="fade" @after-leave="currentlyShowing = 'DONE'">
    <div class="flex flex-col items-center justify-center h-40" v-if="currentlyShowing == 'DONE'">
      <UIcon name="i-fa6-solid-circle-check text-green-600" class="confirm-data-icon mb-4" />
      <h4 class="text-xl mb-4">Registro existoso.</h4>
      <ULink
        to="/auth/login"
        active-class="font-medium text-indigo-600 hover:text-indigo-500"
        inactive-class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        {{ $t('login.back_to_login') }}
      </ULink>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { computed } from 'vue';
definePageMeta({
  layout: 'auth-views'
})
const userStore = userAdminStore()
const locale = useI18n()
const lastName = ref('')
const firstName = ref('')
const userEmail = ref('')
const userPassword = ref('')
const userPasswordConfirm = ref('')
const emailErrored = ref('');
const firstNameErrored = ref('');
const lastNameErrored = ref('');
const passwordErrored = ref('');
const currentlyShowing = ref('FORM');
const viewPassword = ref(false);
const checkingEmail = ref(false);
const sendingRequest = ref(false);

const checkEmail = async () => {
  if (isValidEmail(userEmail.value)) {
    emailErrored.value = '';
    checkingEmail.value = true;
    const result = await userStore.checkEmailAvailability(userEmail.value);
    checkingEmail.value = false;

    if (!result) {
      userEmail.value = '';
      emailErrored.value = locale.t('login.email_not_available');
    }
  }  
}

const errorMessage = computed(() => {

  switch (userStore.lastSingUpError) {
    case 401:
      return locale.t('login.invalid_credentials');
    default:
      return locale.t('general.unexpected_error');
  }
});

const isValidEmail = (emailValue: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

const validateForm = (): boolean => {
  const passwordRegex = /^[^\s]{6,14}$/;
  let isValid = true;

  emailErrored.value = '';
  passwordErrored.value = '';

  if (firstName.value === '') {
    firstNameErrored.value = locale.t('login.first_name_error')
    isValid = false;
  }

  if (lastName.value === '') {
    lastNameErrored.value = locale.t('login.last_name_error')
    isValid = false;
  }

  if (!isValidEmail(userEmail.value)) {
    emailErrored.value = locale.t('login.invalid_email')
    isValid = false;
  }

  if (!passwordRegex.test(userPassword.value) || userPassword.value === '') {
    passwordErrored.value = locale.t('login.invalid_pass')
    isValid = false;
  } else if (userPassword.value !== userPasswordConfirm.value) {
    passwordErrored.value = locale.t('login.pass_not_match')
    isValid = false;
  }

  return isValid;
}

const validateAndSignup = async () => {
  if (validateForm()) {
    sendingRequest.value = true;
    const loginResult = await userStore.signup({
      email: userEmail.value, 
      password: userPassword.value,
      first_name: lastName.value,
      last_name: firstName.value,
    });

    sendingRequest.value = false;

    if (loginResult) {
      currentlyShowing.value = ''
    }
  }
}
</script>
<style scoped>
.confirm-data-icon {
  font-size: 5rem
}
</style>