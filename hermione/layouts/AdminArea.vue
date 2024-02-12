<template>
  <div class="flex h-screen overflow-hidden">
    <AdminMenu />
    <main class="flex-1 overflow-y-auto bg-slate-100">
      <AdminHeader />
      <div class="p-4">
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
  const toggleMenu = () => {
    const menu = document.querySelector('aside');
    menu.classList.toggle('hidden');
  }
</script>
