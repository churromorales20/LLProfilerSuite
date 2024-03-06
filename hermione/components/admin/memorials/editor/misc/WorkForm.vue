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
      <label for="_work_misc_company_name_" class="form-label text-sm text-neutral-950 mb-2 block">Company name</label>
      <UInput 
        id="_work_misc_company_name_" 
        v-model="workItem.company"
        :color="workStore.errors.includes('company_name') ? 'red' : 'primary'"
        class="mb-2" 
        size="sm" 
        :placeholder="$t('memorials.last_name')"
      />
      <label for="_work_misc_position_" class="form-label text-sm text-neutral-950 mb-2 block">Position</label>
      <UInput 
        id="_work_misc_position_" 
        v-model="workItem.position"
        :color="workStore.errors.includes('work_position') ? 'red' : 'primary'"
        class="mb-2" 
        size="sm" 
        :placeholder="$t('memorials.last_name')"
      />
      <label for="_work_misc_company_url_" class="form-label text-sm text-neutral-950 mb-2 block">Company URL</label>
      <UInput 
        id="_work_misc_company_url_" 
        v-model="workItem.company_url"
        class="mb-2" 
        size="sm" 
        :placeholder="$t('memorials.last_name')"
      />
      <label for="_work_misc_start_date_" class="form-label text-sm text-neutral-950 mb-2 block">Start date</label>
      <div class="flex mb-2">
        <USelectMenu 
          class="mr-4 w-40"
          searchable 
          option-attribute="title"
          by="value"
          v-model="workStartDateMonth" 
          :color="workStore.errors.includes('start_date') || workStore.errors.includes('date_range') ? 'red' : 'primary'"
          :options="months" 
        />
        <USelectMenu 
          class="mr-4 w-32"
          searchable 
          v-model="workStartDateYear" 
          :color="workStore.errors.includes('start_date') || workStore.errors.includes('date_range') ? 'red' : 'primary'"
          :options="years" 
        />
      </div>
      <label for="_work_misc_end_date_" class="form-label text-sm text-neutral-950 mb-2 block">End date</label>
      <div class="flex mb-2">
        <USelectMenu 
          class="mr-4 w-40"
          searchable 
          option-attribute="title"
          by="value"
          v-model="workEndDateMonth" 
          :color="workStore.errors.includes('date_range') ? 'red' : 'primary'"
          :options="months" 
        />
        <USelectMenu 
          class="mr-4 w-32"
          searchable 
          v-model="workEndDateYear" 
          :color="workStore.errors.includes('date_range') ? 'red' : 'primary'"
          :options="years" 
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          label="Cancel"
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
import type { IEmploymentInfo } from '@ll-interfaces/IMemorialMisc';

const editorStore = memorialEditorStore()
const workStore = memorialWorkStore()
const emits = defineEmits(['close-btn-pressed']);
const years = ref<string[]>([]);
const months = [
    { value: '01', title: 'January' },
    { value: '02', title: 'February' },
    { value: '03', title: 'March' },
    { value: '04', title: 'April' },
    { value: '05', title: 'May' },
    { value: '06', title: 'June' },
    { value: '07', title: 'July' },
    { value: '08', title: 'August' },
    { value: '09', title: 'September' },
    { value: '10', title: 'October' },
    { value: '11', title: 'November' },
    { value: '12', title: 'December' }
];

const titleAndLabel = computed(() => {
  if (workStore.isEditing) {
    return {
      title: 'Edit work information',
      label: 'Update'
    }
  }

  return {
    title: 'Add work information',
    label: 'Save'
  }
});

const workStartDateYear = computed({
  get(){
    const DEFAULT_YEAR = '2024';

    if ( !workStore.itemEditing.start_date) {
      return DEFAULT_YEAR;
    }

    const yearPiece = workStore.itemEditing.start_date.slice(-4);
    
    return yearPiece === 'XXXX' ? DEFAULT_YEAR : yearPiece;
  },
  set(newVal){
    workStore.setDate({
      field: MiscDateFields.StartDate,
      value: newVal!,
      type: 'year',
    })
  }
});
const workStartDateMonth = computed({
  get(){
    if ( !workStore.itemEditing.start_date) {
      return months[0];
    }

    const monthPiece = workStore.itemEditing.start_date.slice(0, 2)
    
    return monthPiece === 'XX' ? months[0] : months.find((month) => month.value === monthPiece);
  },
  set(newVal){
    console.log(newVal);
    
    workStore.setDate({
      field: MiscDateFields.StartDate,
      value: newVal.value,
      type: 'month',
    })
  }
});
const workEndDateYear = computed({
  get(){
    const DEFAULT_YEAR = '2024';

    if ( !workStore.itemEditing.end_date) {
      return DEFAULT_YEAR;
    }

    const yearPiece = workStore.itemEditing.end_date.slice(-4);
    
    return yearPiece === 'XXXX' ? DEFAULT_YEAR : yearPiece;
  },
  set(newVal){
    workStore.setDate({
      field: MiscDateFields.EndDate,
      value: newVal!,
      type: 'year',
    })
  }
});
const workEndDateMonth = computed({
  get(){
    if ( !workStore.itemEditing.end_date) {
      return months[0];
    }

    const monthPiece = workStore.itemEditing.end_date.slice(0, 2)
    
    return monthPiece === 'XX' ? months[0] : months.find((month) => month.value === monthPiece);
  },
  set(newVal){
    
    workStore.setDate({
      field: MiscDateFields.EndDate,
      value: newVal.value,
      type: 'month',
    })
  }
});

const workItem = computed(() => workStore.itemEditing);

const generateYears = () => {
    const anoActual = new Date().getFullYear();
    for (let ano = anoActual; ano >= 1700; ano--) {
        years.value.push(ano.toString());
    }
}

onMounted(() => {
  if (!workStore.isEditing) {
    workStore.init();
  }
  generateYears();
});

const validateAndSave = async () => {
  if (workStore.validate()) {
    const data = JSON.parse(JSON.stringify(workStore.itemEditing)) as IEmploymentInfo;

    if (!workStore.isEditing) {
      workStore.setSavingStatus(true);
      emits('close-btn-pressed')
      await editorStore.saveWorkInfo(data)
      workStore.setSavingStatus(false);
    } else {
      workStore.setUpdateStatus(true);
      emits('close-btn-pressed')
      await editorStore.updateWorkInfo(data, workStore.editingIndex!)
      workStore.setUpdateStatus(false);
    }
  }
}

</script>