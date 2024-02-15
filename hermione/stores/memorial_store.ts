import { defineStore } from 'pinia'
import type { ILLApiError } from '@ll-interfaces/ILLApiError';
import { internalApiFetcher } from "@ll-fetchers/internalApiFetcher";
import type { IMemorial } from '@ll-interfaces/IMemorial';

export const memorialsStore = defineStore('memorialsStore', {
  state: () => ({
    error_code: null as number | null,
    is_working: true as boolean,
    list: [] as IMemorial[],
  }),
  getters: {
    isWorking: (state) => {
      return state.is_working;
    },
    isErrored: (state) => {
      return state.error_code !== null;
    },
    lastError: (state) => {
      return state.error_code;
    },
  },
  actions: {
    updateItemList(id: number, newItemValue: IMemorial){
      const index = this.list.findIndex((item) => item.id === id);

      if (index >= 0) {
        
        this.list[index] = newItemValue;
      }
    },
    async fetchList(): Promise<boolean>{
      let result = false;
      try {
        const response = await internalApiFetcher.get<IMemorial[]>(`memorials/list`);

        if (response.code) {
          const error: ILLApiError<IMemorial[]> = new Error(`${response.code}`);
          error.response = response;
          throw error;

        }

        this.list = response.data!;
        result = true;
      } catch (error: any) {
        console.log('error', error.response);

        if (error.response) {
          this.error_code = error.response.code
        } else {
          this.error_code = 500
        }
      }

      this.is_working = false

      return result;
    }
  },
})
