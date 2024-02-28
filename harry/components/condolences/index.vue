<template>
  <CondolencesModal />
  <div v-if="wallActive" class="bg-white shadow rounded-lg p-4">
    <div class="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
      <h2 class="text-xl font-bold mb-2">{{ $t('condolences.title_section') }}</h2>
      <UButton 
        icon="i-mdi-notebook-heart" 
        size="md"
        color="sky"
        @click="wallStore.toggleNewEntryModal(true)"
        :label="$t('profile.btn_leave_condo')"
        class="mr-2"
      />
    </div>
    <div v-if="!loading">
      <CondolencesEntry 
        v-for="entry, index in wallStore.entries"
        :entry="entry"
      />
    </div>
    <CondolencesLoader v-if="loading" />
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
const wallStore = condolencesWallStore()
const loading = ref(true);

const wallActive = profileStore.profile.settings.condolences_wall;

if (wallActive) {
  onMounted(async() => {
    wallStore.setMemorialCode(profileStore.profile.code)
    await wallStore.fetch();
    loading.value = false;
  });
}
</script>