<template>
  <input type="file" ref="avatarInput" accept="image/*" @change="handleFileChange" class="hidden" />
    <div class="z-10 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
      <div class="relative" @mouseover="showImageIcon = true" @mouseleave="showImageIcon = false">
        <UAvatar 
          :ui="{
            size: {
              '3xl': 'h-32 w-32 text-4xl'
            }
          }" 
          v-if="!avatarWorking"
          size="3xl" 
          :src="`/profiles/assets/${memorial.code}/${memorial.avatar}`"
          :alt="`${memorial.first_name} ${memorial.last_name}`" 
        />
        <div v-else>
          <div class="rounded-full bg-slate-100 flex items-center justify-center p-8">
            <UIcon name="i-fa6-solid-circle-notch" class="text-llblue-600 animate-spin text-6xl" />
          </div>
        </div>
        <UPopover v-model:open="isDialogOpen" class="absolute top-1/4 left-1/4" overlay>
          <UButton 
            v-show="showImageIcon && !avatarWorking" 
            color="llyellow" 
            size="md" 
            variant="solid"
            icon="i-fa6-solid-image" 
            :ui="{
              rounded: 'rounded-full',
              icon: {
                base: 'px-4 mx-2 py-4 my-2',
              },
            }" 
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
              <h1 class="font-semibold text-xl mb-4 border-b pb-2 border-zinc-400">Avatar options</h1>
              <UButton 
                icon="i-fa6-solid-trash" 
                size="md"
                @click="deleteCurrent" 
                :disabled="typeof memorial.avatar !== 'string'"
                color="llblue2" 
                variant="solid" 
                label="Delete current" 
                class="mb-2"
                block
              />
              <UButton 
                icon="i-fa6-solid-upload" 
                size="md" 
                @click="pickFile" 
                variant="solid" 
                label="Upload new" 
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
                label="Cancel" 
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
const avatarInput = ref(null);
const editorStore = memorialEditorStore()
const isDialogOpen = ref(false);
const avatarWorking = ref(false);

const pickFile = () => {
  avatarInput.value.click();
  isDialogOpen.value = false;
}

const handleFileChange = () => {
  if (avatarInput.value && avatarInput.value.files && avatarInput.value.files.length > 0) {
    uploadFile(avatarInput.value.files[0]);
  }
};

const deleteCurrent = async () => {
  isDialogOpen.value = false;
  avatarWorking.value = true;
  await editorStore.removeAvatar();
  avatarWorking.value = false;
};

const uploadFile = async (selectedFile) => {
  if (!selectedFile) return;

  avatarWorking.value = true;
  const formData = new FormData();
  formData.append('avatar', selectedFile);
  await editorStore.setAvatar(formData);
  avatarWorking.value = false;
};

const memorial = computed(() => {
  return editorStore.memorial
});

</script>