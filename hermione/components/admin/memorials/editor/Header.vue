<template>
  <div 
    :class="headerCss"
    class="h-full bg-cover bg-center rounded-t-md"
    :style="memorial.top_image !== null ? `background-image: url('/profiles/assets/${memorial.code}/${memorial.top_image}')` : ''"
  >
    <div class="w-full h-full relative" @mouseover="showImageIcon = true" @mouseleave="showImageIcon = false">
      <AdminMemorialsEditorAvatar />
      <input type="file" ref="headerInput" accept="image/*" @change="handleFileChange" class="hidden" />
      <UPopover v-model:open="isDialogOpen" class="absolute bottom-0 lef-0 ml-2 mb-2 w-full flex justify-between" overlay>
        <UButton 
          v-show="showImageIcon || isWorking" 
          color="llyellow" 
          :loading="isWorking"
          size="md" 
          variant="solid"
          icon="i-fa6-solid-image"
          :label="$t('memorials.change_header_image')" 
        />
        <template #panel>
          <UCard
            :ui="{
              base: 'w-64',
              body: {
                padding: 'px-0 py-3 sm:p-3',
              },
              ring: '',
              shadow: '',
              divide: 'divide-y divide-gray-100 dark:divide-gray-800'
            }"
          >
            <h1 class="font-semibold text-xl mb-4 border-b pb-2 border-zinc-400">{{ $t('memorials.header_image_title') }}</h1>
            <UButton 
              icon="i-fa6-solid-trash" 
              size="md"
              @click="deleteCurrent" 
              :disabled="typeof memorial.top_image !== 'string'"
              color="llblue2" 
              variant="solid" 
              :label="$t('memorials.delete_header_image')" 
              class="mb-2"
              block
            />
            <UButton 
              icon="i-fa6-solid-upload" 
              size="md" 
              @click="pickFile" 
              variant="solid" 
              :label="$t('memorials.upload_new')" 
              class="mb-2"
              block
            />
            <UButton 
              icon="i-fa6-solid-ban" 
              size="md"
              @click="() => {
                isDialogOpen = false;
              }" 
              color="orange" 
              variant="solid" 
              :label="$t('general.cancel')" 
              block
            />
          </UCard>
        </template>
      </UPopover>
    </div>
  </div>
</template>
<script setup>

import { ref, computed } from 'vue'

const showImageIcon = ref(false)
const headerInput = ref(null);
const editorStore = memorialEditorStore()
const isWorking = ref(false);
const isDialogOpen = ref(false);

const pickFile = () => {
  headerInput.value.click();
  isDialogOpen.value = false;
}

const handleFileChange = () => {
  if (headerInput.value && headerInput.value.files && headerInput.value.files.length > 0) {
    uploadFile(headerInput.value.files[0]);
  }
};

const uploadFile = async (selectedFile) => {
  if (!selectedFile) return;

  isWorking.value = true;
  const formData = new FormData();
  formData.append('header_image', selectedFile);
  await editorStore.setHeader(formData);
  isWorking.value = false;
};

const memorial = computed(() => {
  return editorStore.memorial
});

const deleteCurrent = async () => {
  isDialogOpen.value = false;
  isWorking.value = true;
  await editorStore.removeHeader();
  isWorking.value = false;
};

const headerCss = computed(() => {
  const imageIsNull = editorStore.memorial.top_image === null || editorStore.memorial.top_image === undefined
  
  return { 
    'border-4': imageIsNull,
    'border-slate-400': imageIsNull
  };
});

</script>