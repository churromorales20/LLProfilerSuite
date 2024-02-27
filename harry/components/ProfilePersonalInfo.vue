<template>
  <div class="bg-white shadow rounded-lg p-4 mb-4">
    <div>
      <h2 class="text-lg font-bold mb-2">Información Personal</h2>
      <ul>
        <li><span class="font-bold">Nacimiento:</span> {{ getDateInfo(profile.born_date, profile.born_place) }}</li>
        <li><span class="font-bold">Fallecimiento:</span> Ciudad, País (DD/MM/AAAA)</li>
        <li><span class="font-bold">Relación:</span> Parentesco</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
const getDateInfo = (date, place) => {
  const validPlace = !isEmptyString(place);
  const validDate = !isEmptyString(date);
  const dateInfo = `${validPlace ? `${place}` : ''}
                      ${validPlace && validDate ? ' - ' : ''}
                      ${validDate ? dateFormatter(date) : ''}`;

  return !isEmptyString(dateInfo) ? dateInfo : '';
}
</script>