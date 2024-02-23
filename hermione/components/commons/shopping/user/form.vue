<template>
  <form class="space-y-4" action="#" method="POST">
    <h2 class="text-lg font-semibold pb-3 border-b border-gray-300">Personal Information</h2>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        {{ $t('login.first_name') }}
      </label>
      <div class="mt-1">
        <UInput 
          size="md" 
          color="primary" 
          v-model="userInfo.first_name" 
          @blur="shopping.validate()"
          icon="i-fa6-solid-user"
          :placeholder="$t('login.first_name_placeholder')" 
        />
        <p v-if="firstNameErrored" class="font-medium text-sm text-red-500 mt-0">{{ firstNameErrored }}</p>
      </div>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        {{ $t('login.last_name') }}
      </label>
      <div class="mt-1">
        <UInput 
          size="md" 
          color="primary" 
          v-model="userInfo.last_name" 
          @blur="shopping.validate()"
          icon="i-fa6-solid-user"
          :placeholder="$t('login.last_name_placeholder')" 
        />
        <p v-if="lastNameErrored" class="font-medium text-sm text-red-500 mt-0">{{ lastNameErrored }}</p>
      </div>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        {{ $t('login.email') }}
      </label>
      <div class="mt-1">
        <UInput 
          size="md" 
          color="primary" 
          :loading="checkingEmail" 
          :disabled="checkingEmail" 
          @blur="checkEmail"
          v-model="userInfo.email" 
          icon="i-fa6-solid-envelope" 
          type="email" 
          :placeholder="$t('login.email')" 
        />
        <p v-if="emailErrored" class="font-medium text-sm text-red-500 mt-0">{{ emailErrored }}</p>
      </div>
    </div>
    <div v-if="userStore.signUpIsErrored">
      <p class="font-medium text-sm text-red-500 mt-0">{{ errorMessage }}</p>
    </div>
    <div class="pt-0">
      <UAlert
        color="primary"
        variant="outline"
        :ui="{
          padding: 'p-2',
          inner: 'w-0 flex-1 webomio',
        }"
      >
        <template #description>
          This information will be utilized for user identification purposes on our platform.
          <UTooltip 
            :ui="{
              base: 'h-6 p-4 text-md w-96 h-fit text-wrap font-bold relative',
              width: 'w-fit',
            }"
            :popper="{ placement: 'right' }"
          >
            <span class="cursor-pointer underline">Why?</span>
            <UIcon name="i-fa6-solid-circle-question" class="cursor-pointer ml-1 mt-0.5"/>
            <template #text>
              <span>Please note, identification is required to access and edit your memorials. Once registration steps are completed, we'll send all account details, including your password, to the email address provided.</span>
            </template>
          </UTooltip>
        </template>
      </UAlert>
    </div>
  </form>
</template>
<script setup>
import { computed } from 'vue';
definePageMeta({
  layout: 'auth-views'
})
const userStore = userAdminStore()
const shopping = shoppingStore();
const locale = useI18n()
const emailErrored = ref('');
const firstNameErrored = ref('');
const lastNameErrored = ref('');
const checkingEmail = ref(false);

const userInfo = computed(() => shopping.userInfo);

const checkEmail = async () => {
  if (isValidEmail(shopping.userInfo.email)) {
    emailErrored.value = '';
    checkingEmail.value = true;
    const result = await userStore.checkEmailAvailability(shopping.userInfo.email);
    checkingEmail.value = false;

    if (!result) {
      shopping.emptyUserEmail();
      emailErrored.value = locale.t('login.email_not_available');
    } 
    shopping.validate()
  }
}

</script>
<style scoped>
.confirm-data-icon {
  font-size: 5rem
}
</style>