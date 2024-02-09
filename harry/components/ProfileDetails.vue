<template>
  <div class="p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Encabezado del perfil -->
      <div class="text-center mb-6">
        <h1 class="ll-title font-bold">{{ profile.first_name }} {{ profile.last_name }}</h1>
        <p v-if="!isEmptyString(profile.uname)" class="ll-uname-text">{{ profile.uname }}</p>
      </div>

      <!-- Información personal -->
      <div class="ll-box-text ll-box p-6 ll-rounded shadow-md mb-6">
        <h2 class="ll-box-title font-semibold mb-4">Información Personal</h2>
        <div v-if="!isEmptyString(profile.born_date)">
          <strong>Fecha de Nacimiento:</strong> {{ profile.born_date }}
        </div>
        <div v-if="!isEmptyString(profile.death_date)">
          <strong>Fecha de Muerte:</strong> {{ profile.death_date }}
        </div>
        <div v-if="!isEmptyString(profile.born_place)">
          <strong>Lugar de Nacimiento:</strong> {{ profile.born_place }}
        </div>
        <div v-if="!isEmptyString(profile.nickname)">
          <strong>Apodo:</strong> {{ profile.nickname }}
        </div>
      </div>

      <!-- Biografía -->
      <div v-if="!isEmptyString(profile.bio)" class="ll-box p-6 ll-rounded shadow-md mb-6">
        <h2 class="ll-box-title font-semibold mb-4">Biografía</h2>
        <p class="ll-box-text">{{ profile.bio }}</p>
      </div>

      <!-- Obituario -->
      <div v-if="!isEmptyString(profile.obituary)" class="ll-box p-6 ll-rounded shadow-md mb-6">
        <h2 class="ll-box-title font-semibold mb-4">Obituario</h2>
        <p class="ll-box-text">{{ profile.obituary }}</p>
      </div>

      <!-- Galería de imágenes -->
      <div v-if="profile.images.length > 0" class="ll-box p-6 ll-rounded shadow-md mb-6">
        <h2 class="ll-box-title font-semibold mb-4">Galería de Imágenes</h2>
        <div class="grid grid-cols-2 gap-4">
          <!-- Iterar sobre las imágenes en el array -->
          <img v-for="(image, index) in profile.images" :key="index" :src="image" alt="Imagen del perfil"
            class="w-full h-auto ll-rounded">
        </div>
      </div>

      <!-- Videos de YouTube -->
      <div v-if="profile.videos.length > 0" class="ll-box p-6 ll-rounded shadow-md mb-6">
        <h2 class="ll-box-title font-semibold mb-4">Videos de YouTube</h2>
        <div class="grid grid-cols-2 gap-4">
          <!-- Iterar sobre los videos en el array -->
          <iframe v-for="(video, index) in profile.videos" :key="index" :src="video" width="100%" height="250"
            frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
</script>
