<template>
 <div class="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div>
    <form>
      <select v-model="locale">
        <option value="en">en</option>
        <option value="es">es</option>
      </select>
    </form>
  </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img style="height:170px;" class="mx-auto w-auto" src="/logo.png" alt="Logo">
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ $t('login.email') }}
            </label>
            <div class="mt-1">
              <UInput color="primary" icon="i-fa6-solid-envelope" size="md" type="email" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{ $t('login.pass') }}
            </label>
            <div class="mt-1">
              <UInput color="primary" icon="i-fa6-solid-lock" size="md" type="password" />
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
            <UButton @click="goToDashboard" size="md" color="primary" variant="solid" block>
              {{ $t('login.sign_in') }}
            </UButton>
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
            <a href="#" class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Facebook
            </a>
            <a href="#" class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Google
            </a>
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
      </div>
    </div>
  </div>
</template>
<script setup>
  const { locale } = useI18n()
  const goToDashboard = () => {
    navigateTo('/dashboard')
  }
</script>