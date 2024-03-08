<template>
  <transition name="fade" @after-leave="showCompleted = true">
    <div class="space-y-6" v-if="!isRecovered">
      <h5 class="font-semibold text-md text-llblue-600 text-center mb-8">Recover credentials</h5>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">
          {{ $t('login.pass') }}
        </label>
        <div class="mt-1">
          <UInput 
            color="primary" 
            :ui="{
              icon: {
                trailing: {
                  pointer: ''
                }
              }
            }" 
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
            :ui="{
              icon: {
                trailing: {
                  pointer: ''
                }
              }
            }" 
            size="md"
            v-model="userPasswordConfirm" 
            :placeholder="$t('login.pass_confirm_placeholder')"
          />
        </div>
      </div>
      <div>
        <UButton 
          @click="validateAndSend" 
          :loading="sendingRequest" 
          size="md" 
          color="primary" 
          variant="solid" 
          block
          :label="$t('login.reset_password')"
        />
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div class="flex flex-col items-center" v-if="showCompleted">
      <UIcon class="text-green-600 text-6xl" name="i-fa6-solid-circle-check" />
      <p class="font-bold text-2xl text-center my-6">{{ $t('login.pass_successfull_reset_title') }}</p>
      <p>{{ $t('login.pass_successfull_reset') }}</p>
      <UButton 
        @click="() => {
          navigateTo('/auth/login')
        }" 
        size="md" 
        class="mt-4" 
        color="primary" 
        variant="solid" block
        :label="$t('login.back_to_login') "
      />
    </div>
  </transition>
</template>
<script setup>
definePageMeta({
  layout: 'auth-views'
})

const toast = useToast()
const userPassword = ref('')
const userPasswordConfirm = ref('')
const passwordErrored = ref('');
const viewPassword = ref(false);
const isRecovered = ref(false);
const sendingRequest = ref(false);
const showCompleted = ref(false);
const route = useRoute()
const code = ref(route.query.code);
const userStore = userAdminStore()
const locale = useI18n()

const validateForm = () => {
  const passwordRegex = /^[^\s]{6,14}$/;
  let isValid = true;

  if (!passwordRegex.test(userPassword.value) || userPassword.value === '') {
    passwordErrored.value = locale.t('login.invalid_pass')
    isValid = false;
  } else if (userPassword.value !== userPasswordConfirm.value) {
    passwordErrored.value = locale.t('login.pass_not_match')
    isValid = false;
  }

  return isValid;
}

const validateAndSend = async () => {
  if (validateForm()) {
    sendingRequest.value = true;
    const loginResult = await userStore.confirmRecover(code.value, userPassword.value);

    sendingRequest.value = false;

    if (loginResult) {
      toast.add({ title: 'Crendentials recovered successfully!' })
      isRecovered.value = true;
    }
  }
}

if (!process.client) {
  const { error } = await useAsyncData(
    'confirm_recover_code',
    async () => {
      const response = await userStore.checkRecoverCode(code.value)
      if (!response) {
        throw new Error('Hubo un error al obtener los datos');
      }
    }
  )
  if (error.value) {
    navigateTo('/404')
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>