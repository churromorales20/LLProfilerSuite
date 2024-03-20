<template>
  <div class="ll-box ll-box-text shadow rounded-lg p-4 mb-4">
    <h2 class="text-lg ll-box-title-main font-bold pb-2 border-b-2 ll-border-heading">{{ $t('profile.biography') }}</h2>
    <div class="px-1 py-2 text-md overflow-hidden" v-if="!isEmptyString(profile.bio)">
      <div class="flex leading-6">
        <div class="bio-container" v-html="biographyInfo"></div>
      </div>
    </div>
    <div class="flex h-40 items-center justify-center" v-else>
      <h4 class="text-sm">
        {{ $t('profile.no_bio') }}
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts">
const locale = useI18n()
const TEXT_LIMIT = 450;
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
const isTextOverflowed = profileStore.profile.bio.length >= TEXT_LIMIT;
const biographyInfo = computed(() => {
  
  if (isTextOverflowed) {
    let btnText = locale.t('profile.view_less');
    let bioText = profileStore.profile.bio;

    if (!viewAll.value) {
      btnText = locale.t('profile.view_more');
      bioText = `${profileStore.profile.bio?.slice(0, TEXT_LIMIT)}...`;
    }
    const viewMoreBtn = `&nbsp;<a id="_bio_content_button_" class="cursor-pointer ll-link-custom font-semibold">${btnText}</a>`;
    return bioText + viewMoreBtn;
  }
  return profileStore.profile.bio
})
const viewAll = ref(false);

const bindBtn = () => {
  const handler = () => {
    document.getElementById("_bio_content_button_").removeEventListener("click", handler);
    viewAll.value = !viewAll.value;
    bindBtn();
  }
  
  setTimeout(() => {
      document.getElementById("_bio_content_button_").addEventListener("click", handler);
  }, 500);
}

onMounted(() => {
  if (isTextOverflowed) {
    bindBtn();
  }
});
</script>

<style>
.bio-container p{
  margin-bottom: 1rem;
}
</style>