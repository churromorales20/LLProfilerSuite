<template>
  <transition name="fade" @after-leave="showCompleted = true">
    <div v-if="!emailSent">
      <h5 class="font-semibold text-md text-llblue-600 text-center mb-8">Recover credentials</h5>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">
          {{ $t('login.email') }}
        </label>
        <div class="mt-1">
          <UInput 
            color="primary" 
            v-model="userEmail" 
            icon="i-fa6-solid-envelope" 
            size="md" 
            type="email" 
            :placeholder="$t('login.enter_email_address')"
          />
          <p v-if="emailErrored" class="absolute font-medium text-sm text-red-500" :class="[!isShopping ? 'mt-1' : 'mt-0']">{{ emailErrored }}</p>
        </div>
        <div class="mt-6">
          <UButton 
            @click="sendRecoverMail" 
            size="md" 
            color="primary" 
            :loading="sending"
            variant="solid" 
            block>
            Send recovery link
          </UButton>
        </div>
        <div class="mt-6 text-right">
          <ULink
            to="/auth/login"
            active-class="hover:text-llyellow-600"
            inactive-class="ll-text-bold text-llyellow-700"
          >
            Back to login
          </ULink>
        </div>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div class="flex flex-col items-center" v-if="showCompleted">
      <UIcon class="text-green-600 text-6xl" name="i-fa6-solid-circle-check" />
      <div class="my-8">
        <p class="font-bold">Password Recovery Link Sent!</p>
        <p class="text-sm">If the email is registered in our system, we will send a link to recover your credentials. Please check your spam folder.</p>
      </div>
      <UButton 
        @click="backToLogin" 
        size="md" 
        class="mt-4" 
        color="primary" 
        variant="solid" block>
        {{ $t('login.back_to_login') }}
      </UButton>
    </div>
  </transition>
</template>
<script setup>
definePageMeta({
  layout: 'auth-views'
})

const toast = useToast()
const userStore = userAdminStore()
const userEmail = ref('');
const sending = ref(false);
const emailErrored = ref(null);
const emailSent = ref(false);
const showCompleted = ref(false);
const locale = useI18n()

const backToLogin = () => {
  navigateTo('/auth/login')
}

const sendRecoverMail = async () => {
  if (!isValidEmail(userEmail.value)) {
    emailErrored.value = locale.t('login.invalid_email')
    return;
  }

  sending.value = true;
  await userStore.sendRecoverMail(userEmail.value);
  toast.add({ title: 'Password Recovery Link Sent!' })
  emailSent.value = true;
  sending.value = false;
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