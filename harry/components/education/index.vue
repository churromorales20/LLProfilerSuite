<template>
  <h3 class="text-base font-bold ll-box-title-main">{{ $t('profile.education_title') }}</h3>
  <div class="max-h-72 overflow-y-auto">
    <ul>
    <li v-for="educationItem, index in educationInfo">
      <EducationInfoItem 
        v-show="index < 2 || showAllItems"
        :educationItem="educationItem" 
        :key="`_education_info_item_${index}_`" 
      />
    </li>
  </ul>
  </div>
  <UButton 
    v-if="educationInfo.length > 3" 
    class="pt-2 ll-link-custom"
    variant="link" 
    @click="() => {
      showAllItems = !showAllItems
    }"
    color="sky" 
    size="sm" 
    block>
      {{ showAllItems ? $t('profile.show_more') : $t('profile.show_less') }}
  </UButton>
</template>

<script setup>
const profileStore = useProfileStore()
const showAllItems = ref(false);
const educationInfo = computed(() => profileStore.education)
</script>