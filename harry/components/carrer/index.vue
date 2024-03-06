<template>
  <h3 class="text-base font-bold">{{ $t('profile.carrer_title') }}</h3>
  <div class="max-h-72 overflow-y-auto">
    <ul>
    <li v-for="carrerItem, index in carreInfo">
      <CarrerInfoItem 
        v-show="index < 2 || showAllItems"
        :carrerItem="carrerItem" 
        :key="`_carrer_info_item_${index}_`" 
      />
    </li>
  </ul>
  </div>
  <UButton 
    v-if="carreInfo.length > 3" 
    class="pt-2"
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
const carreInfo = computed(() => profileStore.carrer)
</script>