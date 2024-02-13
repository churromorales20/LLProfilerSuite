<template>
  <div class="relative h-40 mb-12">
    <!-- Header con imagen de fondo -->
    <div class="h-full bg-cover bg-center"
      style="background-image: url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6c1284162382429.63d49d8919a23.png')">
      <!-- Contenedor para el avatar -->
      <div class="z-10 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
        <!-- Avatar -->
        <UAvatar :ui="{
          size: {
            '3xl': 'h-32 w-32 text-4xl'
          }
        }" size="3xl" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
      </div>
    </div>
  </div>
  <div>
    <AdminMemorialsEditorForm />
    <AdminMemorialsEditorImages />
    <div class="w-full bg-white p-4 rounded-md">
      <h2 class="text-neutral-950 text-2xl font-bold mb-2">Videos</h2>
      <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3' }">
        <img :src="item" class="w-full" draggable="false">
      </UCarousel>
    </div>
  </div>
</template>
<script setup>
import { format } from 'date-fns'

const date = ref(new Date())
const editorStore = memorialEditorStore()

const items = [
  'https://picsum.photos/600/600?random=1',
  'https://picsum.photos/600/600?random=2',
  'https://picsum.photos/600/600?random=3',
  'https://picsum.photos/600/600?random=4',
  'https://picsum.photos/600/600?random=5',
  'https://picsum.photos/600/600?random=6'
]
</script>