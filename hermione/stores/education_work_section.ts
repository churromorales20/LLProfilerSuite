import { defineStore } from 'pinia';
import type { IEducationInfo, MiscDateFields } from '@ll-interfaces/IMemorialMisc';
import {  monthLeadingZero, validateDates } from './utils/misc_utils';

interface ISetMiscDateProps {
  field: MiscDateFields,
  value: string,
  type: string
}


export const memorialEducationStore = defineStore('memorialEducationStore', {
  state: () => ({
    errors: [] as string[],
    saving: false as boolean,
    is_form_open: false as boolean,
    editing_index: null as null | number,
    updating_index: null as null | number,
    editing: {
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: 'XX-XXXX',
      end_date: 'XX-XXXX',
    } as IEducationInfo
  }),
  getters: {
    itemEditing: (state) => {
      return state.editing;
    },
    isFormOpened: (state) => {
      return state.is_form_open;
    },
    isEditing: (state) => {
      return state.editing_index !== null;
    },
    editingIndex: (state) => {
      return state.editing_index;
    },
    itemUpdating: (state) => {
      return state.updating_index;
    },
  },
  actions: {
    setSavingStatus(status: boolean) {
      this.saving = status;
    },
    setUpdateStatus(status: boolean) {
      this.updating_index = status ? this.editing_index : null;
    },
    setFormState(state: boolean){
      this.is_form_open = state;
      
      if (!state) {
        this.reset();
      }
    },
    init(){
      this.reset();
    },
    editItem(item: IEducationInfo, indexItem: number){
      this.editing = JSON.parse(JSON.stringify(item));
      this.editing_index = indexItem;
      this.setFormState(true);
    },
    setDate({ field, value, type } : ISetMiscDateProps){

      if (type === 'year') {
        const datePiece = this.editing[field]?.substring(0, this.editing[field]?.length! - 4)
        
        this.editing[field] = `${datePiece}${value}`
      } else {
        const datePiece = this.editing[field]?.substring(2)
        this.editing[field] = `${value}${datePiece}`
      }
    },
    isValidDate(dateValue: string): boolean{
      return /^(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(dateValue)
    },
    validate(): boolean{
      this.errors = [];
      let isValid = true;

      if (this.editing.institution === '') {
        isValid = false 
        this.errors.push('institution_name');
      }
      if (this.editing.field_of_study === '') {
        isValid = false
        this.errors.push('field_of_study');
      }
      if (this.editing.start_date === 'XX-XXXX' || !this.isValidDate(this.editing.start_date!)) {
        isValid = false
        this.errors.push('start_date');
      }

      if (!validateDates(this.editing.end_date!, this.editing.start_date!)) {
        isValid = false
        this.errors.push('date_range');
      }
      return isValid;
    },
    reset() {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const endMonth = monthLeadingZero(currentMonth);
      let startNumber = currentMonth - 6;
      let startYear = currentYear;

      if (startNumber < 1) {
        startNumber = 12 + startNumber;
        startYear -= 1; 
      }

      const startMonth = monthLeadingZero(startNumber);
      
      this.editing = {
        institution: '',
        degree: '',
        field_of_study: '',
        start_date: `${startMonth}-${startYear}`,
        end_date: `${endMonth}-${currentYear}`,
      }

      this.editing_index = null;
    }
  },
})
