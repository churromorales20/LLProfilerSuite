<template>
  <div class="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img style="height:170px;" class="mx-auto w-auto" src="/logo.png" alt="Logo">
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 min-h-80">
        <slot />
      </div>
    </div>
  </div>
</template>