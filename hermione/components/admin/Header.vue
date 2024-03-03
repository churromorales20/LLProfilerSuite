<template>
  <header class="bg-slate-100 text-white py-4 px-2 lg:py-4 lg:px-6 flex justify-between items-center">
    <UButton
      class="lg:hidden" 
      @click="toggleMenu" 
      icon="i-mdi-menu"
      variant="link"
      size="md"
    />
    <UAlert 
      class="hidden lg:block"
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
      :title='userStore.dashboardPhrase' 
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
const userStore = userAdminStore();
const toggleMenu = () => {
  const menu = document.querySelector('aside');
  menu.classList.toggle('hidden');
}
const logout = () => {
  const authCookie = useCookie('_LL_FRAMEWORK_INFO_')
  authCookie.value = null;
  window.location.href = '/auth/login';
}
</script>