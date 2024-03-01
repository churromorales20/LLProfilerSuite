<template>
  <UDivider class="mt-6 mb-5" label="Or enter it manually" />
  <label for="graveyard_name" class="form-label text-neutral-950 mb-1 block">Graqveyard name</label>
  <UInput 
    id="graveyard_name" 
    class="mb-2" 
    v-model="graveyardName"
    size="md" 
    :placeholder="$t('memorials.last_name')" 
  />
  <label for="graveyard_country" class="form-label text-neutral-950 mb-1 block">Country</label>
  <UInput 
    id="graveyard_country" 
    class="mb-2" 
    v-model="graveyardCountry"
    size="md" 
    :placeholder="$t('memorials.last_name')" 
  />
  <label for="graveyard_city" class="form-label text-neutral-950 mb-1 block">City, State/Province</label>
  <UInput 
    id="graveyard_city" 
    class="mb-2" 
    v-model="graveyardCity"
    size="md" 
    :placeholder="$t('memorials.last_name')" 
  />
  <label for="internal_steps" class="text-neutral-950 mb-1 block">{{ $t('memorials.internal_steps') }}</label>
  <UTextarea 
    :ui="{
      form: 'form-textarea h-16',
    }"
    v-model="graveyardInternalSteps"
    size="xl" 
    id="internal_steps" 
    :placeholder="$t('memorials.enter_internal_steps')"
  />
</template>
<script setup lang="ts">
import { GraveyardInfoFields } from '@ll-interfaces/IGraveyardInfo';

const locale = useI18n()
const editorStore = memorialEditorStore()
const autocomplete = autocompleteStore()
const mapGraveyard = graveyardStore();
const graveyardInfo = computed(() => {
  return editorStore?.memorial!.grave_yard_info
});
const graveyardName = computed({
  get(): string{
    return editorStore?.memorial!.grave_yard_info?.name!
  },
  set(newVal: string){
    editorStore.updateGraveyardinfo(GraveyardInfoFields.Name, newVal);
  }
});
const graveyardCountry = computed({
  get(): string{
    return editorStore?.memorial!.grave_yard_info?.country!
  },
  set(newVal: string){
    editorStore.updateGraveyardinfo(GraveyardInfoFields.Country, newVal);
  }
});
const graveyardCity = computed({
  get(): string{
    return editorStore?.memorial!.grave_yard_info?.city!
  },
  set(newVal: string){
    editorStore.updateGraveyardinfo(GraveyardInfoFields.City, newVal);
  }
});
const graveyardInternalSteps = computed({
  get(): string{
    return editorStore?.memorial!.grave_yard_info?.internal_steps!
  },
  set(newVal: string){
    editorStore.updateGraveyardinfo(GraveyardInfoFields.InternalSteps, newVal);
  }
});
</script>
