<template>
  <header class="relative">
    <div class="bg-cover bg-center h-48 flex items-end rounded-b-lg"
      :style="`background-image: url('/profiles/assets/${profile.code}/${profile.top_image}');`">
      <!--<img :src="`/profiles/assets/${profile.id}/${profile.avatar}`" alt="Avatar" class="w-24 h-24 rounded-full border-4 border-white -mb-12 mx-4">
      -->
      <div class="relative ml-6">
        <div class="z-10 absolute bottom-0 transform translate-y-1/2">
          <UAvatar size="3xl" class="border-2 border-zinc-900"
            :src="`/profiles/assets/${profile.code}/${profile.avatar}`" :alt="fullName" :ui="{
              size: {
                '3xl': 'h-36 w-36 text-3xl',
              }
            }" />
        </div>
      </div>
    </div>
  </header>
  <div class="h-20 pl-48 pr-6 items-center flex justify-between">
    <div>
      <h2 class="text-2xl font-semibold text-white">{{ fullName }}</h2>
      <p class="text-lg ll-uname-text" v-if="!isEmptyString(profile.nickname)">{{ profile.nickname }}</p>
    </div>
    <div>
      <UButton 
        v-if="wallActive"
        icon="i-mdi-notebook-heart" 
        size="md"
        @click="wallStore.toggleNewEntryModal(true)"
        color="sky"
        :label="$t('profile.btn_leave_condo')"
        class="mr-2"
      />
      <UButton 
        icon="i-mdi-share-variant" 
        size="md"
        color="sky"
        :label="$t('profile.btn_share')"
        class="mr-2"
      />
      <UButton 
        icon="i-mdi-bell" 
        size="md"
        color="sky"
        :label="$t('profile.btn_subscribe')"
      />
    </div>
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
const wallActive = profileStore.profile.settings.condolences_wall;
const wallStore = condolencesWallStore()
const profile = computed(() => profileStore.profile);
const fullName = computed(() => profileStore.fullName);
</script>