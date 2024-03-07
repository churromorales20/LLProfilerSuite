<template>
  <div class="bg-white shadow rounded-lg p-4 mb-4">
    <div>
      <h2 class="text-lg font-bold mb-2">{{ $t('profile.personal_info') }}</h2>
      <template v-if="!isEmptyInfo">
        <Carrer 
          v-if="carreInfo && Array.isArray(carreInfo) && carreInfo.length > 0" 
        />
        <Education 
          v-if="educationInfo && Array.isArray(educationInfo) && educationInfo.length > 0" 
        />
        <ul>
          <li 
            v-if="!isEmptyString(profile.born_place) || !isEmptyString(profile.born_date)"
            class="pt-2"
          >
            {{ $t('profile.born') }} {{ getDateInfo(profile.born_date, profile.born_place) }}
          </li>
          <li 
            v-if="!isEmptyString(profile.death_place) || !isEmptyString(profile.death_date)"
            class="pt-2"
          >
            {{ $t('profile.death') }} {{ getDateInfo(profile.death_date, profile.death_place) }}
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="flex h-40 items-center justify-center">
          <h4 class="text-sm">
            {{ $t('profile.no_personal_info') }}
          </h4>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'


const locale = useI18n()
const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile);
const getDateInfo = (date, place) => {
  const validPlace = !isEmptyString(place);
  const validDate = !isEmptyString(date);
  const dateInfo = `${validPlace ? `${locale.t('profile.location_at')} ${place}` : ''}
                      ${validPlace && validDate ? ', ' : ''}
                      ${validDate ? `${locale.t('profile.date_when')} ${dateFormatter(date)}` : ''}`;

  return !isEmptyString(dateInfo) ? dateInfo : '';
}

const dateFormatter = (date) => {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return format(date, 'd MMM, yyy')
}

const carreInfo = computed(() => profileStore.carrer)
const educationInfo = computed(() => profileStore.education)

const isEmptyInfo = !(carreInfo && Array.isArray(carreInfo) && carreInfo.length > 0) &&
                    !(educationInfo && Array.isArray(educationInfo) && educationInfo.length > 0) &&
                    !(!isEmptyString(profile.born_place) || !isEmptyString(profile.born_date)) &&
                    !(!isEmptyString(profile.death_place) || !isEmptyString(profile.death_date));
</script>