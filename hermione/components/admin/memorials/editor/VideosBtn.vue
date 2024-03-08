<template>
  <UPopover v-model:open="isShowingYoutubeForm" overlay>
    <UButton 
      size="md"
      variant="outline"
      :label="$t('memorials.add_video')" 
      icon="i-fa6-solid-film" 
    />
    <template #panel>
      <UCard
        :ui="{
          base: 'w-96',
          body: {
            padding: 'px-0 py-3 sm:p-6',
          },
          header: {
            padding: 'px-0 py-3 sm:px-6',
          },
          footer: {
            padding: 'px-0 py-3 sm:px-6',
          },
          ring: '',
          shadow: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800'
        }"
        >
          <template #header>
            <h2 class="text-xl font-semibold">{{ $t('memorials.add_youtube_video') }}</h2>
          </template> 
          
          <UInput size="md" v-model="urlVideo" placeholder="Enter youte video url" />
          <p v-if="invalidVideoUrl" class="font-medium text-sm text-red-500 mt-1">{{ $t('memorials.invalid_video') }}</p>
          <template #footer>
            <div class="flex justify-between">
              <UButton 
                icon="i-fa6-solid-ban" 
                size="md" 
                @click="closePopover" 
                color="orange" 
                variant="solid" 
                :label="$t('general.cancel')" 
              />
              <UButton 
                icon="i-fa6-solid-check" 
                size="md" 
                @click="addVideo" 
                variant="solid" 
                :label="$t('general.confirm')" 
              />
            </div>
        
          </template>
      </UCard>
    </template>
  </UPopover>
</template>
<script setup>
const editorStore = memorialEditorStore()
const isShowingYoutubeForm = ref(false);
const invalidVideoUrl = ref(false);
const urlVideo = ref('');

const addVideo = () => {
  const videoId = extractVideoId(urlVideo.value);

  if (videoId === null) {
    invalidVideoUrl.value = true;

    return;
  }

  invalidVideoUrl.value = false;
  editorStore.addVIdeo(videoId);
  isShowingYoutubeForm.value = false;
  urlVideo.value = '';
}

const closePopover = () => {
  isShowingYoutubeForm.value = false;
  invalidVideoUrl.value = false;
  urlVideo.value = '';
}

const extractVideoId = (url) => {
  const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?(?:.*&)?v=|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1]; // Devuelve el ID del video si hay coincidencia
  } else {
    return null; // Retorna null si no se encontró ningún ID de video
  }
}
</script>