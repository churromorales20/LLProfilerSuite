<template>
  <CondolencesModal />
  <div v-if="wallActive" class="bg-white shadow rounded-lg p-4" :class="{'mt-4': viewport.isLessThan('lg') }">
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
    <transition 
      @after-enter="loaded = true"
      leave-to-class="animate__animated animate__fadeOut" 
    >
      <div v-if="loaded">
        <template v-if="wallStore.entries.length > 0">
          <CondolencesEntry 
            v-for="entry, index in wallStore.entries"
            :entry="entry"
          />
        </template>
        <div class="flex h-44 items-center justify-center" v-else>
          <h4 class="text-sm">No condolences have been shared yet.</h4>
        </div>
      </div>
    </transition>
    <transition 
      @after-leave="loaded = true"
      leave-to-class="animate__animated animate__fadeOut" 
    >
      <CondolencesLoader v-if="loading" />
    </transition>
  </div>
</template>

<script setup>
const viewport = useViewport()
const profileStore = useProfileStore()
const wallStore = condolencesWallStore()
const loading = ref(true);
const loaded = ref(false);

const wallActive = profileStore.profile.settings.condolences_wall;

if (wallActive) {
  onMounted(async() => {
    wallStore.setMemorialCode(profileStore.profile.code)
    await wallStore.fetch();
    loading.value = false;
  });
}
</script>