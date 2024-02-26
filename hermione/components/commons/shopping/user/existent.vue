<template>
  <div class="mt-4">
    <UDivider class="mb-2" :label="`${$t('login.also_identify_using')}:`" />
    <div class="flex space-x-2">
      <UButton
        :icon="view == 'new_user_form' ? 'i-fa6-solid-envelope' : 'i-fa6-solid-plus'"
        size="sm"
        color="primary"
        square
        :label="view == 'new_user_form' ? $t('shopping.customer_email') : $t('login.new_account')"
        variant="outline"
        :disabled="isFetchingUrl"
        @click="setFormView()"
      />
      <UButton
        icon="i-mdi-facebook-box"
        size="sm"
        color="primary"
        square
        label="Facebook"
        @click="authSocial('facebook')"
        :loading="currentlyFetching == 'facebook'"
        variant="outline"
        :disabled="isFetchingUrl"
      />
      <UButton
        icon="i-mdi-google"
        size="sm"
        color="primary"
        square
        label="Google"
        @click="authSocial('google')"
        :loading="currentlyFetching == 'google'"
        variant="outline"
        :disabled="isFetchingUrl"
      />
    </div>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['view-changed']);

const socialStore = socialAuthStore();
const shopping = shoppingStore();
const isFetchingUrl = ref(false)
const currentlyFetching = ref('')
const view = ref('new_user_form')

const openSocialPopUp = () => {
  const socialPopUp = window.open(socialStore.url, 'SocialPopUp', 'width=500,height=600,left=100,top=100');
  let iteration = 0;

  const checkSocialPopUp = () => {
    setTimeout(() => {
      iteration++;
      shopping.checkAuthuser(false);

      if (shopping.isUserAuthenticated) {
        socialPopUp.close();
      } else if (iteration <= 180) {
        checkSocialPopUp();
      }
    }, 1000);
  }

  checkSocialPopUp();
}
const authSocial = async (type) => {
  isFetchingUrl.value = true 
  currentlyFetching.value = type;
  const result = await socialStore.fetchSocialUrlAuth(type, true);

  if (result) {
    openSocialPopUp();
  }
  
  isFetchingUrl.value = false
  currentlyFetching.value = ''
}
const setFormView = () => {
  view.value = view.value === 'new_user_form' ? 'existent_user_form' : 'new_user_form';
  emits('view-changed', view);
}
</script>