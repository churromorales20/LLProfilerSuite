<template>
  <div class="flex h-screen overflow-hidden">
    <AdminMenu />
    <main class="flex-1 overflow-y-auto bg-slate-100">
      <AdminHeader />
      <div class="p-2 lg:p-4">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
if (process.server) {
  useHead({ script: [{ src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_KEY}&v=weekly`, defer: true }] });
}
</script>
