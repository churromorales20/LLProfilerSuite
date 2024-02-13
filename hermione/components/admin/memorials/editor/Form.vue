
<template>
  <div v-if="editorStore.showForm">
    <div class="flex flex-col md:flex-row mb-4 gap-4">
      <div class="w-full md:w-1/2 bg-white p-4 rounded-md">
        <h2 class="text-neutral-950 text-2xl font-bold mb-2">Personal information</h2>
        <label for="first-name" class="form-label text-neutral-950 mb-2 block">First Name</label>
        <UInput 
          id="first-name"
          @change="updateAttribute('first_name', $event.target.value)" 
          v-model="memorial.first_name" 
          class="mb-2" 
          size="md"
          label="First Name" 
          placeholder="Enter first name" 
        >
          <template #trailing>
            <UIcon v-if="editorStore.updatingAttr === 'first_name'" name="i-fa6-solid-spinner" class="animate-spin text-llblue-600" />
          </template>
        </UInput>
        <label for="last-name" class="form-label text-neutral-950 mb-2 block">Last Name</label>
        <UInput 
          id="last-name" 
          @change="updateAttribute('last_name', $event.target.value)" 
          v-model="memorial.last_name" 
          class="mb-2" 
          size="md" 
          label="Last Name" 
          placeholder="Enter last name" 
        >
          <template #trailing>
            <UIcon v-if="editorStore.updatingAttr === 'last_name'" name="i-fa6-solid-spinner" class="animate-spin text-llblue-600" />
          </template>
        </UInput>
        <label for="relationship" class="form-label text-neutral-950 mb-2 block">Relationship</label>
        <USelect 
          v-model="memorial.relationship"
          @change="updateAttribute('relationship', $event.target.value, true)"  
          :options="relationships" 
          option-attribute="name" 
          size="lg"
          placeholder="Select relationship"
        >
          <template #trailing>
            <UIcon v-if="editorStore.updatingAttr === 'relationship'" name="i-fa6-solid-spinner" class="animate-spin text-llblue-600" />
          </template>
        </USelect>
        <label for="nickname" class="form-label text-neutral-950 mb-2 mt-2 block">Nickname</label>
        <UInput 
        class="mb-2" 
        size="md" 
        @change="updateAttribute('nickname', $event.target.value)" 
        v-model="memorial.nickname" 
        id="nickname" 
        placeholder="Enter nickname">
          <template #trailing>
            <UIcon v-if="editorStore.updatingAttr === 'nickname'" name="i-fa6-solid-spinner" class="animate-spin text-llblue-600" />
          </template>
        </UInput>
      </div>
      <div class="w-full md:w-1/2 bg-white p-4 rounded-md">
        <h2 class="text-neutral-950 text-2xl font-bold mb-2">Places and dates</h2>
        <label for="born-date" class="form-label text-neutral-950 mb-2 block">Born Date</label>
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton 
            icon="i-heroicons-calendar-days-20-solid"
            :loading="editorStore.updatingAttr === 'born_date'"
            :label="bornDate !== null ? format(bornDate, 'd MMM, yyy') : 'Select date of birth'" 
          />
          <template #panel="{ close }">
            <CommonsDatePicker 
              @update:model-value="(newDate) => {
                updateAttribute('born_date', `${format(newDate, 'yyyy-MM-dd')} 12:00:00`, true)
              }" 
              v-model="bornDate" 
              @close="close" 
            />
          </template>
        </UPopover>
        <label for="born-place" class="form-label text-neutral-950 mb-2 block mt-3">Born Place</label>
        <UInput 
          id="born-place" 
          class="mb-2" 
          size="md" 
          @change="updateAttribute('born_place', $event.target.value)" 
          v-model="memorial.born_place" 
          label="Born Place" 
          placeholder="Enter place of birth">
          <template #trailing>
            <UIcon v-if="editorStore.updatingAttr === 'born_place'" name="i-fa6-solid-spinner" class="animate-spin text-llblue-600" />
          </template>
        </UInput>
        <label for="death-date" class="form-label text-neutral-950 mb-2 block">Passed away on</label>
        <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton 
              :loading="editorStore.updatingAttr === 'death_date'"
              icon="i-heroicons-calendar-days-20-solid" 
              :label="deathDate !== null ? format(deathDate, 'd MMM, yyy') : 'Select when passed away'" 
            />
            <template #panel="{ close }">
              <CommonsDatePicker 
                v-model="deathDate" 
                @close="close" 
                @update:model-value="(newDate) => {
                  updateAttribute('death_date', `${format(newDate, 'yyyy-MM-dd')} 12:00:00`, true)
                }" 
              />
            </template>
          </UPopover>
        <label for="born-place" class="form-label text-neutral-950 mb-2 block mt-3">Passed away in</label>
        <UInput 
          class="mb-2" 
          id="death-place" 
          @change="updateAttribute('death_place', $event.target.value)" 
          v-model="memorial.death_place" 
          size="md" 
          placeholder="Enter place of death">
          <template #trailing>
            <UIcon v-if="editorStore.updatingAttr === 'death_place'" name="i-fa6-solid-spinner" class="animate-spin text-llblue-600" />
          </template>
        </UInput>
      </div>
    </div>
    <div class="w-full bg-white p-4 rounded-md mb-4">
      <label for="biography" class="text-neutral-950 text-2xl font-bold mb-2 block">Biography</label>
      <UTextarea v-model="memorial.bio" size="xl" id="biography" placeholder="Enter biography"/>
      <div class="flex justify-end mt-3">
        <UButton 
          :disabled="originalMemorial.bio === memorial.bio" 
          size="md"
          :loading="editorStore.updatingAttr === 'bio'"
          @click="() => {
            updateAttribute('bio', memorial.bio, true)
          }"
          icon="i-fa6-solid-floppy-disk"
          label="Update" 
        />
      </div>
    </div>
    <div class="w-full bg-white p-4 rounded-md mb-4">
      <label for="obituary" class="text-neutral-950 text-2xl font-bold mb-2 block">Obituary</label>
      <UTextarea size="xl" id="obituary" placeholder="Enter obituary"/>
      <div class="flex justify-end mt-3">
        <UButton 
          :disabled="originalMemorial.obituary === memorial.obituary" 
          size="md"
          :loading="editorStore.updatingAttr === 'obituary'"
          @click="() => {
            updateAttribute('obituary', memorial.obituary, true)
          }"
          icon="i-fa6-solid-floppy-disk"
          label="Update" 
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { format } from 'date-fns'
import { ref, computed } from 'vue'

const editorStore = memorialEditorStore()

const updateAttribute = (attribute, value, now) => {
  
  editorStore.updateMemorial(attribute, value, now === true);
}

const relationships = [
  { name: 'Uncle', value: 'uncle' },
  { name: 'Aunt', value: 'aunt' },
  { name: 'Cousin', value: 'cousin' },
  { name: 'Grandfather', value: 'grandfather' },
  { name: 'Grandmother', value: 'grandmother' },
  { name: 'Father', value: 'father' },
  { name: 'Mother', value: 'mother' },
  { name: 'Sibling', value: 'sibling' },
  { name: 'Friend', value: 'friend' },
  { name: 'Wife', value: 'wife' },
  { name: 'Husband', value: 'husband' },
  { name: 'Partner', value: 'partner' }
];

const memorial = computed(() => {
  return editorStore.memorial
});

const originalMemorial = computed(() => {
  return editorStore.originalMemorial
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