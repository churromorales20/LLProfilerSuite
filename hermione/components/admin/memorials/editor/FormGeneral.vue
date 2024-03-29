<template>
  <div class="flex flex-col md:flex-row mb-4 mt-2 gap-4">
    <div class="w-full md:w-1/2 bg-white p-4 rounded-md">
      <h2 class="text-neutral-950 text-lg font-bold mb-2">{{ $t('memorials.personal_info') }}</h2>
      <label for="first-name" class="form-label text-neutral-950 mb-2 block">{{ $t('memorials.first_name') }}</label>
      <UInput id="first-name" @change="updateAttribute('first_name', $event.target.value)" v-model="memorial.first_name"
        class="mb-2" size="md" label="First Name" :placeholder="$t('memorials.enter_first_name')">
        <template v-if="editorStore.updatingAttr === 'first_name'" #trailing>
          <UIcon name="i-fa6-solid-spinner"
            class="animate-spin text-llblue-600" />
        </template>
      </UInput>
      <label for="last-name" class="form-label text-neutral-950 mb-2 block">{{ $t('memorials.last_name') }}</label>
      <UInput id="last-name" @change="updateAttribute('last_name', $event.target.value)" v-model="memorial.last_name"
        class="mb-2" size="md" label="Last Name" :placeholder="$t('memorials.last_name')">
        <template v-if="editorStore.updatingAttr === 'last_name'" #trailing>
          <UIcon name="i-fa6-solid-spinner"
            class="animate-spin text-llblue-600" />
        </template>
      </UInput>
      <label for="relationship" class="form-label text-neutral-950 mb-2 block">{{ $t('memorials.relationship')
      }}</label>
      <USelect v-model="memorial.relationship" @change="updateAttribute('relationship', $event.target.value, true)"
        :options="relationships" option-attribute="name" size="lg" :placeholder="$t('memorials.select_relationship')">
        <template v-if="editorStore.updatingAttr === 'relationship'" #trailing>
          <UIcon name="i-fa6-solid-spinner"
            class="animate-spin text-llblue-600" />
        </template>
      </USelect>
      <label for="nickname" class="form-label text-neutral-950 mb-2 mt-2 block">{{ $t('memorials.nickname') }}</label>
      <UInput class="mb-2" size="md" @change="updateAttribute('nickname', $event.target.value)"
        v-model="memorial.nickname" id="nickname" :placeholder="$t('memorials.enter_nickname')">
        <template v-if="editorStore.updatingAttr === 'nickname'" #trailing>
          <UIcon name="i-fa6-solid-spinner"
            class="animate-spin text-llblue-600" />
        </template>
      </UInput>
    </div>
    <div class="w-full md:w-1/2 bg-white p-4 rounded-md">
      <h2 class="text-neutral-950 text-lg font-bold mb-2">{{ $t('memorials.places_dates') }}</h2>
      <label for="born-date" class="form-label text-neutral-950 mb-2 block">{{ $t('memorials.born_date') }}</label>
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton icon="i-heroicons-calendar-days-20-solid" variant="outline"
          :loading="editorStore.updatingAttr === 'born_date'"
          :label="bornDate !== null ? format(bornDate, 'd MMM, yyy') : $t('memorials.select_born_date')" />
        <template #panel="{ close }">
          <CommonsDatePicker @update:model-value="(newDate) => {
            updateAttribute('born_date', `${format(newDate, 'yyyy-MM-dd')} 12:00:00`, true)
          }" v-model="bornDate" @close="close" />
        </template>
      </UPopover>
      <label for="born-place" class="form-label text-neutral-950 mb-2 block mt-3">{{ $t('memorials.born_place')
      }}</label>
      <UInput id="born-place" class="mb-2" size="md" @change="updateAttribute('born_place', $event.target.value)"
        v-model="memorial.born_place" label="Born Place" :placeholder="$t('memorials.enter_born_place')">
        <template v-if="editorStore.updatingAttr === 'born_place'" #trailing>
          <UIcon name="i-fa6-solid-spinner"
            class="animate-spin text-llblue-600" />
        </template>
      </UInput>
      <label for="death-date" class="form-label text-neutral-950 mb-2 block">{{ $t('memorials.passed_away') }}</label>
      <UPopover :popper="{ placement: 'bottom-start' }">
        <UButton :loading="editorStore.updatingAttr === 'death_date'" variant="outline"
          icon="i-heroicons-calendar-days-20-solid"
          :label="deathDate !== null ? format(deathDate, 'd MMM, yyy') : $t('memorials.select_passed_away')" />
        <template #panel="{ close }">
          <CommonsDatePicker v-model="deathDate" @close="close" @update:model-value="(newDate) => {
            updateAttribute('death_date', `${format(newDate, 'yyyy-MM-dd')} 12:00:00`, true)
          }" />
        </template>
      </UPopover>
      <label for="born-place" class="form-label text-neutral-950 mb-2 block mt-3">{{ $t('memorials.death_place')
      }}</label>
      <UInput class="mb-2" id="death-place" @change="updateAttribute('death_place', $event.target.value)"
        v-model="memorial.death_place" size="md" :placeholder="$t('memorials.enter_death_place')">
        <template v-if="editorStore.updatingAttr === 'death_place'" #trailing>
          <UIcon name="i-fa6-solid-spinner"
            class="animate-spin text-llblue-600" />
        </template>
      </UInput>
    </div>
  </div>
</template>
<script setup>
import { format } from 'date-fns'
const locale = useI18n()
const editorStore = memorialEditorStore()

const updateAttribute = (attribute, value, now) => {

  editorStore.updateMemorial(attribute, value, now === true);
}

const relationships = [
  { name: locale.t('memorials.rel_uncle'), value: 'uncle' },
  { name: locale.t('memorials.rel_aunt'), value: 'aunt' },
  { name: locale.t('memorials.rel_cousin'), value: 'cousin' },
  { name: locale.t('memorials.rel_grandfather'), value: 'grandfather' },
  { name: locale.t('memorials.rel_grandmother'), value: 'grandmother' },
  { name: locale.t('memorials.rel_father'), value: 'father' },
  { name: locale.t('memorials.rel_mother'), value: 'mother' },
  { name: locale.t('memorials.rel_sibling'), value: 'sibling' },
  { name: locale.t('memorials.rel_friend'), value: 'friend' },
  { name: locale.t('memorials.rel_wife'), value: 'wife' },
  { name: locale.t('memorials.rel_husband'), value: 'husband' },
  { name: locale.t('memorials.rel_partner'), value: 'partner' }
];

const memorial = computed(() => {
  return editorStore.memorial
});

const bornDate = computed({
  get: () => editorStore.memorial.born_date,
  set: (value) => {
    editorStore.setDate('born', value)
  }
})
const deathDate = computed({
  get: () => editorStore.memorial.death_date,
  set: (value) => {
    editorStore.setDate('death', value)
  }
})
</script>