<template>
  <div class="container mx-auto mt-4 mb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
          <label class="block text-gray-700 font-bold mb-2" for="language">{{ $t('general.language') }}</label>
          <USelect 
            v-model="memorialSettings.language" 
            @change="updateAttribute('language', $event.target.value)"
            size="md" 
            :options="availableLanguages" 
            option-attribute="name" 
          />
        </div>
      <div>
        <label class="block text-gray-700 font-bold mb-2" for="timezone">{{ $t('general.timezone') }}</label>
        <USelect 
          v-model="memorialSettings.timezone"
          @change="updateAttribute('timezone', $event.target.value)"
          size="md" 
          :options="timeZones" 
          option-attribute="name" 
        />
      </div>
      <div>
        <label class="block text-gray-700 font-bold mb-2" for="dateFormat">{{ $t('general.date_format') }}</label>
        <USelect 
          v-model="memorialSettings.date_format" 
          size="md" 
          @change="updateAttribute('date_format', $event.target.value)"
          :options="availableDateFormat" 
          option-attribute="name" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">  
import { ref, computed } from 'vue'

const locale = useI18n()
const memorialStore = memorialEditorStore();

const updateAttribute = (attribute, value) => {

  memorialStore.updateConfigurations(attribute, value);
}

const timeZones = [
  { name: "Eastern Standard Time", value: "EST" },
  { name: "Central Standard Time", value: "CST" },
  { name: "Mountain Standard Time", value: "MST" },
  { name: "Pacific Standard Time", value: "PST" },
  { name: "Alaska Standard Time", value: "AKST" },
  { name: "Hawaii-Aleutian Standard Time", value: "HAST" },
  { name: "Atlantic Standard Time", value: "AST" },
  { name: "Argentina Time", value: "ART" },
  { name: "Brasilia Time", value: "BRT" },
  { name: "Chile Standard Time", value: "CLT" },
  { name: "Colombia Time", value: "COT" },
  { name: "Ecuador Time", value: "ECT" },
  { name: "Peru Time", value: "PET" },
  { name: "Venezuela Time", value: "VET" }
];

const memorialSettings = computed(() => memorialStore.settings);


const availableLanguages = [
  {
    name: locale.t('general.lang_es'),
    value: 'EN'
  },
  {
    name: locale.t('general.lang_en'),
    value: 'ES'
  }
]

const availableDateFormat = [
  {
    name: locale.t('general.date_format_american'),
    value: 'AMERICAN'
  },
  {
    name: locale.t('general.date_format_latin'),
    value: 'LATIN'
  }
]

const entry = computed(() => {
  return condolencesStore.list[index]
});
</script>

