<template>
  <UButton 
    :size="viewport.isLessThan('md') ? 'sm' : 'md'" 
    @click="() => {
      shopping.setModalStatus(true)
    }"
    icon="i-mdi-data-matrix-plus"
    :label="viewport.isLessThan('md') ? $t('general.new') : $t('memorials.add_new')"
  />
  <UModal 
    v-model="isOpen" 
    :ui="{
      width: 'll-card'
    }"
    :prevent-close="preventClose"
    :fullscreen="viewport.isLessThan('lg')"
  >
    <UCard 
      :ui="{ 
        ring: '', 
        body: {
          background: 'bg-white',
          padding: 'px-2 py-5 lg:p-4',
          base: `overflow-y-auto h-screen ${shopping.isSimpleMemorial ? 'simple-memorial-modal' : 'lg:h-[80vh]'} lg:overflow-y-hidden`,
        },
        divide: 'divide-y divide-gray-100 dark:divide-gray-800'
      }"
    >
      <template #header v-if="viewport.isLessThan('md')">
        <div class="flex justify-between">
          <h2 class="font-semibold text-xl">{{ $t('memorials.new') }}</h2>
          <UButton
            icon="i-mdi-close-octagon"
            size="sm"
            variant="outline"
            color="amber"
            @click="() => {
              shopping.setModalStatus(false)
            }"
          />
        </div>
      </template> 
      <CommonsShopping :inAdmin="true"/>
    </UCard>
  </UModal>
</template>
<script setup>
const viewport = useViewport()
const isOpen = computed({
  get() {
    return shopping.modalOpened
  },
  set() {
    shopping.setModalStatus(false)
  }
});
const shopping = shoppingStore();
const preventClose = computed(() => shopping.viewStep === 3 && !shopping.completed);
</script>
<style  >
.simple-memorial-modal{
  height: 40rem;
}
</style>