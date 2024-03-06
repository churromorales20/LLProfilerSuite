import { defineStore } from 'pinia'
import { monthLeadingZero, validateDates } from './utils/misc_utils';
import type { IEmploymentInfo, MiscDateFields } from '@ll-interfaces/IMemorialMisc';

interface ISetMiscDateProps {
  field: MiscDateFields,
  value: string,
  type: string
}

export const memorialWorkStore = defineStore('memorialWorkStore', {
  state: () => ({
    errors: [] as string[],
    saving: false as boolean,
    is_form_open: false as boolean,
    editing_index: null as null | number,
    updating_index: null as null | number,
    editing_work: {
      company: '',
      company_url: '',
      position: '',
      start_date: 'XX-XXXX',
      end_date: 'XX-XXXX',
    } as IEmploymentInfo
  }),
  getters: {
    itemEditing: (state) => {
      return state.editing_work;
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
    editItem(item: IEmploymentInfo, indexItem: number){
      this.editing_work = JSON.parse(JSON.stringify(item));
      this.editing_index = indexItem;
      this.setFormState(true);
    },
    setDate({ field, value, type } : ISetMiscDateProps){

      if (type === 'year') {
        const datePiece = this.editing_work[field]?.substring(0, this.editing_work[field]?.length! - 4)
        
        this.editing_work[field] = `${datePiece}${value}`
      } else {
        const datePiece = this.editing_work[field]?.substring(2)
        this.editing_work[field] = `${value}${datePiece}`
      }
    },
    isValidDate(dateValue: string): boolean{
      return /^(0[1-9]|1[0-2])-(19|20)\d{2}$/.test(dateValue)
    },
    validate(): boolean{
      this.errors = [];
      let isValid = true;

      if (this.editing_work.company === '') {
        isValid = false 
        this.errors.push('company_name');
      }
      if (this.editing_work.position === '') {
        isValid = false
        this.errors.push('work_position');
      }
      if (this.editing_work.start_date === 'XX-XXXX' || !this.isValidDate(this.editing_work.start_date!)) {
        isValid = false
        this.errors.push('start_date');
      }

      if (!validateDates(this.editing_work.end_date!, this.editing_work.start_date!)) {
        isValid = false
        this.errors.push('date_range');
      }
      return isValid;
    },
    reset() {
      console.log('RESETED');
      
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
      
      this.editing_work = {
        company: '',
        company_url: '',
        position: '',
        start_date: `${startMonth}-${startYear}`,
        end_date: `${endMonth}-${currentYear}`,
      }

      this.editing_index = null;
    }
  },
})
