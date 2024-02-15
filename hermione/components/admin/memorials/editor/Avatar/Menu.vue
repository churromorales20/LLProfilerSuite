<template>
  <input type="file" ref="avatarInput" accept="image/*" @change="handleFileChange" class="hidden" />
  <UPopover v-model:open="isDialogOpen" class="absolute top-1/4 left-1/4" overlay>
    <UButton v-show="showImageIcon && !avatarWorking" color="llyellow" size="md" variant="solid"
      icon="i-fa6-solid-image" :ui="{
        rounded: 'rounded-full',
        icon: {
          base: 'px-4 mx-2 py-4 my-2',
        },
      }" />
    <template #panel>
      <UCard :ui="{
        base: 'w-64',
        body: {
          padding: 'px-0 py-3 sm:p-3',
        },
        ring: '',
        shadow: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }">
        <h1 class="font-semibold text-xl mb-4 border-b pb-2 border-zinc-400">Avatar options</h1>
        <UButton 
          icon="i-fa6-solid-trash" 
          size="md" 
          @click="deleteCurrent"
          :disabled="typeof memorial.avatar !== 'string'" 
          color="llblue2" 
          variant="outline" 
          label="Delete current"
          class="mb-2" 
          block 
        />
        <UButton 
          icon="i-fa6-solid-upload" 
          size="md" 
          @click="pickFile" 
          variant="outline" 
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
          variant="outline" 
          label="Cancel" 
          block />
      </UCard>
    </template>
  </UPopover>
  <AdminMemorialsEditorAvatarCropper v-if="avatarStore.showCropper" />
</template>
<script setup>
import { ref, computed } from 'vue'

const avatarInput = ref(null);
const editorStore = memorialEditorStore()
const avatarStore = avatarSelectorStore();
const isDialogOpen = ref(false);

const showImageIcon = computed(() => avatarStore.showImageIcon);
const avatarWorking = computed(() => avatarStore.avatarWorking);

const pickFile = () => {
  avatarInput.value.click();
  isDialogOpen.value = false;
}

const handleFileChange = () => {
  if (avatarInput.value && avatarInput.value.files && avatarInput.value.files.length > 0) {
    //uploadFile(avatarInput.value.files[0]);
    showCropperDialog(avatarInput.value.files[0]);
  }
};

const showCropperDialog = (file) => {
  const reader = new FileReader();
  reader.onload = e => {
    avatarStore.setCropperSrc(String(e.target.result));
  };
  reader.readAsDataURL(file);
}

const deleteCurrent = async () => {
  isDialogOpen.value = false;
  avatarStore.setWorking(true);
  await editorStore.removeAvatar();
  avatarStore.setWorking(false);
};

const uploadFile = async (selectedFile) => {
  if (!selectedFile) return;

  avatarStore.setWorking(true);
  const formData = new FormData();
  formData.append('avatar', selectedFile);
  await editorStore.setAvatar(formData);
  avatarStore.setWorking(false);
};

const memorial = computed(() => {
  return editorStore.memorial
});

</script>