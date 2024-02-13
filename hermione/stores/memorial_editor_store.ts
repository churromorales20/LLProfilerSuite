import { defineStore } from 'pinia'
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import type { IMemorialWithUI } from '@ll-interfaces/IMemorial';

export const memorialEditorStore = defineStore('memorialEditorStore', {
  state: () => ({
    error_code: null as number | null,
    is_working: true as boolean,
    show_form: true as boolean,
    updating_attr: null as null | string,
    memorial: null as null | IMemorialWithUI,
    memorial_original: null as null | IMemorialWithUI,
    memorial_id: null as null | number,
    timeout_id: null as null | NodeJS.Timeout,
  }),
  getters: {
    isWorking: (state) => {
      return state.is_working;
    },
    showForm: (state) => {
      return state.show_form;
    },
    updatingAttr: (state) => {
      return state.updating_attr;
    },
    originalMemorial: (state) => {
      return state.memorial_original;
    },
    isEditing: (state) => {
      return state.memorial_id !== null;
    },
    isErrored: (state) => {
      return state.error_code !== null;
    },
    lastError: (state) => {
      return state.error_code;
    },
  },
  actions: {
    reset(){
      this.memorial_id = null;
      this.memorial = null;
    },
    getOriginalValue(attr: string): string | null{
      switch (attr) {
        case 'first_name':
          return this.memorial_original!['first_name'];

        case 'last_name':
          return this.memorial_original!['last_name'];

        case 'obituary':
          return this.memorial_original!['obituary']!;

        case 'born_place':
          return this.memorial_original!['born_place']!;

        case 'nickname':
          return this.memorial_original!['nickname']!;

        case 'death_place':
          return this.memorial_original!['death_place']!;

        case 'relationship':
          return this.memorial_original!['relationship']!;

        case 'bio':
          return this.memorial_original!['bio']!;

        case 'uname':
          return this.memorial_original!['uname']!;

        default:
          return null
      }
    },
    updateMemorialItem(attr: string, value: string){
      switch (attr) {
        case 'first_name':
          this.memorial!['first_name'] = value;
          break;
        case 'last_name':
          this.memorial!['last_name'] = value;
          break;
        case 'obituary':
          this.memorial!['obituary'] = value;
          break;
        case 'born_place':
          this.memorial!['born_place'] = value;
          break;
        case 'nickname':
          this.memorial!['nickname'] = value;
          break;
        case 'death_place':
          this.memorial!['death_place'] = value;
          break;
        case 'relationship':
          this.memorial!['relationship'] = value;
          break;
        case 'bio':
          this.memorial!['bio'] = value;
          break;
        case 'uname':
          this.memorial!['uname'] = value;
          break;
        default:
          break;
      }
    },
    setOriginalValues(){
      this.memorial_original = JSON.parse(JSON.stringify(this.memorial)) as IMemorialWithUI;
    },
    setDate(type: string, value: Date){
      if (type === 'born') {
        this.memorial!.born_date = value;
      } else {
        this.memorial!.death_date = value;
      }
    },
    async updateMemorial (attr: string, value: string, now: boolean) {
      //this.updateMemorialItem(attr, value);
      if (now) {
        this.postUpdate(attr, value);
      } else {
        if (this.timeout_id !== null) {
          clearTimeout(this.timeout_id);
        }
        this.timeout_id = setTimeout(async () => {
          this.postUpdate(attr, value);
        }, 300)
      }
      
    },
    async postUpdate(attr: string, value: string){
      try {
        this.updating_attr = attr;
        const response = await internalApiFetcher.post<Object>(`memorial/${this.memorial_id}/update`, {
          attr,
          value
        });

        if (response.code) {
          const error: ILLApiError<Object> = new Error(`${response.code}`);
          error.response = response;
          const oldData = this.getOriginalValue(attr);
          const oldValue = oldData ? oldData : '';
          this.updateMemorialItem(attr, oldValue);
          throw error;

        }
        this.updating_attr = null;
        const memorialStore = memorialsStore()
        this.show_form = false;
        memorialStore.updateItemList(this.memorial_id!, this.memorial!);
        this.show_form = true;
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }
        this.updating_attr = null;
      }
    },
    async fetch(id: number) {
      try {
        this.is_working = true;
        this.memorial_id = id
        const response = await internalApiFetcher.get<IMemorialWithUI>(`memorial/${id}`);

        if (response.code) {
          const error: ILLApiError<IMemorialWithUI> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }

        this.memorial = response.data!;
        this.memorial.death_date = response.data?.death_date !== null ? new Date(response.data?.death_date!) : null;
        this.memorial.born_date = response.data?.born_date !== null ? new Date(response.data?.born_date!) : null;
        
        this.setOriginalValues();
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }
      }

      this.is_working = false;
    }
  },
})
