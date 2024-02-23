<template>
  <form class="space-y-6" action="#" method="POST">
    <CommonsAuthLoginForm />
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
        <ULink
          to="/auth/signup"
          active-class="font-medium text-indigo-600 hover:text-indigo-500"
          inactive-class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          {{ $t('login.sign_up') }}
        </ULink>
      </p>
    </div>
  </form>
</template>
<script setup>

definePageMeta({
  layout: 'auth-views'
})

</script>