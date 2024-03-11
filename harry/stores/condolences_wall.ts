import { defineStore } from 'pinia'
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import type { EntryFormField } from '@ll-interfaces/ICondolenceEntry';
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import type { ICondolenceEntry } from '@ll-interfaces/ICondolenceEntry';
import type { IPageInfiniteInfo } from '@ll-interfaces/IPageInfiniteInfo';

export const condolencesWallStore = defineStore('condolencesWallStore', {
  state: () => ({
    error_code: null as number | null,
    loaded: false as boolean,
    is_sending_entry_form: false as boolean,
    showing_modal_new_entry: false as boolean,
    memorial_code: '' as string | null,
    entries: [] as ICondolenceEntry[],
    filters: {
      last_date: '' as string
    },
    new_entry_form:{
      first_name: '' as string,
      last_name: '' as string,
      email: '' as string,
      entry_text: '' as string,
    },
    new_entry_form_erros:{
      first_name: null as null | string,
      last_name: null as null | string,
      email: null as null | string,
      entry_text: null as null | string,
    }
  }),
  getters: {
    showingNewEntryModal: (state) => {
      return state.showing_modal_new_entry;
    },
    newEntryForm: (state) => {
      return state.new_entry_form;
    },
    isSendingEntry: (state) => {
      return state.is_sending_entry_form;
    },
  },
  actions: {
    setNewEntryForm(key: EntryFormField, value: string){
      this.new_entry_form[key] = value;
    },
    setMemorialCode(code: string){
      this.memorial_code = code;
    },
    toggleNewEntryModal(status: boolean){
      this.resetForm();
      this.showing_modal_new_entry = status;
    },
    resetForm(){
      this.new_entry_form_erros = {
        first_name: null,
        last_name: null,
        email: null,
        entry_text: null,
      }
      this.new_entry_form = {
        first_name: '',
        last_name: '',
        email: '',
        entry_text: '',
      }
    },
    validatenewEntryForm(): boolean{
      let isValid = true;
      this.new_entry_form_erros = {
        first_name: null,
        last_name: null,
        email: null,
        entry_text: null,
      }
      if (isEmptyString(this.new_entry_form.first_name)) {
        isValid = false;
        this.new_entry_form_erros.first_name = 'Name not empty';
      }
      if (this.new_entry_form.first_name.length < 3) {
        isValid = false;
        this.new_entry_form_erros.first_name = 'name at least 3 chars';
      }

      if (isEmptyString(this.new_entry_form.last_name)) {
        isValid = false;
        this.new_entry_form_erros.last_name = 'last_name not empty';
      }
      if (this.new_entry_form.last_name.length < 3) {
        isValid = false;
        this.new_entry_form_erros.last_name = 'last_name at least 3 chars';
      }

      if (isEmptyString(this.new_entry_form.email) || !isValidEmail(this.new_entry_form.email)) {
        isValid = false;
        this.new_entry_form_erros.email = 'Email not empty';
      }
      if (!isValidEmail(this.new_entry_form.email)) {
        isValid = false;
        this.new_entry_form_erros.email = 'Invalid emial address';
      }

      if (isEmptyString(this.new_entry_form.entry_text)) {
        isValid = false;
        this.new_entry_form_erros.entry_text = 'Entry not empty';
      }
      if (this.new_entry_form.entry_text.length < 6) {
        isValid = false;
        this.new_entry_form_erros.entry_text = 'last_name at least 6 chars';
      }

      return isValid;
    },
    async sendNewEntry(): Promise<boolean> {
      this.is_sending_entry_form = true;
      try {
        const response = await internalApiFetcher.post<ICondolenceEntry>(`profile/${this.memorial_code}/condolences`, {
          first_name: this.new_entry_form.first_name,
          last_name: this.new_entry_form.last_name,
          email: this.new_entry_form.email,
          entry_text: this.new_entry_form.entry_text,
        });

        if (response.code) {
          const error: ILLApiError<ICondolenceEntry> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }
        
        if (response.data?.status === 'APPROVED') {
          this.entries.unshift(response.data);
        }
        this.is_sending_entry_form = false;
        
        return true;
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }
      }

      this.is_sending_entry_form = false;
      return false;
    },
    async validateAndSendNewEntry(): Promise<boolean>{
      if (this.validatenewEntryForm()) {
        return this.sendNewEntry()
      }
      return false;
    },
    async fetch() {
      this.error_code = null;
      this.loaded = false;

      try {
        const response = await internalApiFetcher
                      .get<IPageInfiniteInfo<ICondolenceEntry>>
          (`profile/${this.memorial_code}/condolences?${this.filters.last_date !== '' ? `&last_date=${this.filters.last_date}` : ''}`);
        
        if (response.code) { 
          const error: ILLApiError<IPageInfiniteInfo<ICondolenceEntry>> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }

        this.loaded = true
        if (response.data?.items.length! > 0) {
          this.entries = [
            ...this.entries,
            ...response.data?.items!,
          ]
          this.filters.last_date = this.entries[this.entries.length - 1].created_at as unknown as string
        }
        
        return true       
      } catch (error: any) {
        console.log('error', error);
        
        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }

      }
      return false;
    },
  },
})
