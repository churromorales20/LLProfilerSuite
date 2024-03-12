<template>
  <div class="mb-4 min-h-11 border-b border-gray-300 pb-2 items-center flex justify-between">
    <h2 class="text-neutral-950 text-lg font-bold">{{ $t('graveyard.name') }}</h2>
     <UButton 
      v-if="editorStore.isGraveyardPending"
      size="md"
      variant="outline"
      @click="updateGraveyardInfo"
      icon="i-fa6-solid-floppy-disk"
      :label="$t('general.update')" 
    />
  </div>
  <transition name="fade" @after-leave="moveNextView">
    <div v-if="viewing == 'form'">
      <label for="_graveyard_selector_" class="form-label text-neutral-950 mb-2 block">{{ $t('graveyard.select') }}</label>
      <USelectMenu
        id="_graveyard_selector_"
        v-model="selected"
        size="md"
        :loading="updating"
        @change="cemeterySelected"
        :searchable="search"
        :placeholder="$t('graveyard.search')"
        option-attribute="description"
        trailing
        by="place_id"
      />
      <AdminMemorialsEditorGraveyardManualForm />
    </div>
  </transition>
  <transition name="fade" @after-leave="moveNextView">
    <div v-if="viewing == 'loader'">
      <p class="text-gray-700 mb-8 pt-4 text-sm space-y-2">
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
      </p>
      <p class="text-gray-700 text-sm space-y-2">
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-4/5" />
        <USkeleton :ui="uiOptions" class="h-3 w-3/5" />
        <USkeleton :ui="uiOptions" class="h-3 w-4/5" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
        <USkeleton :ui="uiOptions" class="h-3 w-4/5" />
        <USkeleton :ui="uiOptions" class="h-3 w-3/5" />
        <USkeleton :ui="uiOptions" class="h-3 w-4/5" />
        <USkeleton :ui="uiOptions" class="h-3 w-full" />
      </p>
    </div>
  </transition>
  <transition name="fade" @after-leave="moveNextView">
    <div class="" v-if="viewing == 'details'">
      <div ref="map_element" class="border-b border-t border-r border-gray-200 h-40 w-full rounded-t-md" id="map"></div>
      <div class="border-b border-l border-r mt-2 border-gray-200 pl-4 pb-4 pr-4 rounded-b-md">
        <h2 class="text-base font-semibold">{{ memorialGraveyard!.name }}</h2>
        <p>{{ `${memorialGraveyard!.city}` }} <small>({{ memorialGraveyard!.secondary }})</small></p>
        <p>{{ `${memorialGraveyard!.state} - ${memorialGraveyard!.country}` }}</p>
        <p>{{ `${memorialGraveyard!.phone_number}` }}</p>
        <label for="internal_steps" class="text-neutral-950 mb-1 mt-2 block">{{ $t('graveyard.internal') }}</label>
        <UTextarea 
          :ui="{
            form: 'form-textarea h-20',
          }"
          v-model="graveyardInternalSteps"
          size="xl" 
          id="internal_steps" 
          :placeholder="$t('graveyard.internal_placeholder')"
        />
        <UButton 
          size="md"
          class="mt-4"
          variant="outline"
          @click="() => {
            editorStore.resetGraveyard();
            selected = [];
            moveView('form');
          }"
          icon="i-mdi-map-marker-left"
          color="amber"
          :label="$t('graveyard.change')"
          block 
        />
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import type { IAutocompleteItem } from '@ll-interfaces/IAutocompleteItem';
import { GraveyardInfoFields } from '@ll-interfaces/IGraveyardInfo';
const locale = useI18n()
const editorStore = memorialEditorStore()
const autocomplete = autocompleteStore()
const mapGraveyard = graveyardStore();
const uiOptions = ref({
  background: 'bg-cool-300',
  rounded: 'rounded-full'
})
const viewing = ref(
  editorStore?.memorial!.grave_yard_info === null || 
  editorStore?.memorial!.grave_yard_info!.place_id === null || 
  editorStore?.memorial!.grave_yard_info!.place_id === undefined || 
  editorStore?.memorial!.grave_yard_info!.place_id === '' ? 
    'form' : 
    'details')
const nextView = ref('');

const moveView = (view: string) => {
  nextView.value = view;
  viewing.value = ''
}
const moveNextView = () => {
  viewing.value = nextView.value
  nextView.value = ''
}
const cemeterySelected = async (item: IAutocompleteItem) => {
  moveView('loader');
  const placeDetails = await autocomplete.getInfo(item.place_id);

  if (placeDetails) {
    editorStore.setGraveyard(placeDetails!)
    moveView('details');
    setTimeout(() => {
      mapGraveyard.init(map_element.value, {
        lat: placeDetails.latitude!,
        lng: placeDetails.longitude!,
      });
    }, 1000);
  } else {
    moveView('form');
  }
}
const map_element = ref();

onMounted(() => {
  if (viewing.value === 'details') {
    setTimeout(() => {
      mapGraveyard.init(map_element.value, {
        lat: editorStore?.memorial!.grave_yard_info!.latitude!,
        lng: editorStore?.memorial!.grave_yard_info!.longitude!,
      });
    }, 1000);
  }
});

const memorialGraveyard = computed(() => {
  return editorStore?.memorial!.grave_yard_info
});

const updating = ref(false);

const updateGraveyardInfo = async () => {
  updating.value = true;
  const prevView = viewing.value;
  moveView('loader');
  await editorStore.updateGraveyard()
  moveView(prevView);
  updating.value = false;
}

const graveyardInternalSteps = computed({
  get(): string {
    return editorStore?.memorial!.grave_yard_info?.internal_steps!
  },
  set(newVal: string) {
    editorStore.updateGraveyardinfo(GraveyardInfoFields.InternalSteps, newVal);
  }
});

const loading = ref(false)
const selected = ref([])

async function search(q: string) {
  loading.value = true

  const cemeteries = await autocomplete.fetch(q, 'cemetery');

  loading.value = false

  return cemeteries
}

</script>
