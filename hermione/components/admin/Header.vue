<template>
  <header class="bg-slate-100 text-white py-4 px-6 flex justify-between items-center">
    <!-- Icono para mostrar/ocultar el menú lateral en dispositivos móviles -->
    <button @click="toggleMenu" class="block lg:hidden focus:outline-none">
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <span>&nbsp;</span>

    <!-- Iconos de usuario, búsqueda y configuración -->
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