<template>
  <UCard
    :ui="{
      body: {
        padding: 'p-4 sm:py-2 sm:px-4',
      },
    }"
  >
    <template #header>
      <h3 class="text-md font-semibold">
        {{ titleAndLabel.title }}
      </h3>
    </template>
    <div class="w-[400px]">
      <label for="_education_misc_institution_" class="form-label text-sm text-neutral-950 mb-2 block">{{ $t('memorials.education_institution') }}</label>
      <UInput 
        id="_education_misc_institution_" 
        v-model="educationItem.institution"
        :color="educationStore.errors.includes('institution_name') ? 'red' : 'primary'"
        class="mb-2" 
        size="sm" 
        :placeholder="$t('memorials.education_institution_placeholder')"
      />
      <label for="_education_misc_field_" class="form-label text-sm text-neutral-950 mb-2 block">{{ $t('memorials.education_field') }}</label>
      <UInput 
        id="_education_misc_field_" 
        v-model="educationItem.field_of_study"
        :color="educationStore.errors.includes('field_of_study') ? 'red' : 'primary'"
        class="mb-2" 
        size="sm" 
        :placeholder="$t('memorials.education_field_placeholder')"
      />
      <label for="_education_misc_degree_" class="form-label text-sm text-neutral-950 mb-2 block">{{ $t('memorials.degree') }}</label>
      <UInput 
        id="_education_misc_degree_" 
        v-model="educationItem.degree"
        class="mb-2" 
        size="sm" 
        :placeholder="$t('memorials.education_degree_placeholder')"
      />
      <label for="_education_misc_start_date_" class="form-label text-sm text-neutral-950 mb-2 block">{{ $t('memorials.start_date') }}</label>
      <div class="flex mb-2">
        <USelectMenu 
          class="mr-4 w-40"
          searchable 
          option-attribute="title"
          by="value"
          v-model="educationStartDateMonth" 
          :color="educationStore.errors.includes('start_date') || educationStore.errors.includes('date_range') ? 'red' : 'primary'"
          :options="months" 
        />
        <USelectMenu 
          class="mr-4 w-32"
          searchable 
          v-model="educationStartDateYear" 
          :color="educationStore.errors.includes('start_date') || educationStore.errors.includes('date_range') ? 'red' : 'primary'"
          :options="years" 
        />
      </div>
      <label for="_education_misc_end_date_" class="form-label text-sm text-neutral-950 mb-2 block">{{ $t('memorials.end_date') }}</label>
      <div class="flex mb-2">
        <USelectMenu 
          class="mr-4 w-40"
          searchable 
          option-attribute="title"
          by="value"
          v-model="educationEndDateMonth" 
          :color="educationStore.errors.includes('date_range') ? 'red' : 'primary'"
          :options="months" 
        />
        <USelectMenu 
          class="mr-4 w-32"
          searchable 
          v-model="educationEndDateYear" 
          :color="educationStore.errors.includes('date_range') ? 'red' : 'primary'"
          :options="years" 
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          :label="$t('general.cancel')" 
          size="sm"
          class="mr-2"
          variant="outline"
          color="amber"
          @click="() => {
            emits('close-btn-pressed')
          }"
          icon="i-mdi-plus"
        />
        <UButton 
          :label="titleAndLabel.label"
          size="sm"
          @click="() => {
            validateAndSave();
          }"
          icon="i-mdi-content-save"
        />
      </div>
    </template>
  </UCard>
</template>
<script setup lang="ts">
import { MiscDateFields } from '@ll-interfaces/IMemorialMisc';
import type { IEducationInfo } from '@ll-interfaces/IMemorialMisc';

const locale = useI18n()
const editorStore = memorialEditorStore()
const educationStore = memorialEducationStore()
const emits = defineEmits(['close-btn-pressed']);
const years = ref<string[]>([]);
const months = [
    { value: '01', title: locale.t('memorials.month_1') },
    { value: '02', title: locale.t('memorials.month_2') },
    { value: '03', title: locale.t('memorials.month_3') },
    { value: '04', title: locale.t('memorials.month_4') },
    { value: '05', title: locale.t('memorials.month_5') },
    { value: '06', title: locale.t('memorials.month_6') },
    { value: '07', title: locale.t('memorials.month_7') },
    { value: '08', title: locale.t('memorials.month_8') },
    { value: '09', title: locale.t('memorials.month_9') },
    { value: '10', title: locale.t('memorials.month_10') },
    { value: '11', title: locale.t('memorials.month_11') },
    { value: '12', title: locale.t('memorials.month_12') }
];

const titleAndLabel = computed(() => {
  if (educationStore.isEditing) {
    return {
      title: locale.t('memorials.education_edit'),
      label: locale.t('general.update')
    }
  }

  return {
    title: locale.t('memorials.education_add'),
    label: locale.t('general.save')
  }
});

const educationStartDateYear = computed({
  get(){
    const DEFAULT_YEAR = '2024';

    if ( !educationStore.itemEditing.start_date) {
      return DEFAULT_YEAR;
    }

    const yearPiece = educationStore.itemEditing.start_date.slice(-4);
    
    return yearPiece === 'XXXX' ? DEFAULT_YEAR : yearPiece;
  },
  set(newVal){
    educationStore.setDate({
      field: MiscDateFields.StartDate,
      value: newVal!,
      type: 'year',
    })
  }
});
const educationStartDateMonth = computed({
  get(){
    if ( !educationStore.itemEditing.start_date) {
      return months[0];
    }

    const monthPiece = educationStore.itemEditing.start_date.slice(0, 2)
    
    return monthPiece === 'XX' ? months[0] : months.find((month) => month.value === monthPiece);
  },
  set(newVal){
    console.log(newVal);
    
    educationStore.setDate({
      field: MiscDateFields.StartDate,
      value: newVal.value,
      type: 'month',
    })
  }
});
const educationEndDateYear = computed({
  get(){
    const DEFAULT_YEAR = '2024';

    if ( !educationStore.itemEditing.end_date) {
      return DEFAULT_YEAR;
    }

    const yearPiece = educationStore.itemEditing.end_date.slice(-4);
    
    return yearPiece === 'XXXX' ? DEFAULT_YEAR : yearPiece;
  },
  set(newVal){
    educationStore.setDate({
      field: MiscDateFields.EndDate,
      value: newVal!,
      type: 'year',
    })
  }
});
const educationEndDateMonth = computed({
  get(){
    if ( !educationStore.itemEditing.end_date) {
      return months[0];
    }

    const monthPiece = educationStore.itemEditing.end_date.slice(0, 2)
    
    return monthPiece === 'XX' ? months[0] : months.find((month) => month.value === monthPiece);
  },
  set(newVal){
    
    educationStore.setDate({
      field: MiscDateFields.EndDate,
      value: newVal.value,
      type: 'month',
    })
  }
});

const educationItem = computed(() => educationStore.itemEditing);

const generateYears = () => {
    const anoActual = new Date().getFullYear();
    for (let ano = anoActual; ano >= 1700; ano--) {
        years.value.push(ano.toString());
    }
}

onMounted(() => {
  if (!educationStore.isEditing) {
    educationStore.init();
  }
  generateYears();
});

const validateAndSave = async () => {
  if (educationStore.validate()) {
    const data = JSON.parse(JSON.stringify(educationStore.itemEditing)) as IEducationInfo;

    if (!educationStore.isEditing) {
      educationStore.setSavingStatus(true);
      emits('close-btn-pressed')
      
      await editorStore.saveEducationInfo(data)
      educationStore.setSavingStatus(false);
    } else {
      educationStore.setUpdateStatus(true);
      emits('close-btn-pressed')
      await editorStore.updateEducationInfo(data, educationStore.editingIndex!)
      educationStore.setUpdateStatus(false);
    }
  }
}

</script>