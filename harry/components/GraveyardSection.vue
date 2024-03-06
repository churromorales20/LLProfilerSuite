<template>
  <div class="bg-white shadow rounded-lg p-4 mt-4" v-if="isValidGraveyardInfo">
    <h2 class="text-lg font-bold mb-2">Graveyard Directions</h2>
    <div v-if="graveyardInfo!.place_id" ref="map_element" class="border-b border-t border-r border-gray-200 h-40 w-full rounded-t-md" id="map"></div>
    <div class="border-b border-l border-r mt-2 border-gray-200 pl-4 pb-4 pr-4 rounded-b-md">
      <h2 class="text-base font-semibold">{{ graveyardInfo!.name }}</h2>
      <p>{{ `${graveyardInfo!.city}` }} <small>({{ graveyardInfo!.secondary }})</small></p>
      <p>
        {{ `${graveyardInfo!.state ? `${graveyardInfo!.state}` : ''} 
        ${graveyardInfo!.state && graveyardInfo!.country ? ` - ` : ''}
        ${graveyardInfo!.country}` }}</p>
      <p v-if="graveyardInfo!.phone_number">{{ `${graveyardInfo!.phone_number}` }}</p>
      <template v-if="graveyardInfo!.internal_steps">
        <label for="internal_steps" class="text-neutral-950 mb-1 mt-2 block">{{ $t('profile.graveyard_internal') }}</label>
        <p>{{ graveyardInfo!.internal_steps }}</p>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
const profileStore = useProfileStore();
const graveyardInfo = computed(() => profileStore.profile.grave_yard_info);
const isValidGraveyardInfo = computed(() => profileStore.profile.grave_yard_info?.name);
if (process.server && profileStore.profile.grave_yard_info?.place_id !== null) {
  useHead({ script: [{ src: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_KEY}&v=weekly`, defer: true }] });
}
const mapGraveyard = graveyardStore();
const map_element = ref();
onMounted(() => {
  if (profileStore.profile.grave_yard_info?.place_id !== null) {
    setTimeout(() => {
      mapGraveyard.init(map_element.value, {
        lat: profileStore.profile!.grave_yard_info!.latitude!,
        lng: profileStore.profile!.grave_yard_info!.longitude!,
      });
    }, 1000);
  }
});
</script>