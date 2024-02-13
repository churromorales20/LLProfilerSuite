<template>
  <header class="bg-slate-100 text-white py-4 px-6 flex justify-between items-center">
    <button @click="toggleMenu" class="block lg:hidden focus:outline-none">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
    <UAlert 
      icon="i-fa6-solid-hand-holding-heart"
      color="llyellow"
      :ui="{
        title: 'italic text-llblue-600',
        wrapper: 'w-fit relative overflow-hidden',
        inner: 'w-fit flex-1',
        icon: {
          base: 'flex-shrink-0 w-5 h-5 text-llblue-600',
        },
      }" 
      title='In loving memory, their digital footprint continues to guide us.' 
    />
    <div class="flex items-center space-x-4">
      <UPopover>
        <UButton
          icon="i-fa6-solid-user"
          size="sm"
          color="primary"
          square
          variant="solid"
        />

        <template #panel>
          <AdminMenu />
        </template>
      </UPopover>
      <UChip text="3" size="2xl">
        <UButton
          icon="i-fa6-solid-bell"
          size="sm"
          color="llyellow"
          square
          variant="solid"
        />
      </UChip>
      <UButton
        @click="logout"
        icon="i-fa6-solid-power-off"
        size="sm"
        color="red"
        square
        variant="solid"
      />
    </div>
  </header>
</template>
<script setup>
  const logout = () => {
    const authCookie = useCookie('_LL_FRAMEWORK_INFO_')
    authCookie.value = null;
    navigateTo('/auth/login');
  }
</script>