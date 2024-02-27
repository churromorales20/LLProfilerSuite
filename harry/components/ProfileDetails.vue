<template>
  <div class="text-sm">
    <ProfileHeader />

    <div class="container mx-auto px-2 flex flex-col lg:flex-row">
      <div class="lg:w-1/3 px-4 py-1">
        <ProfilePersonalInfo />
        
        <ImagesSection />
        <div class="bg-white shadow rounded-lg p-4">
          <h2 class="text-lg font-bold mb-2">Videos</h2>
        </div>
      </div>

      <div class="lg:w-2/3 px-4 py-1">
        <div class="bg-white shadow rounded-lg p-4 mb-4">
          <!-- Obituario -->
          <div>
            <h2 class="text-xl font-bold mb-2">Obituario</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae sapien et odio dictum rutrum. In hac habitasse platea dictumst.</p>
          </div>
        </div>
        <!-- Biografía -->
        <div class="bg-white shadow rounded-lg p-4 mb-4">
          <h2 class="text-xl font-bold mb-2">Biografía</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae sapien et odio dictum rutrum. In hac habitasse platea dictumst.</p>
        </div>
        <!-- Comentarios -->
        <div class="bg-white shadow rounded-lg p-4">
          <h2 class="text-xl font-bold mb-2">Últimos Comentarios</h2>
          <!-- Aquí podrías incluir la sección de comentarios -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
</script>